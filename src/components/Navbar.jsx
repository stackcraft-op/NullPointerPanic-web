import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../UserContext";
import { shopItemsMock } from "../mockData";


function Navbar(){
    const {
        eingeloggterName, setEingeloggterName,
        currency, aktuelleStufe,
        setProfilDaten,
        shopItems, ausgewaehlterAvatarId, ausgewaehlterRahmenId,
        setShopItems, setAusgewaehlterAvatarId, setAusgewaehlterRahmenId,
        setXp, setCurrency, setTagesKarten, setVerbleibendeKarten,
    } = useContext(UserContext)
    const navigate = useNavigate();

    // Gleiche Aufloesung wie in ProfilPage.jsx: ein gekaufter+ausgewaehlter
    // Shop-Avatar ersetzt den XP-Stufen-Avatar, sonst faellt man auf das
    // Stufen-Bild zurueck. Rahmenfarbe faerbt nur den Ring.
    const aktiverAvatar = shopItems.find((item) => item.id === ausgewaehlterAvatarId);
    const aktiverRahmen = shopItems.find((item) => item.id === ausgewaehlterRahmenId);
    const avatarBild = aktiverAvatar ? aktiverAvatar.image_url : aktuelleStufe.avatarBild;
    const rahmenFarbe = aktiverRahmen ? aktiverRahmen.farbe : "var(--php-text)";

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
            <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
            <NavLink to="/ranking" className="nav-link">Ranking</NavLink>
            <NavLink to="/shop" className="nav-link">Shop</NavLink>
            <NavLink to="/quiz" className="nav-link">Quiz</NavLink>
            <NavLink to="/wiki" className="nav-link">Wiki</NavLink>
            <NavLink to="/learning" className="nav-link">Daily Learning</NavLink>
            <NavLink to="/profil" className="profil-menu">
                <img src={avatarBild} alt={eingeloggterName} className="profil-menu-avatar" style={{ borderColor: rahmenFarbe }}/>
                <div className="profil-menu-text">
                    <span className="profil-menu-name">{eingeloggterName}</span>
                    <span className="profil-menu-zeile">
                        {aktuelleStufe.name} <span className="profil-menu-punkt"></span> {currency}
                    </span>
                </div>
            </NavLink>
            <button className="nav-logout" onClick={()=> logout()}>Logout</button>
        </nav>
    )
}

export default Navbar;