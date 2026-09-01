# MK Industrial Solutions – CMS

Denne version tilføjer Decap CMS uden at ændre det eksisterende mørke/gule design.

## CMS
Åbn:
https://mkindustrial.dk/admin/

Netlify Identity + Git Gateway skal være aktiveret på Netlify-projektet `mk-industrial-cms`.

## Indhold
Redigerbart indhold ligger i:
- `content/index.json`
- `content/automation.json`
- `content/programmering.json`
- `content/smarthome.json`
- `content/3dprint.json`
- `content/projects.json`

Billeder, som uploades via CMS, gemmes i:
- `assets/uploads/`

## Vigtigt
Netlify-projektet bruges til CMS-authentication/Git Gateway. Den offentlige hjemmeside kan fortsat ligge på GitHub Pages.
