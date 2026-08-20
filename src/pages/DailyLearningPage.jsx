import { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom"; 

function DailyLearningPage({ gespeicherteKarten, setGespeicherteKarten}){

    const ueberbegriff = "IT-Security";
    const[karten, setKarten] = useState([
        { id: 1, titel: "Verschlüsselung", info: "Verschlüsselung macht Daten unlesbar für alle, die den passenden Schlüssel nicht haben." },
        { id: 2, titel: "Firewall", info: "Eine Firewall kontrolliert, welcher Netzwerk-Verkehr rein und raus darf, nach festgelegten Regeln." },
        { id: 3, titel: "Phishing", info: "Betrugsversuch per gefälschter Nachricht/Website, um an Passwörter oder Daten zu kommen." },
    ])

    const [offeneKarteId, setOffeneKarteId] = useState(null);

    function themaKlick(id){
        setOffeneKarteId(id)
    }

    function kartenEntfernen(id){
        setKarten(karten.filter((karte)=> karte.id !== id))
    }

    function istGespeichert(id){
        const treffer = gespeicherteKarten.filter((karte) => karte.id === id && karte.thema === ueberbegriff);
        return treffer.length > 0;
    }

    function inKarteikartenSpeichern(punkt){
        if(istGespeichert(punkt.id)){
            return;
        }
        const neueKarte = {...punkt,  thema: ueberbegriff };
        setGespeicherteKarten(gespeicherteKarten.concat([neueKarte]));
    }

    return(
        <div>
            <Navbar/>
            <h1>Daily Learning</h1>
            <h2>{ueberbegriff}</h2>
            <ul>
                {karten.map((karte)=>{
                    let info = null;
                    if(karte.id === offeneKarteId){
                        info = <p>{karte.info}</p>
                    }
                
                return (
                    <li key = {karte.id}>
                        <button onClick = {()=> themaKlick(karte.id)}>{karte.titel}</button>
                        {info}
                        <button onClick={()=>kartenEntfernen(karte.id)}>Ist mir klar, entfernen</button>
                        <button onClick={()=> inKarteikartenSpeichern(karte)} disabled={istGespeichert(karte.id)}>
                            {istGespeichert(karte.id) ? " Gespeichert" : "In Karteikarten speichern"}
                        </button>
                    </li>
                );
                    
                })}
            </ul>
            {karten.length === 0 && (
                <div>
                    <p>Alle Punkte abgearbeitet</p>
                    <Link to="/quiz">Quiz Starten</Link> 
                </div>
            )}
        </div>
        
    )


}
export default DailyLearningPage;