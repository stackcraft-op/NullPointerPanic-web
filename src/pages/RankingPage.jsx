import Leaderboard from "../components/Leaderboard";
import Navbar from "../components/Navbar";
import SpielerProfilPopup from "../components/SpielerProfilPopup";
import { useState, useEffect } from "react";
import { holeRankingGesamt, holeRankingWoche, holeRankingNachBundesland, holeSpielerProfil } from "../api";

// Gleiche 16 Bundeslaender wie in RegisterPage.jsx/ProfilBearbeitenPage.jsx -
// muessen exakt so geschrieben sein, weil das Backend sie 1:1 als
// state-Query-Parameter erwartet (siehe API_CONTRACT.md, GET /api/rankings/by_state).
const bundeslaender = [
    "Baden-Württemberg", "Bayern", "Berlin", "Brandenburg", "Bremen",
    "Hamburg", "Hessen", "Mecklenburg-Vorpommern", "Niedersachsen",
    "Nordrhein-Westfalen", "Rheinland-Pfalz", "Saarland", "Sachsen",
    "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen",
];

function RankingPage(){
    const [woche, setWoche] = useState({ top: [], me: null });
    const [gesamt, setGesamt] = useState({ top: [], me: null });
    // Leerer String = "Alle" (ungefiltertes Gesamt-Ranking). Nur die
    // Gesamt-Ansicht ist filterbar - fuer Woechentlich gibt's keinen
    // state-gefilterten Endpoint im Backend.
    const [bundesland, setBundesland] = useState("");
    const [gesamtFehler, setGesamtFehler] = useState("");

    // Profil-Popup: null = geschlossen. spielerFehler eigenstaendig statt in
    // gesamtFehler/woche-Fehler mit reingemischt, weil das ein unabhaengiger
    // Ladevorgang ist (Klick auf einen Namen, nicht das Ranking selbst).
    const [ausgewaehlterSpieler, setAusgewaehlterSpieler] = useState(null);
    const [spielerFehler, setSpielerFehler] = useState("");

    function spielerAnklicken(person) {
        holeSpielerProfil(person.id)
            .then((daten) => {
                setAusgewaehlterSpieler(daten);
                setSpielerFehler("");
            })
            .catch((error) => setSpielerFehler(error.message));
    }

    useEffect(()=>{
        holeRankingWoche()
            .then((daten)=> setWoche(daten))
            .catch((error)=> console.error("Wochen-Ranking laden fehlgeschlagen:", error));
    }, []);

    useEffect(()=>{
        const anfrage = bundesland
            ? holeRankingNachBundesland(bundesland)
            : holeRankingGesamt();

        anfrage
            .then((daten)=> {
                setGesamt(daten);
                setGesamtFehler("");
            })
            .catch((error)=> setGesamtFehler(error.message));
    }, [bundesland]);

    return(
        <div>
            <Navbar></Navbar>
            <h1>Ranking</h1>
            <h2>Wöchentlich</h2>
            <Leaderboard spieler={woche.top} onSpielerKlick={spielerAnklicken}/>
            {woche.me && woche.me.rank > woche.top.length && (
                <p>Dein Rang: #{woche.me.rank} ({woche.me.score})</p>
            )}

            <h2>Gesamt</h2>
            <select
                value={bundesland}
                onChange={(event) => setBundesland(event.target.value)}>
                <option value="">Alle Bundesländer</option>
                {bundeslaender.map((land) => (
                    <option key={land} value={land}>{land}</option>
                ))}
            </select>
            {gesamtFehler && <p className="auth-fehler">{gesamtFehler}</p>}
            <Leaderboard spieler={gesamt.top} onSpielerKlick={spielerAnklicken}/>
            {gesamt.me && gesamt.me.rank > gesamt.top.length && (
                <p>Dein Rang: #{gesamt.me.rank} ({gesamt.me.score})</p>
            )}
            {bundesland && !gesamt.me && gesamt.top.length > 0 && (
                <p>Du kommst nicht aus {bundesland}, deshalb kein eigener Rang hier.</p>
            )}

            {spielerFehler && <p className="auth-fehler">{spielerFehler}</p>}
            {ausgewaehlterSpieler && (
                <SpielerProfilPopup
                    spieler={ausgewaehlterSpieler}
                    onSchliessen={() => setAusgewaehlterSpieler(null)}
                />
            )}
        </div>
    )
}
export default RankingPage;
