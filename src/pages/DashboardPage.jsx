import XPBar from "../components/XPBar";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Leaderboard from "../components/Leaderboard";
import { holeTagesKarten } from "../api";

function DashboardPage({tagesKarten, setTagesKarten}){
    


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



    const weeklySpieler = [
        { id: 1, name: "Ben", xp: 90 },
        { id: 2, name: "Aylin", xp: 75 },
        { id: 3, name: "Chris", xp: 40 },
    ];

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
                ) : (
                <p>Keine Karten mehr für heute </p>
                )}

            
            <h2>Weakly Ranking</h2>
            <Leaderboard spieler={weeklySpieler}/>
        </div>
    )
}

export default DashboardPage;