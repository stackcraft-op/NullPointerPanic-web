import Navbar from "../components/Navbar";
import { wikiThemenMock } from "../mockData";
import { useState,useEffect } from "react";
import { holeAlleKarteikarten } from "../api";

function WikiPage (){
    const [seitenIndex,setSeitenIndex] = useState(0);

    const [alleKarten, setAlleKarten] = useState([]);

    useEffect(()=>{
        holeAlleKarteikarten()
        .then((karten)=> setAlleKarten(karten))
        .catch((error)=> console.error("Karteikarten laden fehlgeschlagen:", error))
    }, []);

    
    const[suchbegriff,setSuchbegriff] = useState("");
    // Frueher gab's nur EINE zielKarteId (die erste Treffer-Karte in einem
    // Thema, alle weiteren Treffer im selben Thema wurden ignoriert). Jetzt
    // stattdessen ALLE Treffer-IDs des angeklickten Themas + ein Index, auf
    // welchem Treffer man gerade "steht" - so lassen sich mehrere Treffer im
    // selben Thema nacheinander anspringen statt beim ersten stehen zu
    // bleiben.
    const [zielKarteIds, setZielKarteIds] = useState([]);
    const [zielIndex, setZielIndex] = useState(0);
    const zielKarteId = zielKarteIds[zielIndex] ?? null;
    const gefilterteThemen = wikiThemenMock.filter((thema)=>{
        const titelPasst = thema.titel.toLowerCase().includes(suchbegriff.toLowerCase());
        const kartePasst = alleKarten.some((karte)=>
            karte.topic.name === thema.titel &&
            (karte.question.toLowerCase().includes(suchbegriff.toLowerCase()) ||
             karte.answer.toLowerCase().includes(suchbegriff.toLowerCase()))
        );
        return titelPasst || kartePasst;
    });

    function zuSeiteSpringen(thema){
        const index = wikiThemenMock.findIndex((t)=> t.id === thema.id)
        setSeitenIndex(index +1)

        // .filter() statt .find() - ALLE passenden Karten in diesem Thema,
        // nicht nur die erste.
        const treffer = alleKarten.filter((karte)=>
            karte.topic.name === thema.titel &&
            (karte.question.toLowerCase().includes(suchbegriff.toLowerCase()) ||
             karte.answer.toLowerCase().includes(suchbegriff.toLowerCase()))
        );
        setZielKarteIds(treffer.map((karte)=> karte.id));
        setZielIndex(0);

        setSuchbegriff("");
    }

    // Zwischen mehreren Treffern im selben Thema vor/zurueck springen -
    // Math.max/min klemmt an den Raendern, statt ueber die Liste hinaus zu
    // zaehlen (Buttons sind zusaetzlich per disabled abgesichert, siehe unten).
    function vorherigerTreffer(){
        setZielIndex((i)=> Math.max(0, i - 1));
    }
    function naechsterTreffer(){
        setZielIndex((i)=> Math.min(zielKarteIds.length - 1, i + 1));
    }

    useEffect(()=>{
        if(zielKarteId === null) return;
        const element = document.getElementById(`karte-${zielKarteId}`);
        if(element){
            element.scrollIntoView({behavior:"smooth", block:"center"});
        }
    }, [seitenIndex, zielKarteId]);
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
    const themaKarten = alleKarten.filter((karte)=> karte.topic.name === aktuellesThema.titel);
    seitenInhalt = (
        <>
            <h2>{aktuellesThema.titel}</h2>
            {/* Sprungmarke: zeigt an, dass es in diesem Thema mehrere
                Treffer gibt, und erlaubt, nacheinander dorthin zu springen -
                vorher blieb man beim ersten Treffer haengen, weitere Treffer
                im selben Thema waren unauffindbar. */}
            {zielKarteIds.length > 1 && (
                <div className="wiki-treffer-navigation">
                    <span>Treffer {zielIndex + 1} von {zielKarteIds.length}</span>
                    <button onClick={()=> vorherigerTreffer()} disabled={zielIndex === 0}>◀ vorheriger</button>
                    <button onClick={()=> naechsterTreffer()} disabled={zielIndex === zielKarteIds.length - 1}>nächster ▶</button>
                </div>
            )}
            {themaKarten.length === 0 && <p>Noch kein Inhalt geladen.</p>}
            <ul>
                {themaKarten.map((karte)=>(
                    <li
                        key={karte.id}
                        id={`karte-${karte.id}`}
                        className={
                            karte.id === zielKarteId ? "wiki-treffer" :
                            zielKarteIds.includes(karte.id) ? "wiki-treffer-weitere" :
                            undefined
                        }
                    >
                        <strong>{karte.question}</strong>
                        <p>{karte.answer}</p>
                    </li>
                ))}
            </ul>
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