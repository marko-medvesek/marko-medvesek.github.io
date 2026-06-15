# DARS kamere v živo

Spletna aplikacija za pregled prometnih kamer na slovenskih avtocestah in obvoznicah. Projekt rešuje informacijski problem hitrega dostopa do ažurnih slik prometnih kamer, saj uporabniku prikaže več kamer hkrati in jih samodejno osvežuje.

## Namen projekta

Prometne kamere so uporabne predvsem takrat, ko so pregledne, hitro dostopne in dovolj pogosto osvežene. Pri večjem številu kamer je ročno odpiranje posameznih slik zamudno, zato aplikacija združi kamere v mrežni prikaz in jih razporedi po cestnih kategorijah.

Glavni cilji projekta:

- prikazati vse kamere iz izbrane kategorije v mreži,
- omogočiti večji galerijski pogled posamezne kamere,
- redno osveževati slike brez ročnega ponovnega nalaganja strani,
- ločiti kamere DARS od regijskih kamer drugih upravljavcev,
- zmanjšati nepotrebno porabo podatkov z osveževanjem samo vidnih kamer.

## Funkcionalnosti

- mrežni prikaz prometnih kamer,
- kategorije za avtoceste in regije,
- posebna kategorija **Regijske kamere** za kamere, ki niso v lasti DARS,
- osveževanje kamer DARS približno vsako sekundo,
- osveževanje regijskih kamer približno enkrat na minuto,
- leno osveževanje slik, ki upošteva, katere kamere so trenutno vidne,
- gumb za začasno ustavitev osveževanja,
- galerijski modal ob kliku na kamero,
- dodajanje parametra `dt` v URL slike, da brskalnik ne prikazuje stare slike iz predpomnilnika.

## Zgradba projekta

```text
DARS-kamere/
+-- index.html
+-- styles.css
+-- app.js
+-- cameras.js
+-- scripts/
|   +-- fetch-promet-cameras.js
|   +-- create-project-report-docx.py
+-- porocilo_dars_kamere.docx
```

Pomembnejše datoteke:

- `index.html` vsebuje osnovno strukturo spletne strani,
- `styles.css` določa videz in prilagoditev za različne velikosti zaslonov,
- `app.js` vsebuje logiko prikaza, filtriranja, osveževanja in galerijskega modala,
- `cameras.js` vsebuje pripravljen seznam kamer,
- `scripts/fetch-promet-cameras.js` pridobi in pripravi podatke o kamerah iz javnega vira Promet.si,
- `porocilo_dars_kamere.docx` je pisno poročilo za projektno nalogo.

## Uporabljene tehnologije

- **HTML** za strukturo strani,
- **CSS** za oblikovanje in odziven prikaz,
- **JavaScript** za delovanje aplikacije v brskalniku,
- **Node.js** za skripto, ki pripravi podatke o kamerah,
- **Intersection Observer API** za zaznavanje vidnih kamer,
- **Promet.si** kot javni vir podatkov o prometnih kamerah.

## Zagon projekta

Projekt je statična spletna stran. Za osnovni zagon je dovolj, da se v brskalniku odpre datoteka `index.html`.

Za preverjanje JavaScript datotek:

```bash
node --check app.js
node --check scripts/fetch-promet-cameras.js
```

Za ponovno pripravo podatkov o kamerah:

```bash
node scripts/fetch-promet-cameras.js
```

## Zaključek

Projekt omogoča hiter pregled prometnih kamer in izboljša uporabniško izkušnjo pri preverjanju stanja na cestah. Najpomembnejši del rešitve je združitev kamer v pregleden mrežni prikaz z avtomatskim osveževanjem in ločeno obravnavo kamer DARS ter regijskih kamer.

Možne nadgradnje:

- prikaz kamer na zemljevidu,
- shranjevanje priljubljenih kamer,
- iskanje po lokaciji ali cestnem odseku,
- opozorila za izbrane poti,
- objava kot PWA aplikacija,
- objava projekta na GitHub Pages.

## Viri

- Promet.si: https://www.promet.si/sl/kamere
- DARS prometne kamere: https://kamere.dars.si/
- MDN Web Docs, Intersection Observer API: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- MDN Web Docs, `setInterval`: https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval
