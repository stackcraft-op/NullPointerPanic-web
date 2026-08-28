import Navbar from "../components/Navbar";
import { wikiThemenMock } from "../mockData";
import { useState } from "react";

function WikiPage (){
    const [seitenIndex,setSeitenIndex] = useState(0);
    const[suchbegriff,setSuchbegriff] = useState("");
    const gefilterteThemen = wikiThemenMock.filter((thema)=>
        thema.titel.toLowerCase().includes(suchbegriff.toLowerCase()) ||
        thema.inhalt.toLowerCase().includes(suchbegriff.toLowerCase())
    );

    function zuSeiteSpringen(thema){
        const index = wikiThemenMock.findIndex((t)=> t.id === thema.id)
        setSeitenIndex(index +1)
        setSuchbegriff("");
    }
    let sucheErgebnisse = null;
    if(suchbegriff !== "") {
        sucheErgebnisse = (
            <ul className="suche-ergebnisse">
                {gefilterteThemen.map((thema)=>(
                    <li key={thema.id} onClick={() => zuSeiteSpringen(thema)}>
                        {thema.titel}
                    </li>
                ))}
            </ul>
        )
    }

    const gesamtSeiten = wikiThemenMock.length +1;

    function vorherigeSeite(){
        setSeitenIndex(seitenIndex - 1);
    }

    function naechsteSeite(){
        setSeitenIndex(seitenIndex+1);
    }

    let seitenInhalt;
    if(seitenIndex === 0){
        seitenInhalt = (
            <>
            <h2>Inhaltsverzeichnis</h2>
                <ul>
                    {wikiThemenMock.map((thema)=>(
                    <li key={thema.id}>{thema.id}. {thema.titel}</li>
                ))}
                </ul>
            </>
        )
    }else {
        const aktuellesThema = wikiThemenMock[seitenIndex - 1];
        seitenInhalt = (
            <>
                <h2>{aktuellesThema.titel}</h2>
                <p>{aktuellesThema.inhalt || "Noch kein Inhalt hinterlegt."}</p>
            </>
        )
    }

     return(
        <div>
            <Navbar/>
            <h1>Wiki</h1>
            <input
                type = "text"
                placeholder="Thema suchen..."
                value={suchbegriff}
                onChange={(e)=> setSuchbegriff(e.target.value)}/>
                {sucheErgebnisse}
            <div className="buch-seite" key={seitenIndex}>
                {seitenInhalt}
            </div>
            <button onClick={()=>vorherigeSeite()} disabled={seitenIndex===0}>Vorherige Seite</button>
            <button onClick={()=>naechsteSeite()} disabled={seitenIndex === gesamtSeiten - 1}>Nächste Seite</button>
        </div>
    )
}

export default WikiPage;