# NullPointerPanic – Web (Frontend)

Frontend einer gamifizierten Lernplattform zur Vorbereitung auf die IHK-Prüfungen
AP1 und AP2 (Fachinformatiker Anwendungsentwicklung). Scrum-Teamprojekt im Rahmen
der Umschulung.

**Team:** Frontend (React, dieses Repo) – @the-neyro · Backend (Ruby on Rails) – Kollege,
separates Repo [`NullPointerPanic-api`](https://github.com/stackcraft-op/NullPointerPanic-api)

## Tech Stack

- React 19 + Vite
- React Router (Client-seitiges Routing)
- Plain CSS (`php-design.css` – Design aus einem früheren PHP-Projekt übernommen)

## Setup

1. `npm install`
2. `.env` anlegen (siehe `.env.example`):
VITE_API_URL=http://localhost:3000


(URL des laufenden Backends – lokal oder per ngrok)
3. `npm run dev` → http://localhost:5174

## Verfügbare Scripts

| Befehl | Macht |
|---|---|
| `npm run dev` | Entwicklungsserver mit Hot Reload |
| `npm run build` | Produktions-Build nach `dist/` |
| `npm run lint` | Oxlint über den Code laufen lassen |
| `npm run preview` | Gebauten Build lokal testen |

## Projektstruktur

src/
├─ pages/        eine Datei pro Route (Dashboard, Ranking, Profil, Quiz, ...)
├─ components/   wiederverwendbare Bausteine (Navbar, Leaderboard, XPBar)
├─ api.js        fetch()-Calls ans Ruby-Backend (Login, Register, Profil speichern)
├─ UserContext.jsx  globaler State ohne Prop-Drilling (Name, Titel, Currency)
└─ php-design.css   Design/Layout (Farben, Nav, Buttons, Tabelle, ...)



## Seiten

| Route | Seite |
|---|---|
| `/` | Startseite |
| `/login`, `/registrieren` | Login / Registrierung |
| `/dashboard` | Tageskarte + Weekly Ranking |
| `/ranking` | Komplettes Ranking (Weekly + Global) |
| `/profil`, `/profil/bearbeiten` | Profil ansehen / bearbeiten |
| `/quiz` | Quiz |
| `/karteikarten` | Karteikarten (Feature in Arbeit) |
| `/learning` | Daily Learning |

## Backend

Läuft getrennt im Repo `NullPointerPanic-api` (Ruby on Rails). Die
API-Verträge (Request/Response-Formate) stehen dort in `API
