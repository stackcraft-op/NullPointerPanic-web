import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import RankingPage from "./pages/RankingPage";
import ProfilPage from "./pages/ProfilPage";
import FlashcardsPage from "./pages/FlashcardsPage";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<StartPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/dashboard" element={<DashboardPage/>}/>
        <Route path="/ranking" element={<RankingPage/>}/>
        <Route path="/profil" element={<ProfilPage/>}/>
        <Route path="/karteikarten" element={<FlashcardsPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;