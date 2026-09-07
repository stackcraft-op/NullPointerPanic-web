import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../UserContext";
import GeschuetztesBild from "./GeschuetztesBild";
import { bildUrl } from "../api";


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
    // Stufen-Bild zurueck. Rahmen ist ein eigenes transparentes PNG, liegt
    // als Overlay ueber dem Avatar.
    const aktiverAvatar = shopItems.find((item) => item.id === ausgewaehlterAvatarId);
    const aktiverRahmen = shopItems.find((item) => item.id === ausgewaehlterRahmenId);

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
        // Katalog kommt jetzt live vom Server (eigener owned-Status pro
        // Nutzer) - ohne Reset wuerde der naechste Nutzer auf demselben
        // Geraet kurz den Besitzstand des vorherigen Nutzers sehen, bis der
        // naechste Login ladeShopItems() erneut aufruft.
        setShopItems([]);
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
                <div className="profil-menu-avatar-wrap">
                    {/* aktiverAvatar kommt vom Backend/ngrok (braucht GeschuetztesBild,
                        s. dort), das Stufen-Bild liegt lokal in public/ (ganz normales
                        <img>, kein ngrok involviert). */}
                    {aktiverAvatar ? (
                        <GeschuetztesBild src={bildUrl(aktiverAvatar.image_url)} alt={eingeloggterName} className="profil-menu-avatar"/>
                    ) : (
                        <img src={aktuelleStufe.avatarBild} alt={eingeloggterName} className="profil-menu-avatar"/>
                    )}
                    {aktiverRahmen && (
                        <GeschuetztesBild src={bildUrl(aktiverRahmen.image_url)} alt="" className="avatar-rahmen-overlay"/>
                    )}
                </div>
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