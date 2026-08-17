## 17.08

## einführung react

Jede React-Komponente MUSS mit return etwas zurückgeben (JSX), sonst zeigt sie nichts an. Das wird dir noch öfter passieren, das ist super normal am Anfang.
.jsx – javascript xml
export default Name;
Macht eine Komponente aus dieser Datei für andere Dateien nutzbar ("Paket verschicken"). Gegenstück: import Name from "./pfad" ("Paket abholen"). Pro Datei nur ein export default erlaubt

npm run build
Baut das Projekt einmal komplett und zeigt Fehler an, die man beim reinen Rumklicken im Browser evtl. übersieht – guter schneller Check zwischendurch

## React Router installiert & Grundkonzept verstanden (Navigation zwischen Seiten ohne Reload)

React Router ist der "Türsteher" der App: Er schaut sich die Adresszeile an (z.B. /login, /dashboard) und zeigt je nachdem eine andere Komponente an – ohne dass die Seite neu lädt. Dadurch fühlt sich eine React-App wie mehrere Seiten an, ist technisch aber weiterhin nur eine einzige HTML-Seite ("Single Page App").

## es wurde login simmuliert erstellt und als neues route in app.jsx hinzugefügt

## ein link from start screen to login

<Link to="/login"> ist quasi wie <a href="/login">, nur dass React Router dabei nicht die ganze Seite neu lädt – nur der Inhalt in der Mitte wechselt (schneller, kein weißer Blitz).

## State in React: ein Stück Speicher, das die Komponente sich selbst merkt, jederzeit auslesen kann, und das sich ändern kann. Der echte Fachbegriff dafür ist einfach "State" (oder auf Deutsch "Zustand") – das musst du dir merken, nicht "Post-it". Das Bild soll dir nur helfen, dir vorzustellen, WAS State eigentlich ist (Speicher, den man beschreiben und lesen kann), nicht mehr.

event
Automatisch mitgeliefertes Objekt bei jedem Ereignis (Klick, Tastendruck...) – enthält Infos darüber, was passiert ist
event.target
Das konkrete HTML-Element, wo das Ereignis stattgefunden hat
event.target.value
Der aktuelle Text/Wert, der in genau diesem Element gerade steht

## Array-Destrukturierung

    [a, b] = array	JS-Kurzschreibweise, um einzelne Einträge eines Arrays direkt in Variablen auszupacken

## useState()

     Rückgabewert	Immer ein Array mit 2 Einträgen: [aktuellerWert, changerFunktion] – unabhängig davon, WAS der State selbst ist

## Der State-Wert selbst

    Kann Text, Zahl, Boolean, Objekt oder Array sein – bestimmt durch den Startwert in useState(...)

## useNavigate()

gibt dir eine Funktion (navigate), mit der du "per Code" zu einer anderen Adresse springen kannst – wie ein Link, nur ausgelöst durch eine Aktion (hier: Klick) statt durch direktes Anklicken eines <Link>.

## Faustregel:

Reiner Klick-Link ohne Bedingung (z.B. "zurück zum Dashboard", "Los geht's" auf der Startseite) → <Link>
Erst Logik, dann vielleicht navigieren (Formulare, Login, Validierung) → Button + useNavigate()

## Props-Objekt

    React übergibt jeder Komponente immer nur EIN Objekt mit allen Props. { xp, maxXp } in der Parameterklammer ist Objekt-Destrukturierung, keine echten 2 Parameter

## Objekt-Destrukturierung

    Kurzschreibweise, um einzelne Felder direkt aus einem Objekt in Variablen auszupacken – ähnlich wie Array-Destrukturierung, nur mit { } statt [ ]

## Die geschweiften Klammern { } in JSX bedeuten generell: "das hier drin ist kein fester Text, sondern echtes JavaScript" – kann eine Zahl sein, eine Variable, ein Rechenausdruck, was auch immer. Für Zahlen, Booleans, Variablen etc. brauchst du deshalb immer die geschweiften Klammern statt Anführungszeichen.

Kleiner Merksatz für dich: jede Komponente, die du irgendwo als <Xyz /> benutzt, muss vorher entweder in derselben Datei definiert ODER importiert sein – sonst kennt JavaScript den Namen nicht. Das war schon zweimal dein Stolperstein (erst bei StartPage, jetzt bei RankingPage) – ein guter Punkt für deinen persönlichen "worauf ich achten muss"-Merkzettel.

## .map() – Leaderboard-Komponente

.map() geht ein Array durch, wandelt JEDES Element per eigener Funktion in etwas Neues um (hier: Objekt → <li>-Element), gibt ein NEUES Array zurück, Original bleibt unverändert.
key={eindeutigeId} ist Pflicht bei per .map() erzeugten Listen-Elementen, damit React sie beim Neuzeichnen auseinanderhalten kann (am besten eine echte ID aus den Daten, nicht den Array-Index).

## Component vs. Page (präzisiert)

Nicht "Logik vs. Anzeige". Sondern: Component = wiederverwendbar / mehrfach gebraucht (z.B. XPBar, Leaderboard). Page = gehört zu einer URL, darf auch eigene Logik haben, wenn die nur für diese eine Seite gilt (z.B. LoginPage mit useState + useNavigate direkt drin, keine eigene Komponente nötig).

## ProfilPage – Achievements mit Freischalt-Logik

Ternärer Operator: bedingung ? wertWennWahr : wertWennFalsch – Kurzform für if/else innerhalb eines Ausdrucks.
Beispiel: xp >= achievement.schwelle ? "✅ freigeschaltet" : "🔒 gesperrt"

- [x] Leaderboard-Komponente mit .map() + key gebaut
- [x] RankingPage erstellt und Route verkabelt
- [x] ProfilPage mit Achievement-Liste + Freischalt-Logik (ternärer Operator) gebaut und Route verkabelt

## Navbar – Navigation zwischen den Seiten

NavLink = wie Link, kennt aber zusätzlich seinen eigenen "aktiv"-Zustand (für spätere Hervorhebung der aktuellen Seite).
JSX entfernt Zeilenumbrüche zwischen Elementen (anders als normales HTML) – deshalb kein automatischer Abstand zwischen den NavLinks, Abstand muss per CSS kommen.
nav a (CSS-Selektor) = "jedes <a>-Element innerhalb eines <nav>" – NavLink wird im Browser zu einem echten <a>-Tag, deshalb greift der Selektor.

- [x] Navbar-Komponente gebaut (NavLink zu Dashboard, Ranking, Profil)
- [x] Navbar in Dashboard-, Ranking- und Profil-Seite eingebunden
- [x] CSS-Abstand zwischen Navi-Links ergänzt (index.css)
