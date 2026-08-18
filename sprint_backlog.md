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

## ProfilPage – Name & Avatar

Test-Variablen name/avatar angelegt und mit {avatar} {name} in JSX eingebaut. Später soll der echte Name aus dem Login (useState in LoginPage) hier ankommen - dafür müsste State zwischen Seiten geteilt werden (größerer nächster Schritt, noch offen).

## Feature-Idee (Kollege): Karteikarten zusätzlich zum Quiz

Neben dem Quiz sollen tägliche Karteikarten fürs aktive Wiederholen kommen (Spaced Repetition): Karte anzeigen, bei "weiß ich schon" verschwindet sie aus der Liste. Technisch easy machbar - neues Konzept: State, der ein Array ist, und Elemente daraus entfernen.

FlashcardsPage angelegt: State ist diesmal ein ganzes Array (karten/setKarten), nicht nur ein einzelner Wert wie bisher. Route /karteikarten + Navbar-Link ergänzt. "Karte entfernen beim Klick" folgt als nächster Schritt (.filter()).

- [x] FlashcardsPage mit Karten-Liste (State als Array) gebaut, Route + Navbar-Link verkabelt

## Karte per Klick entfernen (.filter())

.filter() geht die Liste durch und behält NUR die Elemente, die eine Bedingung erfüllen - anders als .map() (wandelt jedes Element um, Anzahl bleibt gleich), verändert .filter() die Anzahl der Elemente.
karten.filter((karte) => karte.id !== id) = "behalte alle Karten, deren id NICHT der angeklickten id entspricht" - die eine Karte fällt raus.
setKarten(...) ersetzt die alte Liste komplett durch die neue (gekürzte) Liste, React zeichnet automatisch neu.
Stolperstein gehabt: neuer <li> mit Button wurde AUSSERHALB von .map() eingefügt statt INNERHALB - karte gibt's aber nur innerhalb der .map()-Funktion, außerhalb "nicht definiert"-Fehler.

- [x] Karteikarten-Mechanismus fertig: Klick auf "Weiß ich schon" entfernt die Karte per .filter() aus dem Array-State

## 18.08

## QuizPage gebaut – State + Events + Conditional Rendering kombiniert

Neu diesmal: zwei zusätzliche States neben dem Fragen-Array selbst – `aktuelleFrage` (Zahl,
Index der gerade angezeigten Frage im Array, Start bei 0) und `feedback` (Text, der nach
Klick "Richtig!!!" oder "Falsch, richtig wäre ..." anzeigt, Start leer).
`frage = fragen[aktuelleFrage]` ist KEIN State, nur eine normale Variable, die sich bei
jedem Neuzeichnen frisch aus dem Array holt, welche Frage gerade dran ist.

onClick mit Pfeilfunktion, z.B. `onClick={()=> antwortKlick(antwort)}`:
Ohne die `()=>`-Verpackung würde `antwortKlick(antwort)` sofort beim Zeichnen der Seite
laufen (nicht erst beim Klick) - Fehler. Mit `()=>` drumherum wird stattdessen eine neue,
unbenannte Funktion übergeben ("Zettel mit Anweisung"), die React sich merkt und ERST beim
tatsächlichen Klick ausführt. Nötig, sobald man der Klick-Funktion einen eigenen Wert
mitgeben will (hier: welcher der 3 Antwort-Texte geklickt wurde) statt nur das automatische
Klick-Event.

- [x] QuizPage-Gerüst angelegt, Route (/quiz) + Navbar-Link verkabelt
- [x] Quiz-Fragen als Array-State (id, frage, antworten[], richtig) angelegt
- [x] Aktuelle Frage anzeigen (aktuelleFrage-Index + frage-Variable) + Antwort-Buttons per .map()
- [x] Klick-Handler antwortKlick() prüft Antwort gegen frage.richtig, setzt feedback-Text (ternärer Operator)

## Feature-Scope-Update (Kollege): Karteikarten vs. Quiz klarer getrennt

Rücksprache mit dem Backend-Kollegen: Karteikarten sind eigentlich als täglicher
Lern-Input gedacht (z.B. "hier sind deine 10 Karten für heute") - reine Info-Anzeige zum
Durchlesen/Merken, kein Abfragen. Der von uns gebaute Mechanismus (Karte anklicken →
verschwindet aus der Liste per .filter()) ist technisch fertig und bleibt bestehen, wird
aber zu einem SPÄTEREN Feature (z.B. "als gelernt markieren" innerhalb der täglichen
Lernkarten), nicht der Kernfunktion. Kein Code-Änderungsbedarf jetzt, nur Einordnung für
die Team-Abstimmung an Tag 3 wichtig.

## Quiz – Nächste-Frage-Button + Ende abfangen (early return)

