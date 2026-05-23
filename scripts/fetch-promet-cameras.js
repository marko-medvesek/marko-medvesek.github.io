#!/usr/bin/env node

const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const ENDPOINT = "https://www.promet.si/dc/agg";
const OUTPUT_FILE = path.join(__dirname, "..", "v2", "cameras.js");
const REGIONS = new Map([
    ["Primorska in Notranjska", { id: "primorska", name: "Primorska avtocesta", shortName: "Primorska" }],
    ["Štajerska, Koroška, Prekmurje", { id: "stajerska", name: "Štajerska, Koroška, Prekmurje", shortName: "Štajerska" }],
    ["Dolenjska", { id: "dolenjska", name: "Dolenjska", shortName: "Dolenjska" }],
    ["Gorenjska", { id: "gorenjska", name: "Gorenjska", shortName: "Gorenjska" }],
    ["Ljubljanska obvoznica", { id: "obvoznica", name: "Ljubljanska obvoznica", shortName: "Obvoznica" }]
]);

class Pbf {
    constructor(buffer) {
        this.buf = buffer ? new Uint8Array(buffer) : new Uint8Array(128);
        this.pos = 0;
        this.type = 0;
        this.length = this.buf.length;
    }

    realloc(size) {
        while (this.pos + size > this.buf.length) {
            const next = new Uint8Array(this.buf.length * 2);
            next.set(this.buf);
            this.buf = next;
        }
    }

    finish() {
        return this.buf.slice(0, this.pos);
    }

    readFields(readField, result, end = this.length) {
        while (this.pos < end) {
            const tag = this.readVarint();
            const start = this.pos;
            this.type = tag & 7;
            readField(tag >> 3, result, this);
            if (this.pos === start) {
                this.skip(tag);
            }
        }
        return result;
    }

    readVarint() {
        let value = 0;
        let shift = 0;

        while (true) {
            const byte = this.buf[this.pos++];
            value += (byte & 0x7f) * Math.pow(2, shift);
            if (byte < 0x80) {
                return value;
            }
            shift += 7;
        }
    }

    readSVarint() {
        const value = this.readVarint();
        return value % 2 === 1 ? -(value + 1) / 2 : value / 2;
    }

    readBoolean() {
        return Boolean(this.readVarint());
    }

    readString() {
        const end = this.readVarint() + this.pos;
        const value = Buffer.from(this.buf.subarray(this.pos, end)).toString("utf8");
        this.pos = end;
        return value;
    }

    readFloat() {
        const value = Buffer.from(this.buf.buffer, this.buf.byteOffset + this.pos, 4).readFloatLE();
        this.pos += 4;
        return value;
    }

    readDouble() {
        const value = Buffer.from(this.buf.buffer, this.buf.byteOffset + this.pos, 8).readDoubleLE();
        this.pos += 8;
        return value;
    }

    readPackedVarint(target) {
        if (this.type !== 2) {
            target.push(this.readVarint());
            return;
        }

        const end = this.readVarint() + this.pos;
        while (this.pos < end) {
            target.push(this.readVarint());
        }
    }

    skip(tag) {
        const type = tag & 7;
        if (type === 0) {
            while (this.buf[this.pos++] >= 0x80) {
                continue;
            }
        } else if (type === 1) {
            this.pos += 8;
        } else if (type === 2) {
            this.pos += this.readVarint();
        } else if (type === 5) {
            this.pos += 4;
        } else {
            throw new Error(`Unsupported protobuf wire type ${type}`);
        }
    }

    writeTag(field, type) {
        this.writeVarint((field << 3) | type);
    }

    writeVarint(value) {
        this.realloc(10);
        while (value > 0x7f) {
            this.buf[this.pos++] = (value & 0x7f) | 0x80;
            value = Math.floor(value / 128);
        }
        this.buf[this.pos++] = value;
    }

    writeStringField(field, value) {
        if (!value) {
            return;
        }
        const bytes = Buffer.from(value, "utf8");
        this.writeTag(field, 2);
        this.writeVarint(bytes.length);
        this.realloc(bytes.length);
        this.buf.set(bytes, this.pos);
        this.pos += bytes.length;
    }

