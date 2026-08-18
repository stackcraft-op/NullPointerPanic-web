import Navbar from "../components/Navbar";
import { useState } from "react";

function QuizPage(){
    const [fragen, setFragen] = useState([
        {
            id:1,
            frage:"Was ist eine Primärschlüssel-Eigenschaft?",
            antworten:["Muss eindeutig sein", "Darf mehrfach vorkommen", "Ist immer ein Text"],
            richtig:"Muss eindeutig sein",
        },
        {
            id:2,
            frage:"Was macht HTTP-Status 404?",
            antworten: ["Ressource nicht gefunden", "Server-Fehler", "Erfolgreich"],
            richtig:"Ressource nicht gefunden",
        },
        {
            id:3,
            frage:"Was ist ein Sprint?",
            antworten: ["Ein fester Zeitabschnitt in Scrum", "Ein Datenbanktyp", "Ein CSS-Framework"],
            richtig:"Ein fester Zeitabschnitt in Scrum"
        }
    ])
    const[aktuelleFrage,setAktuelleFrage] = useState(0);
    const[feedback, setFeedback] = useState("");

    const frage = fragen[aktuelleFrage];

    function antwortKlick(antwort){
        antwort === frage.richtig? setFeedback("Richtig!!!"):setFeedback("Falsch,richtig wäre " + frage.richtig);
    }
    function naechsteFrage(){
        setAktuelleFrage(aktuelleFrage+1);
        setFeedback("");
    }

    if(!frage){
        return (
            <div>
                <Navbar></Navbar>
                <h1>Quiz</h1>
                <p>Du hast alle Fragen beantwortet</p>
            </div>
        )
    }

    return(
        <div>
        <Navbar/>
        <h1>Quiz</h1>
        <h2>{frage.frage}</h2>
        <ul>
            {frage.antworten.map((antwort)=>(
                <li key={antwort}>
                    <button onClick={()=> antwortKlick(antwort)}>{antwort}</button>
                </li>
            ))}
        </ul>
        <p>{feedback}</p>
        <button onClick={()=> naechsteFrage()}>Nächste Frage</button>
        </div>
    )
}

export default QuizPage;