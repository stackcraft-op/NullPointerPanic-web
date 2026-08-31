import Navbar from "../components/Navbar";
import { useState } from "react";
import { beantworten } from "../api";

function QuizPage({tagesKarten, quizFreigeschaltet, ladeProfil}){

    // sucht ab startIndex die naechste Frage, deren ID noch NICHT in ids steht
    function findeNaechsteOffene(startIndex, ids){
        let i = startIndex;
        while(i < tagesKarten.length && ids.includes(tagesKarten[i].multiple_choice_question.id)){
            i++;
        }
        return i;
    }

    const [beantworteteIds, setBeantworteteIds] = useState(() => {
        const heute = new Date().toISOString().slice(0,10);
        return JSON.parse(localStorage.getItem(`beantwortete_fragen_${heute}`) || "[]");
    });
    // Start-Index einmalig beim Mount berechnet - ueberspringt nur alte, schon
    // aus frueheren Sessions bekannte Fragen, wird danach NICHT mehr automatisch
    // neu berechnet (sonst wuerde die gerade erst beantwortete Frage sofort
    // uebersprungen werden, bevor die Farb-Rueckmeldung sichtbar war)
    const [aktuelleFrage,setAktuelleFrage] = useState(() => findeNaechsteOffene(0, JSON.parse(localStorage.getItem(`beantwortete_fragen_${new Date().toISOString().slice(0,10)}`) || "[]")));
    const [feedback, setFeedback] = useState("");
    const [ausgewaehlteOptionId, setAusgewaehlteOptionId] = useState(null);
    const [korrekteOptionId, setKorrekteOptionId] = useState(null);
    const [warRichtig, setWarRichtig] = useState(null);

    if(!quizFreigeschaltet){
        return (
            <div>
                <Navbar/>
                <h1>Quiz</h1>
                <div className="quiz-karte">
                    <p>Schließe erst alle heutigen Karten im Dashboard ab ("Kann ich"), dann wird das Quiz freigeschaltet.</p>
                </div>
            </div>
        )
    }

    const karte = tagesKarten[aktuelleFrage];
    const frage = karte ? karte.multiple_choice_question : undefined;

    async function antwortKlick(optionId){
        try{
            const daten = await beantworten(optionId);
            setAusgewaehlteOptionId(optionId);
            setWarRichtig(daten.correct);
            if(daten.correct){
                setFeedback("Richtig!!!");
            } else {
                setFeedback("Falsch, richtig wäre " + daten.correct_option.text);
                setKorrekteOptionId(daten.correct_option.id);
            }
            const heute = new Date().toISOString().slice(0,10);
            const neueIds = [...beantworteteIds, frage.id];
            localStorage.setItem(`beantwortete_fragen_${heute}`, JSON.stringify(neueIds));
            setBeantworteteIds(neueIds);
            ladeProfil();
        }
        catch(fehler){
            setFeedback("Fehler beim Beantworten: " + fehler.message);
        }
    }

    function naechsteFrage(){
        setAktuelleFrage(findeNaechsteOffene(aktuelleFrage+1, beantworteteIds));
        setFeedback("");
        setAusgewaehlteOptionId(null);
        setKorrekteOptionId(null);
        setWarRichtig(null);
    }

    function optionFarbe(optionId){
        if(optionId === korrekteOptionId) return { border: "3px solid #39ff14" };
        if(optionId === ausgewaehlteOptionId) return { border: warRichtig ? "3px solid #39ff14" : "3px solid red" };
        return {};
    }

    if(!frage){
        return (
            <div>
                <Navbar></Navbar>
                <h1>Quiz</h1>
                <div className="quiz-karte">
                    <p>Du hast alle Fragen beantwortet</p>
                </div>
            </div>
        )
    }

    return(
        <div>
        <Navbar/>
        <h1>Quiz</h1>
        <div className="quiz-karte">
            <h2>{frage.question_text}</h2>
            <ul className="quiz-antworten">
                {frage.answer_options.map((option)=>(
                    <li key={option.id}>
                        <button style={optionFarbe(option.id)} onClick={()=> antwortKlick(option.id)}>{option.text}</button>
                    </li>
                ))}
            </ul>
            <button onClick={()=> naechsteFrage()}>Nächste Frage</button>
        </div>
        </div>
    )
}

export default QuizPage;