    writeVarintField(field, value) {
        if (!value) {
            return;
        }
        this.writeTag(field, 0);
        this.writeVarint(value);
    }

    writeMessage(field, writer, value) {
        const child = new Pbf();
        writer(value, child);
        const bytes = child.finish();
        this.writeTag(field, 2);
        this.writeVarint(bytes.length);
        this.realloc(bytes.length);
        this.buf.set(bytes, this.pos);
        this.pos += bytes.length;
    }
}

function writeLayer(layer, pbf) {
    pbf.writeStringField(1, layer.name);
    pbf.writeVarintField(20, layer.ModelVersion);
}

function writeTile(tile, pbf) {
    tile.layers.forEach((layer) => pbf.writeMessage(3, writeLayer, layer));
    pbf.writeVarintField(17, tile.ModelVersion);
    pbf.writeStringField(21, tile.Language);
    pbf.writeStringField(22, tile.Type);
    pbf.writeStringField(23, tile.RunId);
    pbf.writeStringField(26, tile.Version);
}

function readValue(pbf, end) {
    const value = {};
    pbf.readFields((field, result, reader) => {
        if (field === 1) result.value = reader.readString();
        else if (field === 2) result.value = reader.readFloat();
        else if (field === 3) result.value = reader.readDouble();
        else if (field === 4) result.value = reader.readVarint();
        else if (field === 5) result.value = reader.readVarint();
        else if (field === 6) result.value = reader.readSVarint();
        else if (field === 7) result.value = reader.readBoolean();
    }, value, end);
    return value.value;
}

function readFeature(pbf, end) {
    return pbf.readFields((field, feature, reader) => {
        if (field === 1) feature.id = reader.readVarint();
        else if (field === 2) reader.readPackedVarint(feature.tags);
        else if (field === 3) feature.type = reader.readVarint();
        else if (field === 4) reader.readPackedVarint(feature.geometry);
    }, { id: 0, tags: [], type: 0, geometry: [] }, end);
}

function readLayer(pbf, end) {
    return pbf.readFields((field, layer, reader) => {
        if (field === 1) layer.name = reader.readString();
        else if (field === 2) layer.features.push(readFeature(reader, reader.readVarint() + reader.pos));
        else if (field === 3) layer.keys.push(reader.readString());
        else if (field === 4) layer.values.push(readValue(reader, reader.readVarint() + reader.pos));
        else if (field === 5) layer.extent = reader.readVarint();
        else if (field === 16) layer.expires = reader.readString();
        else if (field === 18) layer.isModified = reader.readBoolean();
        else if (field === 20) layer.modelVersion = reader.readVarint();
        else if (field === 21) layer.modifiedTime = reader.readString();
        else if (field === 22) layer.geoMultiplyFactor = reader.readVarint();
    }, { name: "", features: [], keys: [], values: [], extent: 4096, geoMultiplyFactor: 0 }, end);
}

function readTile(buffer) {
    const pbf = new Pbf(buffer);
    return pbf.readFields((field, tile, reader) => {
        if (field === 3) tile.layers.push(readLayer(reader, reader.readVarint() + reader.pos));
        else if (field === 19) tile.modifiedTime = reader.readString();
        else if (field === 20) tile.expires = reader.readString();
        else if (field === 21) tile.language = reader.readString();
        else if (field === 22) tile.type = reader.readString();
        else if (field === 26) tile.version = reader.readString();
    }, { layers: [] });
}

function decodePointGeometry(commands, divisor) {
    let x = 0;
    let y = 0;
    let index = 0;

    while (index < commands.length) {
        const command = commands[index++];
        const id = command & 7;
        const count = command >> 3;

        if (id === 1 || id === 2) {
            for (let i = 0; i < count; i++) {
                x += decodeZigZag(commands[index++]);
                y += decodeZigZag(commands[index++]);
                if (id === 1) {
                    return normalizeCoordinates(divisor ? [x / divisor, y / divisor] : [x, y]);
                }
            }
        } else if (id === 7) {
            continue;
        } else {
            break;
        }
    }

    return null;
}

