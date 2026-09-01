import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
    holeThemenFortschritt,
    holeKartenFuerThema,
    karteAbhaken,
    starteQuiz,
    quizAntwortEinreichen,
} from "../api";

const KARTEN_PRO_QUIZ = 20;

function DailyLearningPage() {
    const [themen, setThemen] = useState([]);
    const [ladeFehler, setLadeFehler] = useState("");

    const [ausgewaehltesThema, setAusgewaehltesThema] = useState(null);
    // Vollstaendige Kartenliste des gewaehlten Themas (mit checked vom Server) -
    // getrennt von stapelKarten, weil wir daraus den Abhak-Fortschritt zaehlen,
    // auch waehrend stapelKarten sich beim Durchklicken veraendert.
    const [alleKarten, setAlleKarten] = useState([]);
    // Warteschlange der noch offenen (nicht abgehakten) Karten - gleiches
    // Muster wie tagesKarten im Dashboard: karte = stapelKarten[0], "Kann ich"
    // entfernt sie per .filter(), "Kann ich noch nicht" haengt sie per
    // .filter()+.concat() wieder hinten an.
    const [stapelKarten, setStapelKarten] = useState([]);

    const [quizModus, setQuizModus] = useState(false);
    const [quizFragen, setQuizFragen] = useState([]);
    const [quizIndex, setQuizIndex] = useState(0);
    const [ausgewaehlteOptionId, setAusgewaehlteOptionId] = useState(null);
    const [korrekteOptionId, setKorrekteOptionId] = useState(null);
    const [warRichtig, setWarRichtig] = useState(null);
    const [quizRichtigCount, setQuizRichtigCount] = useState(0);

    // Eigene Funktion statt Code direkt im useEffect, damit themaVerlassen()
    // sie zusaetzlich aufrufen kann - sonst zeigt die Themenliste nach einem
    // Quiz weiterhin den alten Prozentwert, bis die Seite komplett neu
    // geladen wird (gleiches Prinzip wie ladeTagesKarten() in App.jsx).
    function ladeThemen() {
        holeThemenFortschritt()
            .then((daten) => setThemen(daten))
            .catch((error) => setLadeFehler(error.message));
    }

    useEffect(() => {
        ladeThemen();
    }, []);

    function themaOeffnen(thema) {
        setAusgewaehltesThema(thema);
        setQuizModus(false);
        setLadeFehler("");
        holeKartenFuerThema(thema.id)
            .then((karten) => {
                setAlleKarten(karten);
                setStapelKarten(karten.filter((karte) => !karte.checked));
            })
            .catch((error) => setLadeFehler(error.message));
    }

    function themaVerlassen() {
        setAusgewaehltesThema(null);
        setAlleKarten([]);
        setStapelKarten([]);
        setQuizModus(false);
        ladeThemen();
    }

    if (ausgewaehltesThema) {
        const abgehaktAnzahl = alleKarten.filter((karte) => karte.checked).length;
        // Deckt nur den client-seitig sichtbaren Fall ab (>= 20 abgehakt).
        // Der Server prueft zusaetzlich, ob genug abgehakte Karten auch eine
        // Multiple-Choice-Frage haben - schlaegt das fehl, zeigen wir die
        // Serverfehlermeldung (siehe quizStarten) statt hier zu raten.
        const quizVerfuegbar = abgehaktAnzahl >= KARTEN_PRO_QUIZ;

        function kannIch() {
            const karte = stapelKarten[0];
            karteAbhaken(karte.id)
                .then(() => {
                    setAlleKarten(alleKarten.map((k) => (k.id === karte.id ? { ...k, checked: true } : k)));
                    setStapelKarten(stapelKarten.filter((k) => k.id !== karte.id));
                })
                .catch((error) => setLadeFehler(error.message));
        }

        function kannIchNicht() {
            const karte = stapelKarten[0];
            const restKarten = stapelKarten.filter((k) => k.id !== karte.id);
            setStapelKarten(restKarten.concat([karte]));
        }

        function quizStarten() {
            starteQuiz(ausgewaehltesThema.id)
                .then((fragen) => {
                    setQuizFragen(fragen);
                    setQuizIndex(0);
                    setAusgewaehlteOptionId(null);
                    setKorrekteOptionId(null);
                    setWarRichtig(null);
                    setQuizRichtigCount(0);
                    setQuizModus(true);
                })
                .catch((error) => setLadeFehler(error.message));
        }

        function zurueckZuKarten() {
            setQuizModus(false);
            themaOeffnen(ausgewaehltesThema); // frisch laden - Server kennt neuen checked-Stand
        }

        if (quizModus) {
            const aktuelleQuizKarte = quizFragen[quizIndex];
            const quizFertig = quizIndex >= quizFragen.length;

            async function antwortKlick(optionId) {
                if (ausgewaehlteOptionId !== null) return; // schon beantwortet
                try {
                    const daten = await quizAntwortEinreichen(optionId);
                    setAusgewaehlteOptionId(optionId);
                    setWarRichtig(daten.correct);
                    if (daten.correct) {
                        setQuizRichtigCount(quizRichtigCount + 1);
                    } else {
                        setKorrekteOptionId(daten.correct_option.id);
                    }
                } catch (fehler) {
                    setLadeFehler(fehler.message);
                }
            }

            function naechsteQuizFrage() {
                setQuizIndex(quizIndex + 1);
                setAusgewaehlteOptionId(null);
                setKorrekteOptionId(null);
                setWarRichtig(null);
            }

            function optionFarbe(optionId) {
                if (optionId === korrekteOptionId) return { border: "3px solid #39ff14" };
                if (optionId === ausgewaehlteOptionId) return { border: warRichtig ? "3px solid #39ff14" : "3px solid red" };
                return {};
            }

            return (
                <div>
                    <Navbar />
                    <h1>{ausgewaehltesThema.name} — Quiz</h1>
                    <div className="quiz-karte">
                        {quizFertig ? (
                            <>
                                <h2>{quizRichtigCount} von {quizFragen.length} richtig</h2>
                                <p>Falsch beantwortete Karten sind zurück im Stapel.</p>
                                <button onClick={() => zurueckZuKarten()}>Zurück zu den Karten</button>
                            </>
                        ) : (
                            <>
                                <p>Frage {quizIndex + 1} von {quizFragen.length}</p>
                                <h2>{aktuelleQuizKarte.multiple_choice_question.question_text}</h2>
                                <ul className="quiz-antworten">
                                    {aktuelleQuizKarte.multiple_choice_question.answer_options.map((option) => (
                                        <li key={option.id}>
                                            <button style={optionFarbe(option.id)} onClick={() => antwortKlick(option.id)}>
                                                {option.text}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                {ausgewaehlteOptionId !== null && (
                                    <button onClick={() => naechsteQuizFrage()}>Nächste Frage</button>
                                )}
                            </>
                        )}
                    </div>
                    {ladeFehler && <p>{ladeFehler}</p>}
                    <button onClick={() => themaVerlassen()}>zurück zu den Themen</button>
                </div>
            );
        }

        const aktuelleKarte = stapelKarten[0];
        // gleiche Deckelung wie im Dashboard: nie mehr als 3 Geisterkarten,
        // sonst sieht der Stapel bei vielen Karten absurd aus
        const anzahlGeisterkarten = Math.min(stapelKarten.length - 1, 3);

        return (
            <div>
                <Navbar />
                <h1>{ausgewaehltesThema.name}</h1>
                <p>{abgehaktAnzahl} von {alleKarten.length} abgehakt</p>
                {ladeFehler && <p>{ladeFehler}</p>}

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
                            <h2 style={{ textTransform: "none", letterSpacing: "normal" }}>{aktuelleKarte.question}</h2>
                            <p className="tageskarte-antwort">{aktuelleKarte.answer}</p>
                            <div className="tageskarte-buttons">
                                <button onClick={() => kannIch()}>Kann ich</button>
                                <button onClick={() => kannIchNicht()}>Kann ich noch nicht</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>{alleKarten.length === 0 ? "Lädt..." : "Stapel für heute durch!"}</p>
                )}

                {quizVerfuegbar && (
                    <button onClick={() => quizStarten()}>
                        Quiz starten ({abgehaktAnzahl} Karten bereit)
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
            {ladeFehler && <p>{ladeFehler}</p>}
            {themen.length === 0 && !ladeFehler && <p>Lädt Themen...</p>}
            <ul className="themen-liste">
                {themen.map((thema) => (
                    <li key={thema.id}>
                        <button className="themen-karte" onClick={() => themaOeffnen(thema)}>
                            <span>{thema.name}</span>
                            <span className="themen-karte-fortschritt">
                                {thema.progress_percent}% gelernt
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DailyLearningPage;
