import Navbar from "../components/Navbar";
import GeschuetztesBild from "../components/GeschuetztesBild";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import UserContext from "../UserContext";
import { holeThemenFortschritt, holeProfil, bildUrl } from "../api";
import { prozentSicher, farbeFuerProzent } from "../utils";

function ProfilPage(){

    const {
        eingeloggterName, aktuelleStufe,
        shopItems, ausgewaehlterAvatarId, ausgewaehlterRahmenId,
    } = useContext(UserContext);

    // Ein im Shop gekaufter+ausgewaehlter Avatar ersetzt den XP-Stufen-Avatar
    // komplett, wenn einer gewaehlt ist - sonst faellt man auf das alte
    // Stufen-Bild zurueck (aktuelleStufe.avatarBild). Ein Rahmen ist ein
    // eigenes transparentes PNG, liegt als Overlay ueber dem Avatar-Kreis,
    // unabhaengig davon ob der gerade ein Stufen- oder Shop-Avatar ist.
    const aktiverAvatar = shopItems.find((item) => item.id === ausgewaehlterAvatarId);
    const aktiverRahmen = shopItems.find((item) => item.id === ausgewaehlterRahmenId);

    const [themenFortschritt, setThemenFortschritt] = useState([]);
    const [ladeFehler, setLadeFehler] = useState("");
    // Eigenes Flag statt nur "themenFortschritt.length === 0" zu pruefen -
    // sonst ist "noch am Laden" und "Server hat leere Liste geliefert"
    // nicht unterscheidbar, die Seite wuerde bei einer echten Leerliste
    // dauerhaft "Lädt..." zeigen.
    const [geladen, setGeladen] = useState(false);

    // Status-Text: nur Anzeige hier - aendern kann man ihn nur im Shop
    // (kostet Currency, gehoert deshalb dort hin, nicht in die Profilseite).
    const [statusText, setStatusText] = useState("");
    const [statusFehler, setStatusFehler] = useState("");

    useEffect(() => {
        holeThemenFortschritt()
            .then((daten) => setThemenFortschritt(daten))
            .catch((error) => setLadeFehler(error.message))
            .finally(() => setGeladen(true));
    }, []);

    // Eigener useEffect statt in den obigen reingemischt - laedt eine andere
    // Sache (Status-Text) unabhaengig vom Themenfortschritt.
    useEffect(() => {
        holeProfil()
            .then((daten) => setStatusText(daten.status_text || ""))
            .catch((error) => setStatusFehler(error.message));
    }, []);

    // Durchschnitt ueber alle Themen - "wie viel hast du insgesamt drauf",
    // unabhaengig von der einzelnen Stufe/XP. Number(...) erzwingt echte
    // Addition statt String-Verkettung, falls progress_percent mal als
    // String ankommt.
    const gesamtProzent = themenFortschritt.length === 0
        ? 0
        : Math.round(
            themenFortschritt.reduce((summe, thema) => summe + Number(thema.progress_percent), 0) / themenFortschritt.length
        );

    return (
        <div className="profil-seite">
            <Navbar></Navbar>
            <h1>Profil</h1>

            <div className="profil-inhalt">
                <div className="profil-kopf profil-karte">
                    <div className="profil-avatar-shop">
                        <div className="profil-avatar-shop-kreis">
                            {aktiverAvatar ? (
                                <GeschuetztesBild src={bildUrl(aktiverAvatar.image_url)} alt={aktiverAvatar.name}/>
                            ) : (
                                <img src={aktuelleStufe.avatarBild} alt={aktuelleStufe.name}/>
                            )}
                        </div>
                        {/* Rahmen ist ein eigenes transparentes PNG (Ring-Form), liegt
                            als Overlay ueber dem Avatar - unabhaengig davon ob der
                            gerade ein Stufen- oder Shop-Avatar ist (siehe Kommentar
                            oben bei aktiverAvatar/aktiverRahmen). */}
                        {aktiverRahmen && (
                            <GeschuetztesBild src={bildUrl(aktiverRahmen.image_url)} alt={aktiverRahmen.name} className="avatar-rahmen-overlay"/>
                        )}
                    </div>
                    <div className="profil-info">
                        <p className="profil-name">{eingeloggterName}</p>
                        <span className="profil-stufe">{aktuelleStufe.name}</span>
                        {statusText && <p className="profil-status">„{statusText}“</p>}
                    </div>
                    <Link to="/profil/bearbeiten" className="profil-bearbeiten-link">Profil bearbeiten</Link>
                </div>
                {statusFehler && <p className="auth-fehler">{statusFehler}</p>}

                <h2>Lernfortschritt</h2>
                {ladeFehler && <p className="auth-fehler">{ladeFehler}</p>}
                {!geladen && !ladeFehler && <p>Lädt...</p>}
                {geladen && themenFortschritt.length === 0 && !ladeFehler && (
                    <p>Noch kein Lernfortschritt vorhanden.</p>
                )}

                {themenFortschritt.length > 0 && (
                    <>
                        {/* Gesamtfortschritt bewusst als eigener, groesserer Block VOR der
                            Kategorien-Liste - soll als Hauptkennzahl sofort ins Auge fallen,
                            nicht nur die erste Zeile einer gleichförmigen Liste sein. */}
                        <div className="gesamtfortschritt-karte profil-karte">
                            <div className="gesamtfortschritt-kopf">
                                <span>Gesamtfortschritt</span>
                                <span className="gesamtfortschritt-prozent">{gesamtProzent}%</span>
                            </div>
                            <div className="fortschritt-balken fortschritt-balken-gross">
                                <div
                                    className="fortschritt-balken-fuellung"
                                    style={{ width: `${prozentSicher(gesamtProzent)}%`, background: farbeFuerProzent(gesamtProzent) }}
                                ></div>
                            </div>
                        </div>

                        <div className="fortschritt-liste profil-karte">
                            {themenFortschritt.map((thema) => (
                                <div className="fortschritt-zeile" key={thema.id}>
                                    <div className="fortschritt-zeile-kopf">
                                        <span className="fortschritt-name">{thema.name}</span>
                                        <span className="fortschritt-prozent">{thema.progress_percent}%</span>
                                    </div>
                                    <div className="fortschritt-balken">
                                        <div
                                            className="fortschritt-balken-fuellung"
                                            style={{ width: `${prozentSicher(thema.progress_percent)}%`, background: farbeFuerProzent(thema.progress_percent) }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default ProfilPage;
