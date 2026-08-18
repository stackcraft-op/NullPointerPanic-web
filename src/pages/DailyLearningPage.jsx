import { useState } from "react";
import Navbar from "../components/Navbar";

function DailyLearningPage(){
    const[karten, setKarten] = useState([
        { id: 1, thema: "Verschlüsselung", info: "Verschlüsselung macht Daten unlesbar für alle, die den passenden Schlüssel nicht haben." },
        { id: 2, thema: "Normalisierung", info: "Normalisierung räumt Datenbank-Tabellen so auf, dass Daten nicht doppelt gespeichert werden." },
        { id: 3, thema: "HTTP-Statuscodes", info: "Zahlen wie 200, 404 oder 500, die dem Browser sagen, wie eine Anfrage ausgegangen ist." },
        { id: 4, thema: "Scrum Sprint", info: "Ein fester, kurzer Zeitabschnitt (z.B. 2 Wochen), in dem ein Team an einem Ziel arbeitet." },
        { id: 5, thema: "Primärschlüssel", info: "Ein Feld in einer Datenbank-Tabelle, das jeden Eintrag eindeutig identifiziert." },
    ])
    const [offeneKarteId, setOffeneKarteId] = useState(null);

    function themaKlick(id){
        setOffeneKarteId(id)
    }

    function kartenEntfernen(id){
        setKarten(karten.filter((karte)=> karte.id !== id))
    }

    return(
        <div>
            <Navbar/>
            <h1>Daily Learning</h1>
            <ul>
                {karten.map((karte)=>{
                    let info = null;
                    if(karte.id === offeneKarteId){
                        info = <p>{karte.info}</p>
                    }
                
                return (
                    <li key = {karte.id}>
                        <button onClick = {()=> themaKlick(karte.id)}>{karte.thema}</button>
                        {info}
                        <button onClick={()=>kartenEntfernen(karte.id)}>Ist mir klar, entfernen</button>
                    </li>
                );
                    
                })}
            </ul>
        </div>
        
    )


}
export default DailyLearningPage;