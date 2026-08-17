import { useState } from "react";
import Navbar from "../components/Navbar";

function FlashcardsPage(){
    const [karten, setKarten] = useState([
        { id: 1, frage: "Was ist Normalisierung?" },
        { id: 2, frage: "Was ist ein Sprint Backlog?" },
        { id: 3, frage: "Was bedeutet HTTP 404?" },
    ])

    return (
        <div>
            <Navbar/>
            <h1>Karteikarten</h1>
            <ul>
                {karten.map((karte)=>(
                    <li key={karte.id}>{karte.frage}</li>
                ))}
            </ul>
        </div>
    )
}
export default FlashcardsPage;