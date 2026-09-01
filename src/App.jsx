import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import RankingPage from "./pages/RankingPage";
import ProfilPage from "./pages/ProfilPage";
import FlashcardsPage from "./pages/FlashcardsPage";
import QuizPage from "./pages/QuizPage";
import RegisterPage from "./pages/RegisterPage";
import { useState, useEffect } from "react";
import { holeTagesKarten, holeProfil } from "./api";
import DailyLearningPage from "./pages/DailyLearningPage";
import "./php-design.css"; // Design aus dem PHP-Projekt übernommen – löschen = diese Zeile + die Datei entfernen
import "./App.css"; // war bisher nirgends importiert - unsere .tageskarte-Styles brauchen das
import ProfilBearbeitenPage from "./pages/ProfilBearbeitenPage";
import UserContext from "./UserContext";
import WikiPage from "./pages/WikiPage";

function App() {
  const [xp,setXp] = useState(0);
  const [currency, setCurrency] = useState(0);

  const stufen = [
    { name: "Einsteiger", schwelle: 0, rahmenFarbe: "blue", avatarBild: "/avatare/einsteiger.webp" },
    { name: "Junior", schwelle: 50, rahmenFarbe: "silver", avatarBild: "/avatare/junior.jpeg" },
    { name: "Middle", schwelle: 100, rahmenFarbe: "green", avatarBild: "/avatare/middle.jpg" },
    { name: "Senior", schwelle: 200, rahmenFarbe: "gold", avatarBild: "/avatare/senior.webp" },
  ];
  const aktuelleStufe = [...stufen].reverse().find((stufe)=> xp >= stufe.schwelle);

  const [eingeloggterName,setEingeloggterName] = useState("");
  const [tagesKarten,setTagesKarten] = useState([]);
  const [verbleibendeKarten,setVerbleibendeKarten] = useState([]);
  // Eigenes Flag statt im Dashboard nur "tagesKarten.length === 0" zu pruefen -
  // sonst ist "laedt noch" und "heute wirklich keine Karten mehr" nicht
  // unterscheidbar, das Dashboard wuerde waehrend des Ladens faelschlich
  // "Keine Karten mehr für heute" zeigen.
  const [tagesKartenGeladen, setTagesKartenGeladen] = useState(false);

  // eigene Funktion statt Code direkt im useEffect, damit LoginPage sie nach
  // einem erfolgreichen Login zusaetzlich aufrufen kann (gleiches Prinzip wie
  // ladeProfil weiter unten) - sonst sieht man die Tageskarten erst nach einem
  // Seiten-Reload, weil der useEffect mit [] nur einmal beim allerersten Mount laeuft
  function ladeTagesKarten(){
    holeTagesKarten()
      .then((karten)=>{
        setTagesKarten(karten);
        setVerbleibendeKarten(karten);
      })
      .catch((error)=> console.error("Tageskarten laden fehlgeschlagen:", error))
      .finally(() => setTagesKartenGeladen(true))
  }

  useEffect(()=>{
    ladeTagesKarten();
  }, []);

const quizFreigeschaltet = tagesKarten.length > 0 && verbleibendeKarten.length === 0;

  function ladeProfil(){
  holeProfil()
    .then((daten) => {
      setXp(daten.experience);
      setCurrency(daten.currency);
    })
    .catch((error) => console.error("Profil laden fehlgeschlagen:", error));
  }

  useEffect(() => {
    ladeProfil();
  }, []);


  const [gespeicherteKarten,setGespeicherteKarten] = useState([]);
  const [dailyLearningKarten, setDailyLearningKarten] = useState([
    { id: 1, titel: "Verschlüsselung", info: "Verschlüsselung macht Daten unlesbar für alle, die den passenden Schlüssel nicht haben." },
    { id: 2, titel: "Firewall", info: "Eine Firewall kontrolliert, welcher Netzwerk-Verkehr rein und raus darf, nach festgelegten Regeln." },
    { id: 3, titel: "Phishing", info: "Betrugsversuch per gefälschter Nachricht/Website, um an Passwörter oder Daten zu kommen." },
  ]);
  const [profilDaten, setProfilDaten] = useState({
    vorname: "",
    nachname:"",
    fachbereich:"",
    stadt:"",
    bundesland:"",
  })

  return(
    <BrowserRouter>
      <UserContext.Provider value={{eingeloggterName, setEingeloggterName, currency, aktuelleStufe, setProfilDaten, setGespeicherteKarten}}>
      <Routes>
        <Route path = "/" element={<StartPage/>} />
        <Route path="/login" element={<LoginPage setEingeloggterName={setEingeloggterName} ladeProfil={ladeProfil} ladeTagesKarten={ladeTagesKarten}/>} />

        <Route path="/dashboard" element={<DashboardPage tagesKarten={verbleibendeKarten} setTagesKarten={setVerbleibendeKarten} quizFreigeschaltet={quizFreigeschaltet} tagesKartenGeladen={tagesKartenGeladen}/>}/>

        <Route path="/ranking" element={<RankingPage/>}/>
        <Route path="/profil" element={<ProfilPage/>}/>
        <Route path="/karteikarten" element={<FlashcardsPage gespeicherteKarten = {gespeicherteKarten} setGespeicherteKarten = {setGespeicherteKarten}/>}/>
        <Route path="/quiz" element={<QuizPage tagesKarten={tagesKarten} quizFreigeschaltet={quizFreigeschaltet} ladeProfil={ladeProfil}/>}/>


        <Route path="/wiki" element={<WikiPage/>}/>
        <Route path="/registrieren" element={<RegisterPage/>}/>
        <Route path="/learning" element={<DailyLearningPage/>}/>

        <Route path="/profil/bearbeiten" element ={<ProfilBearbeitenPage profilDaten={profilDaten} setProfilDaten={setProfilDaten}/>}/>

      </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App;