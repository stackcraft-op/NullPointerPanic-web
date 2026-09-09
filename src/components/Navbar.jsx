import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../UserContext";
import GeschuetztesBild from "./GeschuetztesBild";
import { bildUrl } from "../api";


function Navbar(){
    // Nur auf schmalen Screens relevant (siehe .nav-burger/.nav-links in
    // php-design.css, ab da erst display:flex/block statt display:none) -
    // auf breiten Screens bleibt die Navbar wie bisher immer sichtbar,
    // dieser State hat dort keine Wirkung.
    const [menuOffen, setMenuOffen] = useState(false);

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
            {/* Nur auf schmalen Screens sichtbar (CSS) - oeffnet/schliesst
                .nav-links dort. Auf breiten Screens per CSS ausgeblendet,
                menuOffen bleibt dann einfach ungenutzt false. */}
            <button
                className="nav-burger"
                onClick={() => setMenuOffen(!menuOffen)}
                aria-label={menuOffen ? "Menü schließen" : "Menü öffnen"}
                aria-expanded={menuOffen}>
                <span></span><span></span><span></span>
            </button>

            {/* Mobil: kompaktes Profilbild direkt in der immer sichtbaren
                Kopfzeile statt erst im aufgeklappten Burger-Menue versteckt
                (dort steckt unten in .nav-links weiterhin die volle Version
                mit Name/Stufe/Currency). Eigenes Element statt das per CSS
                aus .nav-links "herausgezogen" - display:none auf .nav-links
                wuerde sonst auch ein Kind-Element mit ausblenden. Auf
                breiten Screens per CSS wieder ausgeblendet, da unten in
                .nav-links schon die normale Version sichtbar ist. */}
            <NavLink to="/profil" className="nav-profil-mobil" onClick={() => setMenuOffen(false)} aria-label="Profil">
                {/* Zum Testen: Name/Stufe/Currency VOR (also links von) dem
                    Bild im Markup - eigene Klasse fuer die Ausrichtung, damit
                    das die zentrierte Version im Burger-Dropdown (.profil-menu
                    .profil-menu-text) nicht mit-beeinflusst. */}
                <div className="profil-menu-text nav-profil-mobil-text">
                    <span className="profil-menu-name">{eingeloggterName}</span>
                    <span className="profil-menu-zeile">
                        {aktuelleStufe.name} <span className="profil-menu-punkt"></span> {currency}
                    </span>
                </div>
                <div className="profil-menu-avatar-wrap">
                    {aktiverAvatar ? (
                        <GeschuetztesBild src={bildUrl(aktiverAvatar.image_url)} alt={eingeloggterName} className="profil-menu-avatar"/>
                    ) : (
                        <img src={aktuelleStufe.avatarBild} alt={eingeloggterName} className="profil-menu-avatar"/>
                    )}
                    {aktiverRahmen && (
                        <GeschuetztesBild src={bildUrl(aktiverRahmen.image_url)} alt="" className="avatar-rahmen-overlay"/>
                    )}
                </div>
            </NavLink>

            <div className={`nav-links ${menuOffen ? "nav-links-offen" : ""}`}>
                <NavLink to="/dashboard" className="nav-link" onClick={() => setMenuOffen(false)}>Dashboard</NavLink>
                <NavLink to="/ranking" className="nav-link" onClick={() => setMenuOffen(false)}>Ranking</NavLink>
                <NavLink to="/shop" className="nav-link" onClick={() => setMenuOffen(false)}>Shop</NavLink>
                <NavLink to="/quiz" className="nav-link" onClick={() => setMenuOffen(false)}>Quiz</NavLink>
                <NavLink to="/wiki" className="nav-link" onClick={() => setMenuOffen(false)}>Wiki</NavLink>
                <NavLink to="/learning" className="nav-link" onClick={() => setMenuOffen(false)}>Daily Learning</NavLink>
                <NavLink to="/profil" className="profil-menu" onClick={() => setMenuOffen(false)}>
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
            </div>
        </nav>
    )
}

export default Navbar;