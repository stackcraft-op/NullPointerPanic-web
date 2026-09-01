import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Leaderboard from "../components/Leaderboard";
import { holeRankingWoche } from "../api";

function DashboardPage({tagesKarten, setTagesKarten, quizFreigeschaltet, tagesKartenGeladen}){

    const [wochenRanking, setWochenRanking] = useState({ top: [], me: null });
    useEffect(()=>{
        holeRankingWoche()
            .then((daten)=> setWochenRanking(daten))
            .catch((error)=> console.error("Wochen-Ranking laden fehlgeschlagen:", error));
    }, []);

    const aktuelleKarte = tagesKarten[0];
    // wie viele "Geisterkarten" hinter der echten Karte sichtbar sind - richtet sich nach
    // den übrigen Karten, aber gedeckelt bei 3, sonst würde der Stapel bei z.B. 20 Karten
    // absurd aussehen (19 schräge Kanten übereinander)
    const anzahlGeisterkarten = Math.min(tagesKarten.length - 1, 3);
    function kannIch(){
        setTagesKarten(tagesKarten.filter((karte)=> karte.id !== aktuelleKarte.id))
    }
    function kannIchNicht(){
        const restKarten = tagesKarten.filter((karte)=> karte.id !== aktuelleKarte.id)
        setTagesKarten(restKarten.concat([aktuelleKarte]))
    }



    return(
        <div>
            <Navbar></Navbar>
            <h1>Dashboard</h1>
            <h2>Heutige Karten</h2>
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
                        <span className="tageskarte-thema">{aktuelleKarte.topic.name}</span>
                        <p className="tageskarte-antwort">{aktuelleKarte.answer}</p>
                        <div className="tageskarte-buttons">
                            <button onClick={() => kannIch()}>Kann ich</button>
                            <button onClick={() => kannIchNicht()}>Kann ich noch nicht</button>
                        </div>
                    </div>
                </div>
                ) : tagesKartenGeladen ? (
                <div>
                    <p>Keine Karten mehr für heute </p>
                    {quizFreigeschaltet && <Link to="/quiz">Zum Quiz</Link>}
                </div>
                ) : (
                <p>Lädt...</p>
                )}

            
            <h2>Wöchentlich</h2>
            <Leaderboard spieler={wochenRanking.top}/>
        </div>
    )
}

export default DashboardPage;