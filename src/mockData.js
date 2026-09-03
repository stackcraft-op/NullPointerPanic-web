// Test-Daten im Format des echten Contracts (GET /api/flashcards/daily) - nur zum
// Ausprobieren im Browser, solange der echte Endpoint noch nicht läuft.
export const tagesKartenMock = [
    {
        id: 42,
        question: "Was ist ein Subnetz?",
        answer: "Ein logisch unterteilter Teil eines groesseren Netzwerks.",
        exam_type: "ap2_fisi",
        topic: { id: 3, name: "Netzwerktechnik" },
    },
    {
        id: 43,
        question: "Was bedeutet die 3. Normalform?",
        answer: "Es gibt keine transitiven Abhaengigkeiten zwischen Nicht-Schluesselattributen.",
        exam_type: "ap2_fisi",
        topic: { id: 1, name: "Datenbanken" },
    },
    {
        id: 44,
        question: "Was enthält das Product Backlog?",
        answer: "Alle offenen Anforderungen an ein Produkt, priorisiert.",
        exam_type: "ap2_fisi",
        topic: { id: 5, name: "Scrum" },
    },
];

//testdaten für die wiki-seite - inhaltsverzeichnis der 6. ihk prüfungsbereiche, inhalt absichtlich leer

export const wikiThemenMock = [
    { id: 1, titel: "IT-Infrastruktur & Netzwerke", inhalt: "" },
    { id: 2, titel: "Softwareentwicklung & Programmierung", inhalt: "" },
    { id: 3, titel: "Datenbanken & Datenanalyse", inhalt: "" },
    { id: 4, titel: "IT-Sicherheit & Datenschutz", inhalt: "" },
    { id: 5, titel: "Projektmanagement & Qualitätssicherung", inhalt: "" },
    { id: 6, titel: "BWL, Wirtschaft & Organisation", inhalt: "" },
];

// ---------------------------------------------------------------------------
// Daily Learning (Neuentscheidung mit Kollege, 01.09): Thema auswählen -> Stapel
// Karteikarten -> nach 20 abgearbeiteten Karten Quiz freigeschaltet. Gleiche
// Themen-IDs/Titel wie wikiThemenMock (identische 6 IHK-Bereiche, passt später
// nahtlos auf GET /api/topics/progress). Jede Karte hat zusätzlich eine
// quizFrage - die wird erst gebraucht, sobald die Karte "abgearbeitet" ist.
//
// Noch keine 100 Karten pro Thema von Hand getippt: "IT-Sicherheit" hat 24
// Testkarten (genug, um die 20er-Schwelle wirklich auszulösen), die anderen 5
// Themen nur ein paar Platzhalter, damit die Themenliste nicht leer aussieht.
function machKarte(id, frage, antwort, quizAntworten, korrekteIndex) {
    return {
        id,
        frage,
        antwort,
        quizFrage: {
            frageText: `Frage zur Karte: ${frage}`,
            antworten: quizAntworten,
            korrekteIndex,
        },
    };
}

function machPlatzhalterKarten(kuerzel, anzahl, startId = 1) {
    return Array.from({ length: anzahl }, (_, i) => {
        const nr = startId + i;
        return machKarte(
            nr,
            `${kuerzel}-Testkarte ${nr}: Platzhalter-Begriff`,
            `Platzhalter-Erklärung ${nr}`,
            ["Antwort A", "Antwort B", "Antwort C", "Antwort D"],
            0
        );
    });
}

