# Tischlerei Mustermann

Beispielwebsite einer fiktiven Tischlerei. Sie ist eine Referenz für den Webdesign-Service von
[Hannes Schaletzky](https://hschaletzky.com).

**Live:** https://tischlerei-mustermann.hschaletzky.com

## Stack

- [Astro 7](https://astro.build), komplett statisch, nur ein paar Zeilen JavaScript (Kontaktformular)
- Inhalte als Markdown in Content Collections: `src/content/{leistungen,moebel,journal}`
- Bilder über `astro:assets` → AVIF/WebP in mehreren Größen, Schriften selbst gehostet (Fontsource)
- Kein Tracking, keine Cookies, keine Drittanbieter
- Ausgeliefert von Caddy in einem schlanken Caddy-Container, Deployment über das [infra](../infra)-Repo

## Entwicklung

```sh
npm install
npm run dev          # http://localhost:4321
npx astro check      # Typen prüfen
npm run build        # statische Seite nach dist/
```

## Inhalte pflegen

| Was                | Wo                                   |
| ------------------ | ------------------------------------ |
| Firmendaten, Menü  | `src/data/site.ts`                   |
| Leistungen         | `src/content/leistungen/*.md`        |
| Möbel              | `src/content/moebel/*.md`            |
| Journal-Beiträge   | `src/content/journal/*.md`           |
| Farben, Typografie | `src/styles/global.css` (`:root`)    |
| Fotos              | `src/assets/images/` (+ Bildnachweis in `site.ts`) |

Neue Markdown-Datei anlegen → Seite, Sitemap und RSS-Feed werden automatisch erzeugt.

## Deployment

Jeder Push auf `main` löst `.github/workflows/deploy.yml` aus:

1. `astro check` und Bau der Docker-Images (amd64), Push nach `ghcr.io/hannesschaletzky/tischlerei-mustermann`:
   `latest` (die Website) und `maengel` (die Mängelfassung, siehe unten)
2. `ssh deploy@<server> deploy tischlerei` und `deploy tischlerei-maengel` → Der Server zieht die neuen Images und
   startet die Container neu

Benötigte Secrets (im Environment `production`): `DEPLOY_SSH_KEY`, `DEPLOY_HOST`, `DEPLOY_KNOWN_HOSTS`.
Details stehen im infra-Repo.

## Mängelfassung

`MAENGEL=1 npm run build` baut aus demselben Code eine Fassung mit typischen Mängeln kleiner Websites, für den
Beispielbericht des Website-Check-ups: **https://vorher.tischlerei-mustermann.hschaletzky.com**. Sie zeigt nur
Sichtbares und Einstellungen, keine echten Datenflüsse zu Dritten, trägt überall `noindex` und verlinkt in der
Demo-Leiste die fehlerfreie Fassung und das echte Impressum.

| Was                                 | Wo                                                             |
| ----------------------------------- | -------------------------------------------------------------- |
| Schalter, Leistungen ohne Beschreibung | `src/data/maengel.ts`                                      |
| Cookie-Hinweis, Impressum, Datenschutz | `src/components/maengel/`                                  |
| Übrige Mängel                       | auf den Seiten bei `maengel` (Suche nach `maengel`)           |
| Server ohne Sicherheits-Header      | `deploy/Caddyfile.maengel` (Docker: `--build-arg MAENGEL=1`)  |

## Bildnachweise

Alle Fotos von [Unsplash](https://unsplash.com) (Unsplash-Lizenz). Die Liste steht in `src/data/site.ts` und auf `/datenschutz/`.
