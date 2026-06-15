const fastRefreshIntervalMs = 1000;
const regionalRefreshIntervalMs = 60000;
const offlineImage = "../assets/img/offline.jpg";

const fallbackMotorways = [
    {
        id: "primorska",
        name: "Primorska avtocesta",
        shortName: "Primorska",
        cameras: [
            { name: "Ajdovscina", direction: "Smer GO", url: "https://kamere.dars.si/kamere/Bazara/Ajdovscina_smer_GO.jpg" },
            { name: "H4 km 9.5", direction: "Vipavska hitra cesta", url: "https://kamere.dars.si/kamere/snvprebrnice/H4_0774_km9_5_VN0774_10.jpg" },
            { name: "H4 km 8.4", direction: "Vipavska hitra cesta", url: "https://kamere.dars.si/kamere/snvprebrnice/H4_0774_km8_4a_VN0774_09.jpg" },
            { name: "H4 km 5.4", direction: "Vipavska hitra cesta", url: "https://kamere.dars.si/kamere/snvprebrnice/H4_0774_km5_4a_VN0774_06.jpg" },
            { name: "H4 km 4.3", direction: "Vipavska hitra cesta", url: "https://kamere.dars.si/kamere/snvprebrnice/H4_0774_km4_3_VN0774_08.jpg" },
            { name: "H4 km 0.5", direction: "Vipavska hitra cesta", url: "https://kamere.dars.si/kamere/snvprebrnice/H4_0774_km05_VN0774_01.jpg" },
            { name: "Nanos", direction: "Panorama LJ", url: "https://kamere.dars.si/kamere/Nanos/CP_Nanos_Panorama_LJ.jpg" },
            { name: "Dilce 2", direction: "Kozina", url: "https://kamere.dars.si/kamere/Kozina/Dilce_2.jpg" },
            { name: "Dilce 1", direction: "Kozina", url: "https://kamere.dars.si/kamere/Kozina/Dilce_1.jpg" },
            { name: "Portal P3 Studenec", direction: "Kozina", url: "https://kamere.dars.si/kamere/Kozina/Portal_P3_Studenec.jpg" },
            { name: "Portal Unec", direction: "Smer KP", url: "https://kamere.dars.si/kamere/msc2pics/Portal%20Unec%20smer%20KP.jpg" },
            { name: "Portal Unec", direction: "Smer LJ", url: "https://kamere.dars.si/kamere/msc2pics/Portal%20Unec%20smer%20LJ.jpg" },
            { name: "Ivanje selo", direction: "Smer LJ", url: "https://kamere.dars.si/kamere/msc2pics/Kam15_IVANJE_SELO_LJ.jpg" },
            { name: "Ivanje selo", direction: "Smer KP", url: "https://kamere.dars.si/kamere/msc2pics/Kam9_IVANJE_SELO_KP.jpg" },
            { name: "Lom", direction: "Smer KP", url: "https://kamere.dars.si/kamere/msc2pics/kam7_Lom_KP.jpg" },
            { name: "Lom", direction: "Smer LJ", url: "https://kamere.dars.si/kamere/msc2pics/Kam8_LOM_LJ.jpg" },
            { name: "Stempetov most", direction: "Smer LJ", url: "https://kamere.dars.si/kamere/Vrhnika/Stempetov_most_LJ.JPG" },
            { name: "Stempetov most", direction: "Kozina LJ", url: "https://kamere.dars.si/kamere/Kozina/Stempetov_most_LJ.jpg" },
            { name: "Stempetov most", direction: "Kozina KP", url: "https://kamere.dars.si/kamere/Kozina/Stempetov_most_KP.jpg" },
            { name: "Verd", direction: "Smer KP", url: "https://kamere.dars.si/kamere/Vrhnika/Verd_KP.JPG" },
            { name: "Sinja gorica", direction: "Smer LJ", url: "https://kamere.dars.si/kamere/Vrhnika/Sinja_gorica_LJ.JPG" },
            { name: "Speed Vrhnika", direction: "Vhod", url: "https://kamere.dars.si/kamere/msc2pics/Cam21_SPEED_VHOD.jpg" },
            { name: "Speed Vrhnika", direction: "Izhod", url: "https://kamere.dars.si/kamere/msc2pics/Cam22_SPEED_IZHOD.jpg" },
            { name: "Sentvid jug", direction: "Kamera 11", url: "https://kamere.dars.si/kamere/Sentvid_Jug/cam11.jpg" },
            { name: "Sentvid jug", direction: "Kamera 8", url: "https://kamere.dars.si/kamere/Sentvid_Jug/cam8.jpg" },
            { name: "Sentvid jug", direction: "Kamera 6", url: "https://kamere.dars.si/kamere/Sentvid_Jug/cam6.jpg" },
            { name: "Sentvid jug", direction: "Kamera 5", url: "https://kamere.dars.si/kamere/Sentvid_Jug/cam5.jpg" },
            { name: "Sentvid jug", direction: "Kamera 12", url: "https://kamere.dars.si/kamere/Sentvid_Jug/cam12.jpg" },
            { name: "Sentvid jug", direction: "Kamera 1", url: "https://kamere.dars.si/kamere/Sentvid_Jug/cam1.jpg" },
            { name: "Sentvid jug", direction: "Kamera 3", url: "https://kamere.dars.si/kamere/Sentvid_Jug/cam3.jpg" }
        ]
    },
    {
        id: "obvoznica",
        name: "Ljubljanska obvoznica",
        shortName: "Obvoznica",
        cameras: [
            { name: "Izanka", direction: "Smer Kozarje", url: "https://kamere.dars.si/kamere/ljubljana/K07_Izanka_smer_Kozarje.jpg" },
            { name: "Rudnik", direction: "K24 SD 1", url: "https://kamere.dars.si/kamere/Golovec/K24_Rudnik_SD_1.jpg" },
            { name: "Malence", direction: "Z Barja", url: "https://kamere.dars.si/kamere/Golovec/K16_Malence_z_Barja.jpg" },
            { name: "Malence", direction: "K25 SD 2", url: "https://kamere.dars.si/kamere/Golovec/K25_Malence_SD_2.jpg" },
            { name: "Strmec", direction: "Bizovik", url: "https://kamere.dars.si/kamere/Golovec/Strmec_Bizovik.jpg" },
            { name: "Zadobrova", direction: "Letaliska", url: "https://kamere.dars.si/kamere/Golovec/K13_Zadobrova_Letaliska_5.jpg" },
            { name: "Zadobrova", direction: "Zaloska", url: "https://kamere.dars.si/kamere/Golovec/K15_Zadobrova_Zaloska.jpg" },
            { name: "Zadobrova", direction: "Sneberje", url: "https://kamere.dars.si/kamere/Golovec/K12_Zadobrova_Sneberje_6.jpg" },
            { name: "Zadobrova", direction: "Domzale", url: "https://kamere.dars.si/kamere/Golovec/K11_Zadobrova_Domzale_10.jpg" },
            { name: "Portal Nove Jarse", direction: "Kamera 1", url: "https://kamere.dars.si/kamere/Golovec/Portal_Nove_Jarse1.jpg" },
            { name: "Portal Nove Jarse", direction: "Kamera 2", url: "https://kamere.dars.si/kamere/Golovec/Portal_Nove_Jarse2.jpg" },
            { name: "Rondo Tomacevo", direction: "K19 SD 31", url: "https://kamere.dars.si/kamere/Golovec/K19_Rondo_Tomacevo_SD_31.jpg" },
            { name: "Sentvid jug", direction: "Kamera 7", url: "https://kamere.dars.si/kamere/Sentvid_Jug/cam7.jpg" },
            { name: "Sentvid jug", direction: "Kamera 13", url: "https://kamere.dars.si/kamere/Sentvid_Jug/cam13.jpg" },
            { name: "Sentvid jug", direction: "Kamera 12", url: "https://kamere.dars.si/kamere/Sentvid_Jug/cam12.jpg" },
            { name: "Sentvid jug", direction: "Kamera 3", url: "https://kamere.dars.si/kamere/Sentvid_Jug/cam3.jpg" },
            { name: "Sentvid jug", direction: "Kamera 4", url: "https://kamere.dars.si/kamere/Sentvid_Jug/cam4.jpg" },
            { name: "Sentvid jug", direction: "Kamera 2", url: "https://kamere.dars.si/kamere/Sentvid_Jug/cam2.jpg" },
            { name: "Sentvid jug", direction: "Kamera 6", url: "https://kamere.dars.si/kamere/Sentvid_Jug/cam6.jpg" },
            { name: "Sentvid jug", direction: "Kamera 5", url: "https://kamere.dars.si/kamere/Sentvid_Jug/cam5.jpg" },
            { name: "Sentvid jug", direction: "Kamera 8", url: "https://kamere.dars.si/kamere/Sentvid_Jug/cam8.jpg" },
            { name: "Sentvid jug", direction: "Kamera 9", url: "https://kamere.dars.si/kamere/Sentvid_Jug/cam9.jpg" },
            { name: "Sentvid jug", direction: "Kamera 10", url: "https://kamere.dars.si/kamere/Sentvid_Jug/cam10.jpg" },
            { name: "Kozarje", direction: "Drog", url: "https://kamere.dars.si/kamere/ljubljana/K03_Kozarje_drog.jpg" },
            { name: "Pocivalisce Barje", direction: "Kamera 20", url: "https://kamere.dars.si/kamere/ljubljana/Kam20_pociva_Barje.jpg" },
            { name: "Center", direction: "Smer Kozarje", url: "https://kamere.dars.si/kamere/ljubljana/K14_Center_smer_Kozarje.jpg" },
            { name: "Center", direction: "Smer Rudnik", url: "https://kamere.dars.si/kamere/ljubljana/K04_Center_smer_Rudnik.jpg" }
        ]
    }
];

