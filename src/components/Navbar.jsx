import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../UserContext";
import { shopItemsMock } from "../mockData";


function Navbar(){
    const {
        eingeloggterName, setEingeloggterName,
        currency, aktuelleStufe,
        setProfilDaten,
        setShopItems, setAusgewaehlterAvatarId, setAusgewaehlterRahmenId,
        setXp, setCurrency, setTagesKarten, setVerbleibendeKarten,
    } = useContext(UserContext)
    const navigate = useNavigate();

    function logout(){
        localStorage.removeItem("token");
        setEingeloggterName("");
        setProfilDaten({
            vorname: "",
            nachname: "",
            fachbereich: "",
            stadt: "",
            bundesland: "",
        });
        // Ohne das hier wuerden xp/currency/Tageskarten des vorherigen Nutzers
        // kurz weiter angezeigt, bis der naechste Login sie ueberschreibt -
        // gleiche Datenleck-Klasse wie bei profilDaten/gespeicherteKarten oben.
        setXp(0);
        setCurrency(0);
        setTagesKarten([]);
        setVerbleibendeKarten([]);
        // Shop-Kaeufe sind noch reiner Mock-State (kein Server) - ohne Reset
        // wuerde der naechste Nutzer auf demselben Geraet die gekauften
        // Avatare/Rahmen des vorherigen Nutzers sehen.
        setShopItems(shopItemsMock);
        setAusgewaehlterAvatarId(null);
        setAusgewaehlterRahmenId(null);
        navigate("/login");
    }

    return (
        <nav>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/ranking">Ranking</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/quiz">Quiz</NavLink>
            <NavLink to="/wiki">Wiki</NavLink>
            <NavLink to="/learning">Daily Learning</NavLink>
            <NavLink to= "/profil" className="profil-menu">
                <span>{eingeloggterName}</span>
                <span>{aktuelleStufe.name}</span>
                <span>🪙 {currency}</span>
            </NavLink>
            <button onClick={()=> logout()}>Logout</button>
            
        </nav>
    )
}

export default Navbar;