naechsteFrage() zählt aktuelleFrage per setAktuelleFrage(aktuelleFrage+1) hoch und setzt
feedback zurück auf "". Ohne Absicherung würde bei der letzten Frage fragen[3] (existiert
nicht) zu einem Absturz führen (frage = undefined, frage.frage nicht lesbar).
Fix: if(!frage){ return (...) } ganz oben im return-Bereich - "früher return": sobald diese
Bedingung zutrifft, gibt die Funktion sofort die Endnachricht zurück, der Rest der Funktion
läuft dann gar nicht mehr.

- [x] naechsteFrage()-Button gebaut, zählt aktuelleFrage-Index hoch
- [x] Quiz-Ende abgefangen (early return mit if(!frage)) statt Absturz bei letzter Frage

## Login/Registrierung – Architektur-Klärung fürs Team

Ablauf-Vereinbarung fürs Backend-Gespräch (Tag 3): Frontend schickt beim Login-/Registrieren-
Klick die Formulardaten als JSON per fetch() (POST) an Ruby - fetch() direkt in der
Klick-Funktion, KEIN useEffect (useEffect ist nur für automatisch beim Öffnen einer Seite
geladene Daten, z.B. Ranking-Liste). Ruby vergleicht mit der DB und schickt Erfolg/Fehler
zurück, Frontend navigiert dann per useNavigate() weiter oder zeigt Fehlertext.

Passwort-Hashing macht bewusst NICHT das Frontend (bringt sicherheitstechnisch nichts, wenn
nur der Hash verschickt wird, und wäre Business-Logik) - macht das Backend mit bcrypt, bevor
das Passwort in die DB geschrieben wird. Frontend schickt nur das Klartext-Passwort im JSON.

Vorschlag Schnittstellen-Vertrag (JSON-Form), als Diskussionsgrundlage für den Kollegen:
{ "benutzername": "max", "passwort": "geheim123" } (Request)
{ "erfolg": true, "name": "Max", "xp": 120 } bzw. { "erfolg": false, "fehler": "..." } (Response)

RegisterPage gebaut (/registrieren, Route + Link von LoginPage aus verkabelt): eigene
Controlled Inputs für Benutzername/Passwort/Passwort-Wiederholung, Vergleich der beiden
Passwort-Felder als reine Frontend-Anzeigelogik (kein echter Sicherheitscheck - der passiert
später im Backend). Neues Muster: if-Anweisung VOR dem return, Ergebnis in einer normalen
Variable (fehlerText) gespeichert, im JSX nur noch {fehlerText} referenziert - weil in JSX
nur Ausdrücke (keine if-Anweisungen) direkt in { } stehen dürfen.

- [x] Login/Registrierung-Datenfluss + Schnittstellen-Vertrag (JSON) für Backend-Gespräch geklärt
- [x] Passwort-Hashing bewusst als Backend-Aufgabe (bcrypt) eingeordnet, nicht Frontend
- [x] RegisterPage gebaut: Formular + Passwort-Übereinstimmungs-Check, Route + Link verkabelt

## Login-Name state-lifting (App.jsx als gemeinsamer Speicherort)

Zwei Seiten (LoginPage, ProfilPage) sind komplett getrennte Dateien und können normalerweise
nichts voneinander sehen. Der Name muss deshalb dort gespeichert werden, wo BEIDE Zugriff
haben - das ist App.jsx, weil dort beide Seiten per <Route> eingebunden werden ("state
lifting": den State eine Ebene höher legen, zum gemeinsamen Elternteil).

Umsetzung: eingeloggterName + setEingeloggterName liegen jetzt in App.jsx (useState).
LoginPage bekommt nur setEingeloggterName als Prop (den "Stift" - darf schreiben), ruft ihn
beim Login-Klick auf (einloggen()-Funktion: erst setEingeloggterName(name), dann navigate).
ProfilPage bekommt nur eingeloggterName als Prop (den "Zettel-Inhalt" - darf nur lesen),
zeigt ihn per {eingeloggterName} an, kein hart codierter Test-Name mehr.
Wichtig: die zwei Props brauchen unterschiedliche Namen als LoginPages eigenes lokales
name/setName (Eingabefeld-State), sonst Verwechslungsgefahr zwischen "was gerade getippt
wird" und "was tatsächlich eingeloggt ist".

Zusätzlich: Passwort-Feld (type="password", eigener State) in LoginPage ergänzt - wird
aktuell noch nicht ausgewertet (kein echter Login-Check ohne Backend), sammelt aber schon
strukturell das Passwort mit, für den späteren fetch()-Request an Ruby.

- [x] Gemeinsamer Name-State in App.jsx angelegt (eingeloggterName/setEingeloggterName)
- [x] LoginPage schreibt beim Login-Klick in den gemeinsamen State (Prop: setEingeloggterName)
- [x] ProfilPage liest den gemeinsamen State aus (Prop: eingeloggterName) statt Test-Wert "Alex"
- [x] Passwort-Feld in LoginPage ergänzt (State + Controlled Input, type="password")

## DailyLearningPage (/learning) – Karten mit Klick-zum-Aufklappen

Neues Muster: pro Karte in .map() individuell entscheiden, ob ihre Info sichtbar ist -
offeneKarteId (State) merkt sich die id der gerade aufgeklappten Karte (Start: null =
keine). Pro Karte Vergleich karte.id === offeneKarteId, nur bei Treffer wird info befüllt.
Dafür brauchte die Pfeilfunktion in .map() erstmals { } + eigenes return statt der kurzen
(...)-Schreibweise, weil vorher noch eine if-Prüfung laufen muss.
Debugging-Fund (Klammer-Fehler): eine überzählige } hat die Pfeilfunktion zu früh
geschlossen, sodass return danach "allein" (außerhalb jeder Funktion) stand - ergab keinen
gültigen Code. Zweiter Fund: nach Umbenennung der Datei (Tippfehler behoben) musste der
Import-Pfad in App.jsx manuell nachgezogen werden, sonst findet React die Datei nicht mehr.