const sourceMotorways = Array.isArray(window.cameraData) ? window.cameraData : fallbackMotorways;
const motorways = buildDisplayMotorways(sourceMotorways);

const cameras = motorways.flatMap((motorway) =>
    motorway.cameras.map((camera, index) => ({
        ...camera,
        id: `${motorway.id}-${index + 1}`,
        motorwayId: motorway.id,
        motorwayName: motorway.name,
        motorwayShortName: motorway.shortName,
        refreshIntervalMs: motorway.refreshIntervalMs || fastRefreshIntervalMs,
        lastRefreshedAt: 0
    }))
);

function buildDisplayMotorways(rawMotorways) {
    const regularMotorways = rawMotorways
        .map((motorway) => {
            const hasOwnerMetadata = motorway.cameras.some((camera) => "sourceOwner" in camera);

            return {
                ...motorway,
                refreshIntervalMs: fastRefreshIntervalMs,
                cameras: motorway.cameras.filter((camera) => {
                    const owner = getCameraOwner(camera);
                    return hasOwnerMetadata ? owner === "DARS" : owner !== "DRSI";
                })
            };
        })
        .filter((motorway) => motorway.cameras.length > 0);

    const regionalCameras = rawMotorways.flatMap((motorway) => {
        const hasOwnerMetadata = motorway.cameras.some((camera) => "sourceOwner" in camera);

        if (!hasOwnerMetadata) {
            return [];
        }

        return motorway.cameras
            .filter((camera) => getCameraOwner(camera) !== "DARS")
            .map((camera) => ({
                ...camera,
                sourceMotorwayId: motorway.id,
                sourceMotorwayName: motorway.name,
                sourceMotorwayShortName: motorway.shortName
            }));
    });

    if (regionalCameras.length > 0) {
        regularMotorways.push({
            id: "regijske",
            name: "Regijske kamere",
            shortName: "Regijske",
            refreshIntervalMs: regionalRefreshIntervalMs,
            cameras: regionalCameras
        });
    }

    return regularMotorways;
}

