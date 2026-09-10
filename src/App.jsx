import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import RankingPage from "./pages/RankingPage";
import ProfilPage from "./pages/ProfilPage";
import ShopPage from "./pages/ShopPage";
import QuizPage from "./pages/QuizPage";
import RegisterPage from "./pages/RegisterPage";
import { useState, useEffect } from "react";
import { holeTagesKarten, holeProfil, holeShopItems } from "./api";
import DailyLearningPage from "./pages/DailyLearningPage";
import "./php-design.css"; // Design aus dem PHP-Projekt übernommen – löschen = diese Zeile + die Datei entfernen
import "./App.css"; // war bisher nirgends importiert - unsere .tageskarte-Styles brauchen das
import ProfilBearbeitenPage from "./pages/ProfilBearbeitenPage";
import UserContext from "./UserContext";
import WikiPage from "./pages/WikiPage";
import GeschuetzteRoute from "./components/GeschuetzteRoute";

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
      // eingeloggterName wird sonst nur beim Login selbst gesetzt (siehe
      // LoginPage.jsx) - nach einem Reload (F5) laeuft kein Login mehr, nur
      // dieser ohnehin schon vorhandene Profil-Request. Ohne diese Zeile
      // bleibt der Name in der Navbar nach einem Reload leer, obwohl der
      // Token noch gueltig ist und man eingeloggt bleibt.
      setEingeloggterName(daten.username);
      // avatar/frame kommen seit PR #29 im Backend mit GET /api/profile mit
      // (null, solange nichts ausgeruestet ist) - ersetzt den bisherigen
      // rein lokalen ausgewaehlterAvatarId/RahmenId-State, der Login-
      // uebergreifend nichts wusste.
      setAusgewaehlterAvatarId(daten.avatar ? daten.avatar.id : null);
      setAusgewaehlterRahmenId(daten.frame ? daten.frame.id : null);
    })
    .catch((error) => console.error("Profil laden fehlgeschlagen:", error));
  }

  useEffect(() => {
    ladeProfil();
  }, []);

  // Shop-State liegt hier (nicht in ShopPage.jsx), weil ProfilPage.jsx den
  // gekauften/ausgeruesteten Avatar+Rahmen auch braucht (ersetzt dort den
  // Stufen-Avatar). Katalog kommt jetzt ueber GET /api/shop/items (inkl.
  // eigenem owned-Status) statt aus shopItemsMock.
  const [shopItems, setShopItems] = useState([]);
  const [ausgewaehlterAvatarId, setAusgewaehlterAvatarId] = useState(null);
  const [ausgewaehlterRahmenId, setAusgewaehlterRahmenId] = useState(null);

  // Eigene Funktion statt Code direkt im useEffect, aus demselben Grund wie
  // ladeTagesKarten/ladeProfil oben - LoginPage ruft sie nach dem Login
  // zusaetzlich auf, sonst sieht man den eigenen Besitzstand erst nach einem
  // Reload.
  function ladeShopItems(){
    holeShopItems()
      .then((items) => setShopItems(items))
      .catch((error) => console.error("Shop-Katalog laden fehlgeschlagen:", error));
  }

  useEffect(() => {
    ladeShopItems();
  }, []);

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
      <UserContext.Provider value={{
        eingeloggterName, setEingeloggterName,
        currency, aktuelleStufe,
        setProfilDaten,
        shopItems, setShopItems,
        ausgewaehlterAvatarId, setAusgewaehlterAvatarId,
        ausgewaehlterRahmenId, setAusgewaehlterRahmenId,
        // fuer den Logout-Reset (siehe Navbar.jsx) - ohne diese Setter blieben
        // xp/currency/tagesKarten/verbleibendeKarten des vorherigen Nutzers
        // kurz sichtbar, bis der naechste Login sie ueberschreibt
        setXp, setCurrency, setTagesKarten, setVerbleibendeKarten,
      }}>
      <Routes>
        {/* Oeffentliche Seiten - brauchen keinen Login, hier waere eine
            Weiterleitung zu /login sinnlos (Start ist die Landingpage,
            Login/Registrieren sind der Weg dorthin ueberhaupt erst). */}
        <Route path = "/" element={<StartPage/>} />
        <Route path="/login" element={<LoginPage setEingeloggterName={setEingeloggterName} ladeProfil={ladeProfil} ladeTagesKarten={ladeTagesKarten} ladeShopItems={ladeShopItems}/>} />
        <Route path="/registrieren" element={<RegisterPage/>}/>

        {/* Alle folgenden Seiten brauchen einen eingeloggten Nutzer - jede
            von ihnen ruft im Hintergrund mindestens einen Endpoint mit
            Authorization-Header auf (siehe api.js), waere also ohne Token
            ohnehin nur eine leere/kaputte Seite voller 401-Fehler. */}
        <Route path="/dashboard" element={<GeschuetzteRoute><DashboardPage tagesKarten={verbleibendeKarten} setTagesKarten={setVerbleibendeKarten} quizFreigeschaltet={quizFreigeschaltet} tagesKartenGeladen={tagesKartenGeladen}/></GeschuetzteRoute>}/>

        <Route path="/ranking" element={<GeschuetzteRoute><RankingPage/></GeschuetzteRoute>}/>
        <Route path="/profil" element={<GeschuetzteRoute><ProfilPage/></GeschuetzteRoute>}/>
        <Route path="/shop" element={<GeschuetzteRoute><ShopPage/></GeschuetzteRoute>}/>
        <Route path="/quiz" element={<GeschuetzteRoute><QuizPage tagesKarten={tagesKarten} quizFreigeschaltet={quizFreigeschaltet} ladeProfil={ladeProfil}/></GeschuetzteRoute>}/>

        <Route path="/wiki" element={<GeschuetzteRoute><WikiPage/></GeschuetzteRoute>}/>
        <Route path="/learning" element={<GeschuetzteRoute><DailyLearningPage/></GeschuetzteRoute>}/>

        <Route path="/profil/bearbeiten" element ={<GeschuetzteRoute><ProfilBearbeitenPage profilDaten={profilDaten} setProfilDaten={setProfilDaten}/></GeschuetzteRoute>}/>

      </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App;