const itSicherheitKarten = [
    machKarte(1, "Was ist Phishing?", "Betrugsversuch, um über gefälschte Nachrichten/Seiten an Zugangsdaten zu kommen.", ["Ein Computervirus", "Betrug über gefälschte Nachrichten/Seiten", "Ein Verschlüsselungsverfahren", "Ein Firewall-Typ"], 1),
    machKarte(2, "Was bedeutet 'Zwei-Faktor-Authentifizierung'?", "Anmeldung mit zwei unabhängigen Nachweisen, z.B. Passwort + Code auf dem Handy.", ["Zwei Passwörter hintereinander", "Login mit zwei unabhängigen Nachweisen", "Zwei Nutzerkonten gleichzeitig", "Doppelte Verschlüsselung der Daten"], 1),
    machKarte(3, "Was ist eine Firewall?", "System, das Netzwerkverkehr nach Regeln filtert und unerwünschte Zugriffe blockiert.", ["Ein Virenscanner", "Ein System, das Netzwerkverkehr nach Regeln filtert", "Ein Backup-Verfahren", "Ein Passwort-Manager"], 1),
    machKarte(4, "Was ist Ransomware?", "Schadsoftware, die Daten verschlüsselt und Lösegeld für die Freigabe fordert.", ["Werbesoftware", "Schadsoftware, die Daten verschlüsselt und Lösegeld fordert", "Ein Backup-Tool", "Ein Netzwerkprotokoll"], 1),
    machKarte(5, "Was regelt die DSGVO?", "Den Schutz personenbezogener Daten innerhalb der EU.", ["Urheberrecht an Software", "Schutz personenbezogener Daten in der EU", "Steuerpflichten von Unternehmen", "Netzwerksicherheit von Servern"], 1),
    machKarte(6, "Was ist ein 'Man-in-the-Middle'-Angriff?", "Angreifer schaltet sich unbemerkt in die Kommunikation zweier Parteien ein.", ["Ein Angriff auf physische Server", "Angreifer belauscht/manipuliert Kommunikation zwischen zwei Parteien", "Ein Passwort-Rate-Angriff", "Ein Virus, der sich per USB verbreitet"], 1),
    ...machPlatzhalterKarten("ITSec", 18, 7), // IDs 7-24, damit sie nicht mit 1-6 oben kollidieren
];

export const dailyLearningThemenMock = wikiThemenMock.map((thema) => ({
    id: thema.id,
    titel: thema.titel,
    karten: thema.id === 4 ? itSicherheitKarten : machPlatzhalterKarten(thema.titel.slice(0, 4), 6),
}));

// ---------------------------------------------------------------------------
// Shop: kaufbare Avatare + Rahmen
// ---------------------------------------------------------------------------
// Feldnamen (type/price/image_url/owned) sind absichtlich 1:1 aus dem
// geplanten Backend-Contract (GET /api/shop/items) übernommen - siehe
// API_CONTRACT.md, sobald der Endpoint gebaut ist.
// image_url zeigt auf public/avatare/ (gleicher Ordner wie die Stufen-
// Avatare) - Dateinamen bewusst neutral (avatar-1..4), nicht die Namen der
// abgebildeten Personen, genau wie die Anzeigenamen unten.
export const shopItemsMock = [
  { id: 1, type: "avatar", name: "Avatar 1", price: 50, image_url: "/avatare/avatar-1.avif", owned: false },
  { id: 2, type: "avatar", name: "Avatar 2", price: 50, image_url: "/avatare/avatar-2.jpg", owned: false },
  { id: 3, type: "avatar", name: "Avatar 3", price: 150, image_url: "/avatare/avatar-3.webp", owned: false },
  { id: 4, type: "avatar", name: "Avatar 4", price: 150, image_url: "/avatare/avatar-4.jpg", owned: false },
  // farbe nur bei Rahmen: faerbt den Ring um den Avatar-Platzhalter im Shop
  // (siehe .shop-karte-vorschau-rahmen). image_url ist bewusst derselbe
  // Beispiel-Avatar wie oben (Avatar 1) statt eines generischen Icons - so
  // sieht man sofort, was der Rahmen am echten Avatar veraendert.
  // abzeichen (optional): kleines Emoji-Badge oben auf dem Ring, aktuell nur
  // fuer den Kronen-Rahmen - Platzhalter bis es echte Rahmen-Grafiken statt
  // Farbring+Badge gibt (siehe Chat: game-icons.net/Kenney.nl als Quellen).
  { id: 5, type: "frame", name: "Silber-Rahmen", price: 100, image_url: "/avatare/avatar-1.avif", farbe: "#adb5bd", owned: false },
  { id: 6, type: "frame", name: "Gold-Rahmen", price: 200, image_url: "/avatare/avatar-1.avif", farbe: "#c9a227", owned: false },
  { id: 7, type: "frame", name: "Feuer-Rahmen", price: 300, image_url: "/avatare/avatar-1.avif", farbe: "#c0392b", owned: false },
  { id: 8, type: "frame", name: "Kronen-Rahmen", price: 500, image_url: "/avatare/avatar-1.avif", farbe: "#7c3aed", abzeichen: "👑", owned: false },
];
