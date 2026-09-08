# NullPointerPanic – Web (Frontend)

Frontend einer gamifizierten Lernplattform zur Vorbereitung auf die IHK-Prüfungen
AP1 und AP2 (Fachinformatiker Anwendungsentwicklung). Scrum-Teamprojekt im Rahmen
der Umschulung.

**Team:** Frontend (React, dieses Repo) – @the-neyro · Backend (Ruby on Rails) – @philipprcodes,
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

```
src/
├─ pages/             eine Datei pro Route (Dashboard, Ranking, Profil, Shop, Quiz, ...)
├─ components/        wiederverwendbare Bausteine (Navbar, Leaderboard, XPBar,
│                     GeschuetztesBild – ngrok-Workaround fürs Laden von Bildern
│                     vom Backend, SpielerProfilPopup – Ranking-Profil-Popup)
├─ api.js             fetch()-Calls ans Ruby-Backend (Login, Register, Profil,
│                     Shop, Ranking, Daily Learning, ...)
├─ mockData.js        Mock-Daten für Features, die (noch) mit Testdaten laufen
├─ utils.js           kleine seitenübergreifende Helfer (Fortschrittsbalken-Farbe/-Breite)
├─ useKartenSwipe.js  Hook fürs Touch-Wischen auf dem Kartenstapel (Dashboard + Daily Learning)
├─ UserContext.jsx    globaler State ohne Prop-Drilling (Name, Titel, Currency)
└─ php-design.css     Design/Layout (Farben, Nav, Buttons, Tabelle, responsive ab 640px)
```

## Seiten

| Route | Seite |
|---|---|
| `/` | Startseite |
| `/login`, `/registrieren` | Login / Registrierung |
| `/dashboard` | Tageskarte + Weekly Ranking (Karte per Klick oder Touch-Wisch beantworten) |
| `/ranking` | Komplettes Ranking (Weekly + Global, nach Bundesland filterbar) – Klick auf einen Username öffnet ein Profil-Popup (Avatar, Rahmen, Statustext, Gesamtfortschritt) |
| `/shop` | Avatare & Rahmen kaufen/ausrüsten, Statustext ändern |
| `/profil`, `/profil/bearbeiten` | Profil ansehen / bearbeiten |
| `/quiz` | Quiz |
| `/karteikarten` | Karteikarten (aktuell toter Zweig – kein Weg mehr, Karten hineinzuspeichern, seit `/learning` das übernommen hat) |
| `/learning` | Daily Learning – Thema wählen, Karten abarbeiten (Klick oder Wisch), Quiz ab 20 abgehakten Karten |
| `/wiki` | Nachschlagewerk mit Volltextsuche, springt bei mehreren Treffern im selben Thema nacheinander zu jedem einzelnen |

## Backend

Läuft getrennt im Repo `NullPointerPanic-api` (Ruby on Rails). Die
API-Verträge (Request/Response-Formate) stehen dort in `API_CONTRACT.md`.