function normalizeCoordinates(coordinates) {
    if (!coordinates || coordinates.length !== 2) {
        return coordinates;
    }

    const [x, y] = coordinates;
    if (Math.abs(x) > 180 || Math.abs(y) > 90) {
        return [x / 10000000, y / 10000000];
    }

    return coordinates;
}

function decodeZigZag(value) {
    return value % 2 === 1 ? -(value + 1) / 2 : value / 2;
}

function layerToFeatures(layer) {
    return layer.features.map((feature) => {
        const properties = {};

        for (let i = 0; i < feature.tags.length; i += 2) {
            const key = layer.keys[feature.tags[i]];
            properties[key] = layer.values[feature.tags[i + 1]];
        }

        return {
            type: "Feature",
            properties,
            geometry: {
                type: "Point",
                coordinates: decodePointGeometry(feature.geometry, layer.geoMultiplyFactor)
            }
        };
    });
}

function cleanText(value) {
    return String(value || "")
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function normalizeImageUrl(value) {
    if (!value) {
        return "";
    }

    const url = String(value).replace(/[?&]dt=\{\{dt\}\}/g, "").replace(/[?&]dt=\d+/g, "");
    return url.startsWith("//") ? `https:${url}` : url;
}

function mapFeature(feature) {
    const props = feature.properties;
    const region = REGIONS.get(props.Region);
    const description = cleanText(props.Description);
    const titleParts = cleanText(props.Title).split(",").map((part) => part.trim()).filter(Boolean);
    const name = titleParts.slice(-1)[0] || cleanText(props.Title) || props.Id;
    const direction = titleParts.length > 1 ? titleParts.slice(0, -1).join(", ") : description;

    return {
        name,
        direction,
        description,
        url: normalizeImageUrl(props.Image),
        prometId: props.Id,
        region: props.Region,
        sourceTitle: cleanText(props.Title),
        sourceOwner: cleanText(props.KameraOwner),
        coordinates: feature.geometry.coordinates,
        motorwayId: region.id,
        motorwayName: region.name,
        motorwayShortName: region.shortName
    };
}

function groupCameras(features) {
    const grouped = new Map();

    for (const region of REGIONS.values()) {
        grouped.set(region.id, { ...region, cameras: [] });
    }

    for (const feature of features) {
        const region = REGIONS.get(feature.properties.Region);
        const image = normalizeImageUrl(feature.properties.Image);

        if (!region || !image) {
            continue;
        }

        grouped.get(region.id).cameras.push(mapFeature(feature));
    }

    return [...grouped.values()];
}

async function fetchCameraFeatures() {
    const request = new Pbf();
    writeTile({
        layers: [{ name: "kamere", ModelVersion: 2 }],
        ModelVersion: 2,
        Language: "sl_SI",
        Type: "www.promet.si",
        RunId: crypto.randomUUID(),
        Version: "2.0"
    }, request);

    const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/vnd.mapbox-vector-tile",
            "Accept": "application/vnd.mapbox-vector-tile"
        },
        body: request.finish()
    });

    if (!response.ok) {
        throw new Error(`Promet.si returned ${response.status} ${response.statusText}`);
    }

    const tile = readTile(await response.arrayBuffer());
    const layer = tile.layers.find((item) => item.name === "kamere");

    if (!layer) {
        throw new Error("Promet.si response did not include the kamere layer.");
    }

    return layerToFeatures(layer);
}

async function main() {
    const features = await fetchCameraFeatures();
    const motorways = groupCameras(features);
    const cameraCount = motorways.reduce((sum, motorway) => sum + motorway.cameras.length, 0);
    const generatedAt = new Date().toISOString();
    const output = `// Generated by scripts/fetch-promet-cameras.js on ${generatedAt}\nwindow.cameraData = ${JSON.stringify(motorways, null, 4)};\n`;

    await fs.writeFile(OUTPUT_FILE, output, "utf8");
    console.log(`Wrote ${cameraCount} cameras to ${path.relative(process.cwd(), OUTPUT_FILE)}`);
    for (const motorway of motorways) {
        console.log(`- ${motorway.name}: ${motorway.cameras.length}`);
    }
}

main().catch((error) => {
    console.error(error.message);
    process.exit(1);
});