- [x] DailyLearningPage gebaut (Route /learning + Navbar-Link), 5 Karten mit Thema+Info
- [x] Klick auf Thema zeigt Info darunter an (offeneKarteId-State, .map() mit if+return)
- [x] "Ist mir klar, entfernen"-Button (.filter(), bekanntes Muster)

## FlashcardsPage – Quizlet-Prinzip (Frage→Antwort aufdecken→Weiß ich/Weiß ich noch nicht)

Umbau der ursprünglichen Karteikarten nach Vorbild Quizlet: Karte zeigt erst nur die Frage,
Klick auf "Antwort zeigen" deckt die Antwort auf, dann zwei Buttons: "Weiß ich" (Karte fällt
komplett raus, .filter()) oder "Weiß ich noch nicht" (Karte fällt raus UND wird hinten
wieder angehängt, .filter() + .concat() kombiniert) - eine Art Schleife, die erst endet,
wenn alle Karten als "weiß ich" markiert wurden (Array leer, early return wie beim Quiz).

Neue Konzepte: karte = karten[0] (immer die vorderste Karte der Warteschlange statt Index),
aufgedeckt-State (steuert Frage/Antwort-Ansicht, wird bei jeder neuen Karte auf false
zurückgesetzt), .concat(array) (klebt zwei Arrays zusammen, Original bleibt unverändert -
restKarten.concat([karte]) hängt die aktuelle Karte wieder hinten an), aktionsBereich
(Variable, per if/else vor dem return befüllt mit dem passenden JSX-Block - gleiches Muster
wie fehlerText bei RegisterPage).

- [x] FlashcardsPage nach Quizlet-Prinzip umgebaut: Frage zeigen → Antwort aufdecken → Weiß ich/Weiß ich noch nicht
- [x] "Weiß ich noch nicht" hängt Karte ans Ende der Warteschlange (.filter()+.concat()), Schleife bis Array leer

## Bugfix – Tippfehler LoginPage (Login funktionierte nicht)

value={password} in LoginPage.jsx zeigte auf eine nicht existierende Variable (State heißt
passwort, nicht password) - ReferenceError beim Zeichnen der Seite, dadurch Absturz/weiße
Seite. Merksatz: Variablennamen müssen exakt so geschrieben sein wie beim useState() -
schon ein einziger Buchstabe Unterschied reicht für einen Absturz.

- [x] Tippfehler value={password} -> value={passwort} korrigiert, Login läuft wieder

## Planning – geplante Features (noch NICHT gebaut, Besprechung mit Kollege 18.08)

Reihenfolge/Umsetzung noch offen, hier nur als Gedächtnisstütze für die Weiterarbeit
festgehalten. Für jedes Feature grob eingeordnet, was reines Frontend ist (mit
Fake-Daten schon baubar) und was wirklich Backend/DB braucht:

**1. Ranking in zwei Tabellen aufteilen: Weekly Ranking + Global Ranking**
Frontend: zwei getrennte Leaderboards (z.B. Tabs), mit zwei Fake-Arrays testbar - baubar.
Backend: "diese Woche gesammelte XP" muss die DB zeitlich gefiltert berechnen.

**2. Daily Learning: täglich EIN Thema mit 10-20 Lernpunkten, nach Abschluss aller Punkte
wird ein Quiz zu dem Thema freigeschaltet**
Frontend: Fortschritt zählen (wie viele Punkte abgehakt), Quiz-Button erst per Conditional
Rendering zeigen, wenn alle Punkte abgehakt sind - komplett mit Fake-Daten baubar.
Backend: welches Thema "heute" dran ist (Rotations-/Auswahllogik) entscheidet die DB/Server.

