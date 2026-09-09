# syntax=docker/dockerfile:1

# Zweistufiger Build: 1) Node baut das Vite-Projekt zu statischen Dateien
# (dist/), 2) ein schlankes nginx liefert nur noch diese fertigen Dateien
# aus. Node selbst landet NICHT im finalen Image - das haelt es klein und
# es muss zur Laufzeit kein JS-Toolchain mehr vorhanden sein.

# ===== Stufe 1: Build =====
FROM node:24-alpine AS build
WORKDIR /app

# Erst nur die Lockfiles kopieren und installieren - Docker cached diesen
# Layer, solange sich package*.json nicht aendern. Aendert sich nur Code
# (src/, ...), muss "npm ci" beim naechsten Build nicht erneut laufen.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# VITE_API_URL wird von Vite beim Bauen fest in die JS-Dateien eingebacken
# (Vite-Umgebungsvariablen sind KEINE Laufzeit-Variablen wie bei Rails/Ruby -
# nach dem Build steht die URL im Code, nicht mehr aenderbar ohne Neubau).
# --build-arg VITE_API_URL=... beim "docker build" ueberschreiben, sonst
# gilt der Default unten.
ARG VITE_API_URL=http://localhost:3000
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# ===== Stufe 2: Ausliefern =====
FROM nginx:alpine

# Eigene Konfig noetig fuer React Router (SPA): ohne sie wuerde nginx bei
# z.B. /quiz einen echten Ordner "quiz" suchen und 404 zurueckgeben, statt
# index.html auszuliefern und React Router client-seitig routen zu lassen.
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
