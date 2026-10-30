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

1. `astro check` und Bau des Docker-Images (amd64), Push nach `ghcr.io/hannesschaletzky/tischlerei-mustermann`
2. `ssh deploy@<server> deploy tischlerei` → Der Server zieht das neue Image und startet den Container neu

Benötigte Secrets (im Environment `production`): `DEPLOY_SSH_KEY`, `DEPLOY_HOST`, `DEPLOY_KNOWN_HOSTS`.
Details stehen im infra-Repo.

## Bildnachweise

Alle Fotos von [Unsplash](https://unsplash.com) (Unsplash-Lizenz). Die Liste steht in `src/data/site.ts` und auf `/datenschutz/`.
