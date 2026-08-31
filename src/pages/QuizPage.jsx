import Navbar from "../components/Navbar";
import { useState } from "react";
import { beantworten } from "../api";

function QuizPage({tagesKarten, quizFreigeschaltet, ladeProfil}){

    if(!quizFreigeschaltet){
        return (
            <div>
                <Navbar/>
                <h1>Quiz</h1>
                <p>Schließe erst alle heutigen Karten im Dashboard ab ("Kann ich"), dann wird das Quiz freigeschaltet.</p>
            </div>
        )
    }
    const [aktuelleFrage,setAktuelleFrage] = useState(0);
    const [feedback, setFeedback] = useState("");

    const karte = tagesKarten[aktuelleFrage];
    const frage = karte ? karte.multiple_choice_question : undefined;

    async function antwortKlick(optionId){
        try{
            const daten = await beantworten(optionId);
            daten.correct ? setFeedback("Richtig!!!") : setFeedback("Falsch, richtig wäre " + daten.correct_option.text);
            ladeProfil();
        }
        catch(fehler){
            setFeedback("Fehler beim Beantworten: " + fehler.message);
        }
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
        <h2>{frage.question_text}</h2>
        <ul>
            {frage.answer_options.map((option)=>(
                <li key={option.id}>
                    <button onClick={()=> antwortKlick(option.id)}>{option.text}</button>
                </li>
            ))}
        </ul>
        <p>{feedback}</p>
        <button onClick={()=> naechsteFrage()}>Nächste Frage</button>
        </div>
    )
}

export default QuizPage;