import { useState } from "react";
import Navbar from "../components/Navbar";

function FlashcardsPage({gespeicherteKarten, setGespeicherteKarten}){
    const [ausgewaeltesThema,setAusgewaeltesThema] = useState(null);
    const [ausgewaehlteKarteId, setAusgewaehlteKarteId] = useState(null);
    const [antwortSichtbar, setAntwortSichtbar] = useState(false);
    const themen = [];

    gespeicherteKarten.forEach((karte)=>{
        if(!themen.includes(karte.thema)){
            themen.push(karte.thema);
        }
    })

    function karteOeffnen(id){
        setAusgewaehlteKarteId(id);
        setAntwortSichtbar(false);
    }

    function karteSchliessen(){
        setAusgewaehlteKarteId(null);
        setAntwortSichtbar(false);
    }

    function karteLoeschen(id){
        setGespeicherteKarten(gespeicherteKarten.filter((karte) => karte.id !== id));
        setAusgewaehlteKarteId(null);
        setAntwortSichtbar(false);
    }

    if(ausgewaehlteKarteId){
        const treffer = gespeicherteKarten.filter((karte) => karte.id === ausgewaehlteKarteId);
        const aktuelleKarte = treffer[0];

        return(
            <div>
                <Navbar/>
                <button onClick={()=> karteSchliessen()}>zurück</button>
                <h1>{aktuelleKarte.titel}</h1>
                {antwortSichtbar && <p>{aktuelleKarte.info}</p>}
                <button onClick={()=> setAntwortSichtbar(true)}>Antwort anzeigen</button>
                <button onClick={()=> karteLoeschen(aktuelleKarte.id)}>Weiß ich</button>
                <button onClick={()=> karteLoeschen(aktuelleKarte.id)}>Karte löschen</button>
            </div>
        )
    }

    if(ausgewaeltesThema){
        const karten = gespeicherteKarten.filter((karte) => karte.thema === ausgewaeltesThema);

        return(
            <div>
                <Navbar/>
                <button onClick={()=> setAusgewaeltesThema(null)}>zurück</button>
                <h1>{ausgewaeltesThema}</h1>
                <ul>
                    {karten.map((karte)=>(
                        <li key={karte.id}>
                            <button onClick={()=> karteOeffnen(karte.id)}>{karte.titel}</button>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    return(
        <div>
            <Navbar/>
            <h1>Karteikarten</h1>
            {themen.length === 0 && <p>Noch keine Karten gespeichert</p>}
            <ul>
                {themen.map((thema)=>(
                    <li key={thema}>
                        <button onClick={()=>setAusgewaeltesThema(thema)}>{thema}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default FlashcardsPage;
