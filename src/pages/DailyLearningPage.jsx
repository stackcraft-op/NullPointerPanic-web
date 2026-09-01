import { useState } from "react";
import Navbar from "../components/Navbar";
import { dailyLearningThemenMock } from "../mockData";

const KARTEN_PRO_QUIZ = 20;

// Einfache Mischfunktion (nicht kryptographisch fair, reicht fuer ein Quiz) -
// baut eine neue, zufaellig sortierte Kopie des Arrays, Original bleibt unveraendert.
function gemischt(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

function DailyLearningPage() {
    const [ausgewaehltesThema, setAusgewaehltesThema] = useState(null);
    // Warteschlange der noch offenen Karten des gewählten Themas (gleiches
    // Muster wie tagesKarten im Dashboard: karte = stapelKarten[0], "Kann ich"
    // entfernt sie per .filter(), "Kann ich noch nicht" haengt sie per
    // .filter()+.concat() wieder hinten an).
    const [stapelKarten, setStapelKarten] = useState([]);
    // Objekt statt einzelner Werte, weil wir pro THEMA eine eigene Liste
    // abgehakter Karten-IDs brauchen: { [themaId]: [karteId, karteId, ...] }
    const [abgehakteKartenIds, setAbgehakteKartenIds] = useState({});

    const [quizModus, setQuizModus] = useState(false);
    const [quizFragen, setQuizFragen] = useState([]);
    const [quizIndex, setQuizIndex] = useState(0);
    const [gewaehlteAntwort, setGewaehlteAntwort] = useState(null);
    const [quizRichtigCount, setQuizRichtigCount] = useState(0);

    // Baut die Warteschlange fuer ein Thema frisch auf: alle Karten, die laut
    // abgehakteKartenIds noch NICHT abgehakt sind.
    function offeneKartenFuer(thema) {
        const abgehaktIds = abgehakteKartenIds[thema.id] || [];
        return thema.karten.filter((karte) => !abgehaktIds.includes(karte.id));
    }

    function themaOeffnen(thema) {
        setAusgewaehltesThema(thema);
        setStapelKarten(offeneKartenFuer(thema));
        setQuizModus(false);
    }

    function themaVerlassen() {
        setAusgewaehltesThema(null);
        setStapelKarten([]);
        setQuizModus(false);
    }

    if (ausgewaehltesThema) {
        const abgehaktFuerThema = abgehakteKartenIds[ausgewaehltesThema.id] || [];
        const quizVerfuegbar = abgehaktFuerThema.length >= KARTEN_PRO_QUIZ;

        function kartenAlsAbgehaktEintragen(karteId) {
            const bisherigeIds = abgehakteKartenIds[ausgewaehltesThema.id] || [];
            setAbgehakteKartenIds({
                ...abgehakteKartenIds,
                [ausgewaehltesThema.id]: [...bisherigeIds, karteId],
            });
        }

        // Wird bei falscher Quiz-Antwort gebraucht: Karte gilt wieder als
        // "nicht abgehakt", taucht beim naechsten Oeffnen des Themas wieder
        // im Stapel auf ("kehrt in den Stapel zurueck").
        function karteAusAbgehaktEntfernen(karteId) {
            const bisherigeIds = abgehakteKartenIds[ausgewaehltesThema.id] || [];
            setAbgehakteKartenIds({
                ...abgehakteKartenIds,
                [ausgewaehltesThema.id]: bisherigeIds.filter((id) => id !== karteId),
            });
        }

        function quizStarten() {
            const kartenFuerQuiz = gemischt(abgehaktFuerThema)
                .slice(0, KARTEN_PRO_QUIZ)
                .map((id) => ausgewaehltesThema.karten.find((karte) => karte.id === id));
            setQuizFragen(kartenFuerQuiz);
            setQuizIndex(0);
            setGewaehlteAntwort(null);
            setQuizRichtigCount(0);
            setQuizModus(true);
        }

        if (quizModus) {
            const aktuelleQuizKarte = quizFragen[quizIndex];
            const quizFertig = quizIndex >= quizFragen.length;

            function antwortKlick(index) {
                if (gewaehlteAntwort !== null) return; // schon beantwortet
                setGewaehlteAntwort(index);
                if (index === aktuelleQuizKarte.quizFrage.korrekteIndex) {
                    setQuizRichtigCount(quizRichtigCount + 1);
                } else {
                    karteAusAbgehaktEntfernen(aktuelleQuizKarte.id);
                }
            }

            function naechsteQuizFrage() {
                setQuizIndex(quizIndex + 1);
                setGewaehlteAntwort(null);
            }

            function optionFarbe(index) {
                if (gewaehlteAntwort === null) return {};
                if (index === aktuelleQuizKarte.quizFrage.korrekteIndex) return { borderColor: "#22c55e", color: "#22c55e" };
                if (index === gewaehlteAntwort) return { borderColor: "#f97316", color: "#f97316" };
                return {};
            }

            return (
                <div>
                    <Navbar />
                    <h1>{ausgewaehltesThema.titel} — Quiz</h1>
                    <div className="quiz-karte">
                        {quizFertig ? (
                            <>
                                <h2>{quizRichtigCount} von {quizFragen.length} richtig</h2>
                                <p>Falsch beantwortete Karten sind zurück im Stapel.</p>
                                <button onClick={() => themaOeffnen(ausgewaehltesThema)}>Zurück zu den Karten</button>
                            </>
                        ) : (
                            <>
                                <p>Frage {quizIndex + 1} von {quizFragen.length}</p>
                                <h2>{aktuelleQuizKarte.quizFrage.frageText}</h2>
                                <ul className="quiz-antworten">
                                    {aktuelleQuizKarte.quizFrage.antworten.map((antwort, index) => (
                                        <li key={index}>
                                            <button style={optionFarbe(index)} onClick={() => antwortKlick(index)}>
                                                {antwort}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                {gewaehlteAntwort !== null && (
                                    <button onClick={() => naechsteQuizFrage()}>Nächste Frage</button>
                                )}
                            </>
                        )}
                    </div>
                    <button onClick={() => themaVerlassen()}>zurück zu den Themen</button>
                </div>
            );
        }

        const aktuelleKarte = stapelKarten[0];
        // gleiche Deckelung wie im Dashboard: nie mehr als 3 Geisterkarten,
        // sonst sieht der Stapel bei vielen Karten absurd aus
        const anzahlGeisterkarten = Math.min(stapelKarten.length - 1, 3);

        function kannIch() {
            kartenAlsAbgehaktEintragen(aktuelleKarte.id);
            setStapelKarten(stapelKarten.filter((karte) => karte.id !== aktuelleKarte.id));
        }

        function kannIchNicht() {
            const restKarten = stapelKarten.filter((karte) => karte.id !== aktuelleKarte.id);
            setStapelKarten(restKarten.concat([aktuelleKarte]));
        }

        return (
            <div>
                <Navbar />
                <h1>{ausgewaehltesThema.titel}</h1>
                <p>{abgehaktFuerThema.length} von {ausgewaehltesThema.karten.length} abgehakt</p>

                {aktuelleKarte ? (
                    <div className="kartenstapel">
                        {Array.from({ length: anzahlGeisterkarten }).map((_, i) => (
                            <div
                                key={i}
                                className="geisterkarte"
                                style={{ transform: `translate(${(i + 1) * 8}px, ${(i + 1) * 8}px)`, zIndex: -(i + 1) }}
                            ></div>
                        ))}
                        <div className="tageskarte">
                            <span className="tageskarte-thema">noch {stapelKarten.length} im Stapel</span>
                            <h2 style={{ textTransform: "none", letterSpacing: "normal" }}>{aktuelleKarte.frage}</h2>
                            <p className="tageskarte-antwort">{aktuelleKarte.antwort}</p>
                            <div className="tageskarte-buttons">
                                <button onClick={() => kannIch()}>Kann ich</button>
                                <button onClick={() => kannIchNicht()}>Kann ich noch nicht</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Stapel für heute durch!</p>
                )}

                {quizVerfuegbar && (
                    <button onClick={() => quizStarten()}>
                        Quiz starten ({abgehaktFuerThema.length} Karten bereit)
                    </button>
                )}

                <button onClick={() => themaVerlassen()}>zurück zu den Themen</button>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <h1>Daily Learning</h1>
            <ul className="themen-liste">
                {dailyLearningThemenMock.map((thema) => {
                    const abgehaktAnzahl = (abgehakteKartenIds[thema.id] || []).length;
                    return (
                        <li key={thema.id}>
                            <button className="themen-karte" onClick={() => themaOeffnen(thema)}>
                                <span>{thema.titel}</span>
                                <span className="themen-karte-fortschritt">
                                    {abgehaktAnzahl} / {thema.karten.length} abgehakt
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default DailyLearningPage;