function getCameraOwner(camera) {
    return String(camera.sourceOwner || "").trim().toUpperCase();
}

const state = {
    selectedRoad: "all",
    search: "",
    visibleCameras: cameras,
    modalCameraId: null,
    touchStartX: 0,
    isPaused: false,
    visibleImages: new Set()
};

const appHeader = document.querySelector(".app-header");
const roadTabs = document.getElementById("roadTabs");
const searchInput = document.getElementById("searchInput");
const cameraGrid = document.getElementById("cameraGrid");
const emptyState = document.getElementById("emptyState");
const sectionTitle = document.getElementById("sectionTitle");
const sectionMeta = document.getElementById("sectionMeta");
const lastUpdated = document.getElementById("lastUpdated");
const pauseRefresh = document.getElementById("pauseRefresh");
const modal = document.getElementById("cameraModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalRoad = document.getElementById("modalRoad");
const modalDirection = document.getElementById("modalDirection");
const modalCounter = document.getElementById("modalCounter");
const previousCamera = document.getElementById("previousCamera");
const nextCamera = document.getElementById("nextCamera");
const imageObserver = "IntersectionObserver" in window
    ? new IntersectionObserver(handleImageVisibility, { rootMargin: "200px 0px", threshold: 0.01 })
    : null;

function cacheBustedUrl(url) {
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}dt=${Date.now()}`;
}

function renderTabs() {
    const tabs = [
        { id: "all", label: `Vse (${cameras.length})` },
        ...motorways.map((motorway) => ({
            id: motorway.id,
            label: `${motorway.shortName} (${motorway.cameras.length})`
        }))
    ];

    roadTabs.innerHTML = tabs.map((tab) => `
        <button class="tab-button" type="button" data-road="${tab.id}" aria-pressed="${tab.id === state.selectedRoad}">
            ${tab.label}
        </button>
    `).join("");
}

function getVisibleCameras() {
    const search = state.search.trim().toLowerCase();

    return cameras.filter((camera) => {
        const matchesRoad = state.selectedRoad === "all" || camera.motorwayId === state.selectedRoad;
        const searchableText = `${camera.name} ${camera.direction} ${camera.motorwayName}`.toLowerCase();
        return matchesRoad && (!search || searchableText.includes(search));
    });
}

function renderGrid() {
    disconnectImageObserver();
    state.visibleCameras = getVisibleCameras();
    cameraGrid.innerHTML = state.visibleCameras.map((camera) => `
        <article class="camera-card">
            <button class="camera-button" type="button" data-camera-id="${camera.id}" aria-label="Odpri ${camera.name}">
                <div class="camera-frame">
                    <img src="${camera.currentSrc || offlineImage}" data-camera-image data-camera-id="${camera.id}" data-base-url="${camera.url}" alt="${camera.name}, ${camera.direction}">
                    <span class="camera-badge">${camera.sourceMotorwayShortName || camera.motorwayShortName}</span>
                </div>
            </button>
            <div class="camera-info">
                <h3>${camera.name}</h3>
                <p>${camera.direction}</p>
            </div>
        </article>
    `).join("");

    const road = motorways.find((motorway) => motorway.id === state.selectedRoad);
    sectionTitle.textContent = road ? road.name : "Vse kamere";
    sectionMeta.textContent = `${state.visibleCameras.length} kamer v prikazu`;
    emptyState.hidden = state.visibleCameras.length > 0;
    observeGridImages();
    refreshImages();
}

function handleImageVisibility(entries) {
    const now = Date.now();

    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            state.visibleImages.add(entry.target);
            if (!state.isPaused) {
                refreshImage(entry.target, { now });
                updateRefreshStatus();
            }
        } else {
            state.visibleImages.delete(entry.target);
        }
    });
    updateRefreshStatus();
}

function observeGridImages() {
    document.querySelectorAll("[data-camera-image]").forEach((image) => {
        if (imageObserver) {
            imageObserver.observe(image);
        } else {
            state.visibleImages.add(image);
            if (!state.isPaused) {
                refreshImage(image);
            }
        }
    });
}

function disconnectImageObserver() {
    if (imageObserver) {
        imageObserver.disconnect();
    }
    state.visibleImages.clear();
}

function refreshImage(image, options = {}) {
    if (!image || !image.dataset.baseUrl) {
        return;
    }

    const camera = cameras.find((item) => item.id === image.dataset.cameraId);
    const now = options.now || Date.now();

    if (!camera) {
        return;
    }

    if (now - camera.lastRefreshedAt < camera.refreshIntervalMs) {
        if (camera.currentSrc) {
            image.src = camera.currentSrc;
        }
        return;
    }

    camera.lastRefreshedAt = now;
    camera.currentSrc = cacheBustedUrl(image.dataset.baseUrl);
    delete image.dataset.fallbackApplied;
    image.src = camera.currentSrc;
}

function refreshImages() {
    if (state.isPaused) {
        updateRefreshStatus();
        return;
    }

    const now = Date.now();
    refreshModalImage(now);
    state.visibleImages.forEach((image) => refreshImage(image, { now }));

    updateRefreshStatus();
}

function refreshModalImage(now = Date.now()) {
    if (!state.modalCameraId) {
        return;
    }

    const camera = cameras.find((item) => item.id === state.modalCameraId);
    if (!camera) {
        return;
    }

    if (now - camera.lastRefreshedAt >= camera.refreshIntervalMs) {
        camera.lastRefreshedAt = now;
        camera.currentSrc = cacheBustedUrl(camera.url);
    }

    if (camera.currentSrc) {
        delete modalImage.dataset.fallbackApplied;
        modalImage.src = camera.currentSrc;
    }
}

function updateRefreshStatus() {
    if (state.isPaused) {
        lastUpdated.textContent = "Osveževanje je ustavljeno";
        return;
    }

    const visibleCount = state.visibleImages.size;
    const cameraLabel = visibleCount === 1 ? "kamera" : visibleCount === 2 ? "kameri" : visibleCount < 5 ? "kamere" : "kamer";
    lastUpdated.textContent = `Osveženo ${new Date().toLocaleTimeString("sl-SI")} (${visibleCount} ${cameraLabel})`;
}

function setPaused(isPaused) {
    state.isPaused = isPaused;
    pauseRefresh.setAttribute("aria-pressed", String(isPaused));
    pauseRefresh.textContent = isPaused ? "Nadaljuj" : "Premor";
    appHeader.classList.toggle("is-paused", isPaused);
    updateRefreshStatus();

    if (!isPaused) {
        refreshImages();
    }
}

function openModal(cameraId) {
    state.modalCameraId = cameraId;
    updateModalContent();
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    state.modalCameraId = null;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

function updateModalContent() {
    const camera = cameras.find((item) => item.id === state.modalCameraId);
    if (!camera) {
        return;
    }

    const filteredList = state.visibleCameras.length ? state.visibleCameras : cameras;
    const activeList = filteredList.some((item) => item.id === camera.id) ? filteredList : cameras;
    const currentIndex = activeList.findIndex((item) => item.id === camera.id);

    modalTitle.textContent = camera.name;
    modalRoad.textContent = camera.motorwayName;
    modalDirection.textContent = camera.direction;
    modalImage.alt = `${camera.name}, ${camera.direction}`;
    camera.lastRefreshedAt = Date.now();
    camera.currentSrc = cacheBustedUrl(camera.url);
    delete modalImage.dataset.fallbackApplied;
    modalImage.src = camera.currentSrc;
    modalCounter.textContent = `${currentIndex + 1} / ${activeList.length}`;
}

function moveModal(direction) {
    if (!state.modalCameraId) {
        return;
    }

    const activeList = state.visibleCameras.length ? state.visibleCameras : cameras;
    const currentIndex = activeList.findIndex((camera) => camera.id === state.modalCameraId);
    const nextIndex = (currentIndex + direction + activeList.length) % activeList.length;

    state.modalCameraId = activeList[nextIndex].id;
    updateModalContent();
}

roadTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-road]");
    if (!button) {
        return;
    }

    state.selectedRoad = button.dataset.road;
    renderTabs();
    renderGrid();
});

searchInput.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderGrid();
});

cameraGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-camera-id]");
    if (button) {
        openModal(button.dataset.cameraId);
    }
});

modal.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-modal]")) {
        closeModal();
    }
});

modal.addEventListener("touchstart", (event) => {
    state.touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

modal.addEventListener("touchend", (event) => {
    const swipeDistance = event.changedTouches[0].screenX - state.touchStartX;

    if (swipeDistance > 50) {
        moveModal(-1);
    }
    if (swipeDistance < -50) {
        moveModal(1);
    }
}, { passive: true });

previousCamera.addEventListener("click", () => moveModal(-1));
nextCamera.addEventListener("click", () => moveModal(1));
pauseRefresh.addEventListener("click", () => setPaused(!state.isPaused));

document.addEventListener("keydown", (event) => {
    if (!state.modalCameraId) {
        return;
    }

    if (event.key === "Escape") {
        closeModal();
    }
    if (event.key === "ArrowLeft") {
        moveModal(-1);
    }
    if (event.key === "ArrowRight") {
        moveModal(1);
    }
});

document.addEventListener("error", (event) => {
    if (event.target.matches("img") && !event.target.dataset.fallbackApplied) {
        event.target.dataset.fallbackApplied = "true";
        event.target.src = offlineImage;
    }
}, true);

renderTabs();
renderGrid();
setInterval(refreshImages, fastRefreshIntervalMs);
