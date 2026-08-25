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
