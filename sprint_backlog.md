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

## Nächste Schritte

- [ ] Login-Button hinzufügen, der bei Klick zu `/dashboard` springt (`useNavigate`)
- [ ] Weitere Seiten: Ranking, Profil mit Achievements
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
