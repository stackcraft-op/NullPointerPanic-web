import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import RankingPage from "./pages/RankingPage";
import ProfilPage from "./pages/ProfilPage";
import FlashcardsPage from "./pages/FlashcardsPage";
import QuizPage from "./pages/QuizPage";
import RegisterPage from "./pages/RegisterPage";
import { useState } from "react";
import DailyLearningPage from "./pages/DailyLearningPage";
import "./php-design.css"; // Design aus dem PHP-Projekt übernommen – löschen = diese Zeile + die Datei entfernen
import ProfilBearbeitenPage from "./pages/ProfilBearbeitenPage";
import UserContext from "./UserContext";

function App() {
  const [xp,setXp] = useState(200);
  const [currency, setCurrency] = useState(50);

  const stufen = [
    { name: "Einsteiger", schwelle: 0, rahmenFarbe: "blue", avatarBild: "/avatare/einsteiger.webp" },
    { name: "Junior", schwelle: 50, rahmenFarbe: "silver", avatarBild: "/avatare/junior.jpeg" },
    { name: "Middle", schwelle: 100, rahmenFarbe: "green", avatarBild: "/avatare/middle.jpg" },
    { name: "Senior", schwelle: 200, rahmenFarbe: "gold", avatarBild: "/avatare/senior.webp" },
  ];
  const aktuelleStufe = [...stufen].reverse().find((stufe)=> xp >= stufe.schwelle);

  const [eingeloggterName,setEingeloggterName] = useState("");
  const [gespeicherteKarten,setGespeicherteKarten] = useState([]);
  const [profilDaten, setProfilDaten] = useState({
    vorname: "",
    nachname:"",
    fachbereich:"",
    stadt:"",
    bundesland:"",
  })

  return(
    <BrowserRouter>
      <UserContext.Provider value={{eingeloggterName, setEingeloggterName, currency, aktuelleStufe}}>
      <Routes>
        <Route path = "/" element={<StartPage/>} />
        <Route path="/login" element={<LoginPage setEingeloggterName = {setEingeloggterName}/>} />
        <Route path="/dashboard" element={<DashboardPage/>}/>
        <Route path="/ranking" element={<RankingPage/>}/>
        <Route path="/profil" element={<ProfilPage/>}/>
        <Route path="/karteikarten" element={<FlashcardsPage gespeicherteKarten = {gespeicherteKarten} setGespeicherteKarten = {setGespeicherteKarten}/>}/>
        <Route path="/quiz" element={<QuizPage/>}/>
        <Route path="/registrieren" element={<RegisterPage/>}/>
        <Route path="/learning" element={<DailyLearningPage gespeicherteKarten = {gespeicherteKarten} setGespeicherteKarten = {setGespeicherteKarten}/>}/>
        <Route path="/profil/bearbeiten" element ={<ProfilBearbeitenPage profilDaten={profilDaten} setProfilDaten={setProfilDaten}/>}/>
      </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App;