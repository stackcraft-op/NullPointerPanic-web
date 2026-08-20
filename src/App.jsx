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

function App() {
  const [eingeloggterName,setEingeloggterName] = useState("");
  const [gespeicherteKarten,setGespeicherteKarten] = useState([]);

  return(
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<StartPage/>} />
        <Route path="/login" element={<LoginPage setEingeloggterName = {setEingeloggterName}/>} />
        <Route path="/dashboard" element={<DashboardPage/>}/>
        <Route path="/ranking" element={<RankingPage/>}/>
        <Route path="/profil" element={<ProfilPage eingeloggterName = {eingeloggterName}/>}/>
        <Route path="/karteikarten" element={<FlashcardsPage gespeicherteKarten = {gespeicherteKarten} setGespeicherteKarten = {setGespeicherteKarten}/>}/>
        <Route path="/quiz" element={<QuizPage/>}/>
        <Route path="/registrieren" element={<RegisterPage/>}/>
        <Route path="/learning" element={<DailyLearningPage gespeicherteKarten = {gespeicherteKarten} setGespeicherteKarten = {setGespeicherteKarten}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;