**3. Aus Daily Learning heraus: Punkt per Klick zu den Karteikarten hinzufügen ("finde ich
wichtig"-Button), neuer Tag = neues Thema**
Frontend: komplett baubar - Klick fügt neues Objekt ins karten-Array (State) ein.
Backend: erst nötig, wenn das auch nach Neuladen/auf anderem Gerät erhalten bleiben soll.

**4. Karteikarten nach Ebbinghaus-Kurve: nach Themen sortiert, nach Abschluss eines Themas
startet ein Timer, nach z.B. 8 Stunden Hinweis im Dashboard ("Zeit, Thema X zu
wiederholen"), beim Dashboard-Öffnen wird die Zeit aktualisiert/mit DB-Eintrag verglichen**
WICHTIG (Architektur-Erkenntnis): kein Timer im Frontend, weil der beim Schließen des
Browser-Tabs verloren geht. Stattdessen: Backend speichert nur einen Zeitstempel
("Thema X abgeschlossen um ..."), und bei JEDEM Dashboard-Öffnen fragt das Frontend per
fetch() beim Backend nach ("gibt's was zu wiederholen?") - Backend berechnet aus
gespeichertem Zeitstempel + aktueller Zeit, ob die Schwelle überschritten ist, und schickt
nur das fertige Ergebnis zurück. Frontend zeigt nur an, rechnet nichts selbst nach - passt
zur Architektur-Leitplanke (keine Business-Logik im Frontend).

## Nächster wichtiger Schritt: Vorbereitung auf den Datenaustausch mit dem Backend

Bevor die obigen Features mit echten Daten arbeiten können, muss die Schnittstelle zum
Ruby-Backend vorbereitet werden. Zu klären/vorzubereiten (Team-Gespräch):
- JSON-Vertrag für Login/Registrierung festlegen (siehe Notiz weiter oben:
  { "benutzername": ..., "passwort": ... } etc.)
- JSON-Form für die weiteren Endpunkte grob skizzieren: Ranking (weekly/global getrennt
  abrufbar?), Daily-Learning-Thema des Tages, Karteikarten-Wiederholungs-Hinweis
- Klären, wie/wo der Ruby-Server erreichbar sein wird, da wir NICHT im selben Netz sind
  (Empfehlung: Kollege deployed früh auf Render/Railway kostenlose Stufe, statt ngrok als
  Dauerlösung) - realistisch 1,5-3 Std. Aufwand für den ersten Deploy
- CORS muss im Backend aktiviert werden, sonst blockt der Browser unsere fetch()-Aufrufe
  trotz laufendem Server
- Wissen, dass fetch() bei uns direkt in Klick-Funktionen läuft (Login, Registrieren,
  "Punkt zu Karteikarten"), aber useEffect+fetch dort, wo Daten automatisch beim Öffnen
  einer Seite geladen werden sollen (Ranking, Dashboard, Karteikarten-Wiederholungs-Check)

- [ ] Mit Kollege JSON-Verträge für alle geplanten Endpunkte abstimmen
- [ ] Hosting-Lösung für Ruby-Backend klären (Empfehlung: Render/Railway, früh anfangen)
- [ ] Sobald Backend erreichbar: ersten echten fetch()-Aufruf testen (z.B. Login)

## Weekly/Global-Ranking-Split (Punkt 1 aus dem Planning umgesetzt)

Leaderboard-Komponente war bisher NICHT wiederverwendbar (Spieler-Daten fest eingebaut).
Umbau: Daten raus aus der Komponente, stattdessen als Prop rein (function
Leaderboard({spieler})) - dieselbe Anzeige-Logik (<ul>+.map()) jetzt beliebig oft mit
unterschiedlichen Daten wiederverwendbar, statt sie zu duplizieren.
RankingPage zeigt jetzt zwei getrennte Leaderboards (weeklySpieler, globalSpieler)
untereinander. Zusätzlich Leaderboard mit weeklySpieler auch ins Dashboard eingebaut -
wichtige Klärung dabei: nur die Component (Leaderboard) importieren, NICHT die ganze Page
(RankingPage), weil eine Page (Navbar, Überschriften, mehrere Components) für eine
bestimmte URL gebaut ist und nicht in eine andere Seite eingebettet werden soll - Pages
binden Components zusammen, nicht umgekehrt.

- [x] Leaderboard-Komponente auf Props umgestellt (spieler-Prop statt fest eingebauter Daten)
- [x] RankingPage zeigt Weekly- und Global-Ranking getrennt (zwei Leaderboard-Instanzen)
- [x] Weekly-Ranking zusätzlich im Dashboard eingebunden (nur Component, nicht ganze Page importiert)
