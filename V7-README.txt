# MK Industrial Solutions – V7

Denne version samler hjemmesiden + Decap CMS + DecapBridge og løser tekst-flashen ved genindlæsning.

## Struktur
- `index.html` – selve hjemmesiden
- `automation.html`
- `programmering.html`
- `smarthome.html`
- `3dprint.html`
- `projekter.html`
- `tak.html`
- `admin/index.html` – Decap CMS
- `admin/config.yml` – DecapBridge-konfiguration
- `content/*.json` – indhold som CMS'et redigerer
- `assets/cms-content.js` – indlæsning af CMS-indhold uden gammel-tekst-flash
- `assets/uploads/` – uploadede CMS-billeder

## Vigtigt ved upload til GitHub
ZIP-filen indeholder den korrekte mappestruktur fra repository-roden. Upload/erstat filerne med samme placeringer. `index.html` skal ligge i roden, mens CMS-filen skal ligge i `admin/index.html`.

## V7-fix
Siden starter med en lille `Indlæser…`-tilstand. Den statiske HTML bruges stadig som SEO-fallback, men bliver skjult, indtil det aktuelle JSON-indhold fra CMS'et er indlæst og sat ind i siden. Hvis CMS'et ikke kan hentes, vises fallback-siden efter maksimalt 5 sekunder.

## DecapBridge
`admin/config.yml` er sat til det eksisterende DecapBridge-site og GitHub-repository `ImHDM/ImHDM.github.io`.
