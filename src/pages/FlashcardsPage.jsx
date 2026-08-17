import { useState } from "react";
import Navbar from "../components/Navbar";

function FlashcardsPage(){
    const [karten, setKarten] = useState([
        { id: 1, frage: "Was ist Normalisierung?" },
        { id: 2, frage: "Was ist ein Sprint Backlog?" },
        { id: 3, frage: "Was bedeutet HTTP 404?" },
    ])

    function kartenWeg(id){
        setKarten(karten.filter((karte)=> karte.id !== id));
    }

    return (
        <div>
            <Navbar/>
            <h1>Karteikarten</h1>
            <ul>
                {karten.map((karte)=>(
                    <li key={karte.id}>{karte.frage}
                    <button onClick={()=> kartenWeg(karte.id)}>Weiss ich</button>
                    </li>
                ))}
                
            </ul>
        </div>
    )
}
export default FlashcardsPage;