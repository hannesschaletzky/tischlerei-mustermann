# syntax=docker/dockerfile:1

# Build läuft immer auf der Plattform des Builders, nur das schlanke Caddy-Image wird pro Architektur gebaut.
FROM --platform=$BUILDPLATFORM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM caddy:2-alpine
COPY deploy/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
EXPOSE 80
