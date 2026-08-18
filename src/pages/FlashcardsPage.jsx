import { useState } from "react";
import Navbar from "../components/Navbar";

function FlashcardsPage(){
    const [karten, setKarten] = useState([
        { id: 1, frage: "Was ist Normalisierung?", antwort: "Datenbank-Tabellen so aufräumen, dass Daten nicht doppelt gespeichert werden." },
        { id: 2, frage: "Was ist ein Sprint Backlog?", antwort: "Die Liste der Aufgaben, die ein Team sich für einen Sprint vorgenommen hat." },
        { id: 3, frage: "Was bedeutet HTTP 404?", antwort: "Die angefragte Ressource wurde nicht gefunden." },
    ])

    const [aufgedeckt, setAufgedeckt] = useState(false);

    const karte = karten[0];
    if(!karte){
        return(
            <div>
                <Navbar/>
                <h1>Gut gemacht</h1>
            </div>
        )
    }

    function weissIch(){
        const restKarten = karten.filter((k)=>k.id !== karte.id);
        setKarten(restKarten);
        setAufgedeckt(false);
    }
    function weissIchNicht(){
        const restKarten = karten.filter((k)=>k.id !== karte.id);
        setKarten(restKarten.concat([karte]));
        setAufgedeckt(false);
    }

    let aktionsBereich;
    if(!aufgedeckt){
        aktionsBereich = <button onClick={()=> setAufgedeckt(true)}>Antwort anzeigen</button>
    }else {
        aktionsBereich = (
            <div>
                <p>{karte.antwort}</p>
                <button onClick = {()=> weissIch()}>Weiß ich</button>
                <button onClick = {()=> weissIchNicht()}>Weiß ich noch nicht</button>
            </div>
        );
    }

    return(
        <div>
            <Navbar/>
            <h1>Karteikarten</h1>
            <p>Noch {karten.length} Karte(n) übrig</p>
            <h2>{karte.frage}</h2>
            {aktionsBereich}
        </div>
    )
}
export default FlashcardsPage;