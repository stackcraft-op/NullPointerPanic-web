# Sprint Backlog – React-Einarbeitung (Frontend)

Projekt: Gamifizierte IHK AP1/AP2-Lernplattform (Scrum-Teamprojekt, FIAE)
Rolle: Frontend (React). Ziel: bis Tag 3 erläutern können, was frontendseitig machbar ist.

## Erledigt – 2026-08-17

- [x] React-Grundlagen verstanden: Komponenten, JSX, `return`-Pflicht, `export default` / `import`
- [x] React Router installiert (`react-router-dom`)
- [x] Grundgerüst mit `BrowserRouter` / `Routes` / `Route` aufgesetzt
- [x] StartPage gebaut (Überschrift, Text, Link)
- [x] LoginPage gebaut
- [x] DashboardPage **eigenständig** gebaut und korrekt verkabelt (Route + Import)
- [x] Navigation Start → Login funktioniert (`<Link to="...">`)
- [x] Login-Formular mit funktionierendem, live-aktualisiertem Eingabefeld (Controlled Input via `useState`)
- [x] Login-Button mit `useNavigate` springt bei Klick zu `/dashboard`
- [x] Erste eigene Komponente `XPBar` gebaut und mit Props in `DashboardPage` eingebunden

## Nächste Schritte

- [ ] Ranking-Liste anzeigen (Listen rendern mit `.map()` + `key`)
- [ ] XPBar optisch zum echten Balken ausbauen (Prozent-Berechnung)
- [ ] Weitere Seiten: Profil mit Achievements
- [ ] Später: echte Daten vom Ruby-Backend laden (`useEffect` + `fetch`)

---

## Glossar (bisher gelernte Begriffe)

| Begriff | Kurz erklärt |
|---|---|
| **Komponente** | Wiederverwendbarer Baustein für ein Stück UI, im Kern eine Funktion, die JSX zurückgibt |
| **JSX** | "JavaScript XML" – HTML-ähnlicher Code innerhalb von JavaScript, wird beim Speichern automatisch in normales JS übersetzt |
| **`return`** | Jede Komponente muss ihr JSX per `return` zurückgeben, sonst wird nichts angezeigt |
| **Props** | Werte, die eine Komponente von außen übergeben bekommt (wie ein Zettel mit Anweisungen) |
| **State** | Speicher, den eine Komponente sich selbst merkt, lesbar und veränderbar; Änderung löst Neu-Zeichnen aus |
| **`useState(startwert)`** | Erzeugt State, gibt `[aktuellerWert, changerFunktion]` zurück |
| **`export default Name;`** | Macht eine Komponente aus dieser Datei für andere Dateien nutzbar |
| **`import Name from "./pfad"`** | Holt eine exportierte Komponente aus einer anderen Datei |
| **Namenskollision** | Zwei Dinge (z.B. `import` und eigene Funktion) dürfen in derselben Datei nicht denselben Namen haben |
| **`<BrowserRouter>`** | Aktiviert Routing für die ganze App (einmal außen rum) |
| **`<Routes>`** | Container/Liste aller Seiten-Zuordnungen |
| **`<Route path="..." element={...} />`** | Eine einzelne Regel: "bei dieser Adresse, zeig diese Komponente" |
| **`<Link to="...">`** | Wie `<a href>`, aber ohne Seiten-Neuladen – nur der Inhalt wechselt |
| **Controlled Input** | Eingabefeld, dessen Inhalt komplett von React (State) gesteuert wird: `value={state}` + `onChange` |
| **`event`** | Automatisch mitgeliefertes Objekt bei jedem Ereignis (Klick, Tastendruck, ...) |
| **`event.target`** | Das konkrete HTML-Element, wo das Ereignis stattfand |
| **`event.target.value`** | Der aktuelle Text/Wert in genau diesem Element |
| **`useNavigate()`** | Gibt eine einzelne Funktion zurück, mit der man "per Code" zu einer anderen Route springen kann |
| **`<Link>` vs. `useNavigate()`** | `<Link>` springt sofort ohne Bedingung. `useNavigate()` erlaubt vorher eigene Logik/Prüfung, dann erst springen |
| **Objekt-Destrukturierung `{ a, b }`** | Wie Array-Destrukturierung, nur für Objekte statt Arrays – packt einzelne Felder direkt aus |
| **Props-Objekt** | Jede Komponente bekommt technisch nur EIN Objekt mit allen Props übergeben, `{ xp, maxXp }` in der Parameterklammer packt es sofort aus |
| **`prop="text"` vs. `prop={wert}`** | Anführungszeichen = fester String. Geschweifte Klammern = echter JS-Wert (Zahl, Variable, Ausdruck) |
| **Relative Importpfade (`../ordner`)** | `..` = einen Ordner nach oben, dann rein in den Zielordner – reine Dateipfad-Navigation |
