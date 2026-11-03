# syntax=docker/dockerfile:1

# Build läuft immer auf der Plattform des Builders, nur das schlanke Caddy-Image wird pro Architektur gebaut.
FROM --platform=$BUILDPLATFORM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# MAENGEL=1 baut die Mängelfassung für den Beispielbericht des Website-Check-ups
ARG MAENGEL=0
RUN MAENGEL=$MAENGEL npm run build

FROM caddy:2-alpine
ARG MAENGEL=0
COPY deploy/ /tmp/deploy/
RUN if [ "$MAENGEL" = 1 ]; then cp /tmp/deploy/Caddyfile.maengel /etc/caddy/Caddyfile; else cp /tmp/deploy/Caddyfile /etc/caddy/Caddyfile; fi && rm -rf /tmp/deploy
COPY --from=build /app/dist /srv
EXPOSE 80
