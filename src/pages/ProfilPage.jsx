import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import UserContext from "../UserContext";
import { holeThemenFortschritt, holeProfil } from "../api";

// Rails liefert Prozentwerte manchmal als String statt Zahl (z.B. bei
// Decimal-Spalten) - Number(...) erzwingt eine echte Zahl. || 0 faengt
// zusaetzlich undefined/NaN ab. Danach auf [0, 100] geklemmt, damit ein
// kaputter/ungewoehnlicher Wert weder die Balkenbreite noch die Farbe
// durcheinanderbringt - beide nutzen jetzt denselben, sicheren Wert.
function prozentSicher(wert) {
    const zahl = Number(wert) || 0;
    return Math.min(Math.max(zahl, 0), 100);
}

// Kein Rot/Ampel-Schema mehr (wirkte zu aggressiv) - stattdessen eine
// sanfte Einfaerbung, die zwischen Lila (App-Akzentfarbe, wie schon beim
// Dashboard-Themen-Tag) und Gruen interpoliert. 0% = reines Lila, 100% =
// reines Gruen, dazwischen linear gemischt.
function farbeFuerProzent(prozent) {
    const anteil = prozentSicher(prozent) / 100;
    const lila = [170, 59, 255];
    const gruen = [34, 197, 94];
    const [r, g, b] = lila.map((start, i) => Math.round(start + (gruen[i] - start) * anteil));
    return `rgb(${r}, ${g}, ${b})`;
}

function ProfilPage(){

    const {
        eingeloggterName, aktuelleStufe,
        shopItems, ausgewaehlterAvatarId, ausgewaehlterRahmenId,
    } = useContext(UserContext);

    // Ein im Shop gekaufter+ausgewaehlter Avatar ersetzt den XP-Stufen-Avatar
    // komplett, wenn einer gewaehlt ist - sonst faellt man auf das alte
    // Stufen-Bild zurueck (aktuelleStufe.avatarBild). Rahmen faerbt nur den
    // Ring um den Avatar, unabhaengig davon ob Avatar Stufe oder Shop ist.
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
                    {aktiverAvatar ? (
                        <div
                            className="profil-avatar-shop"
                            style={{ borderColor: aktiverRahmen ? aktiverRahmen.farbe : "var(--php-text)" }}
                        >
                            <img src={aktiverAvatar.image_url} alt={aktiverAvatar.name}/>
                        </div>
                    ) : (
                        <img
                            src={aktuelleStufe.avatarBild}
                            alt={aktuelleStufe.name}
                            style={{
                                width : "88px",
                                height : "88px",
                                borderRadius: "50%",
                                border: "3px solid var(--php-text)",
                                objectFit: "cover"
                            }}
                            />
                    )}
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
