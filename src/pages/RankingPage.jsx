import Leaderboard from "../components/Leaderboard";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { holeRankingGesamt, holeRankingWoche } from "../api";

function RankingPage(){
    const [woche, setWoche] = useState({ top: [], me: null });
    const [gesamt, setGesamt] = useState({ top: [], me: null });

    useEffect(()=>{
        holeRankingWoche()
            .then((daten)=> setWoche(daten))
            .catch((error)=> console.error("Wochen-Ranking laden fehlgeschlagen:", error));
        holeRankingGesamt()
            .then((daten)=> setGesamt(daten))
            .catch((error)=> console.error("Gesamt-Ranking laden fehlgeschlagen:", error));
    }, []);

    return(
        <div>
            <Navbar></Navbar>
            <h1>Ranking</h1>
            <h2>Wöchentlich</h2>
            <Leaderboard spieler={woche.top}/>
            {woche.me && woche.me.rank > woche.top.length && (
                <p>Dein Rang: #{woche.me.rank} ({woche.me.score})</p>
            )}
            <h2>Gesamt</h2>
            <Leaderboard spieler={gesamt.top}/>
            {gesamt.me && gesamt.me.rank > gesamt.top.length && (
                <p>Dein Rang: #{gesamt.me.rank} ({gesamt.me.score})</p>
            )}
        </div>
    )
}
export default RankingPage;
