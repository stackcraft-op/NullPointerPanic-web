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
    { id: 6, titel: "BWL, Wirtschaft & Organisation", inhalt: "Kevin" },
];