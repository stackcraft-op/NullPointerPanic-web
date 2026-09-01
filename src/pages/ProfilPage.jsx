import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import UserContext from "../UserContext";
import { holeThemenFortschritt } from "../api";

// Kein Rot/Ampel-Schema mehr (wirkte zu aggressiv) - stattdessen eine
// sanfte Einfaerbung, die zwischen Lila (App-Akzentfarbe, wie schon beim
// Dashboard-Themen-Tag) und Gruen interpoliert. 0% = reines Lila, 100% =
// reines Gruen, dazwischen linear gemischt.
function farbeFuerProzent(prozent) {
    const anteil = Math.min(Math.max(prozent, 0), 100) / 100;
    const lila = [170, 59, 255];
    const gruen = [34, 197, 94];
    const [r, g, b] = lila.map((start, i) => Math.round(start + (gruen[i] - start) * anteil));
    return `rgb(${r}, ${g}, ${b})`;
}

function ProfilPage(){

    const { eingeloggterName, aktuelleStufe} = useContext(UserContext);

    const [themenFortschritt, setThemenFortschritt] = useState([]);
    const [ladeFehler, setLadeFehler] = useState("");

    useEffect(() => {
        holeThemenFortschritt()
            .then((daten) => setThemenFortschritt(daten))
            .catch((error) => setLadeFehler(error.message));
    }, []);

    // Durchschnitt ueber alle Themen - "wie viel hast du insgesamt drauf",
    // unabhaengig von der einzelnen Stufe/XP.
    const gesamtProzent = themenFortschritt.length === 0
        ? 0
        : Math.round(
            themenFortschritt.reduce((summe, thema) => summe + thema.progress_percent, 0) / themenFortschritt.length
        );

    return (
        <div className="profil-seite">
            <Navbar></Navbar>
            <h1>Profil</h1>

            <div className="profil-inhalt">
                <div className="profil-kopf">
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
                    <div className="profil-info">
                        <p className="profil-name">{eingeloggterName}</p>
                        <span className="profil-stufe">{aktuelleStufe.name}</span>
                    </div>
                    <Link to="/profil/bearbeiten" className="profil-bearbeiten-link">Profil bearbeiten</Link>
                </div>

                <h2>Lernfortschritt</h2>
                {ladeFehler && <p className="auth-fehler">{ladeFehler}</p>}
                {themenFortschritt.length === 0 && !ladeFehler && <p>Lädt...</p>}

                {themenFortschritt.length > 0 && (
                    <>
                        {/* Gesamtfortschritt bewusst als eigener, groesserer Block VOR der
                            Kategorien-Liste - soll als Hauptkennzahl sofort ins Auge fallen,
                            nicht nur die erste Zeile einer gleichförmigen Liste sein. */}
                        <div className="gesamtfortschritt-karte">
                            <div className="gesamtfortschritt-kopf">
                                <span>Gesamtfortschritt</span>
                                <span className="gesamtfortschritt-prozent">{gesamtProzent}%</span>
                            </div>
                            <div className="fortschritt-balken fortschritt-balken-gross">
                                <div
                                    className="fortschritt-balken-fuellung"
                                    style={{ width: `${gesamtProzent}%`, background: farbeFuerProzent(gesamtProzent) }}
                                ></div>
                            </div>
                        </div>

                        <div className="fortschritt-liste">
                            {themenFortschritt.map((thema) => (
                                <div className="fortschritt-zeile" key={thema.id}>
                                    <div className="fortschritt-zeile-kopf">
                                        <span className="fortschritt-name">{thema.name}</span>
                                        <span className="fortschritt-prozent">{thema.progress_percent}%</span>
                                    </div>
                                    <div className="fortschritt-balken">
                                        <div
                                            className="fortschritt-balken-fuellung"
                                            style={{ width: `${thema.progress_percent}%`, background: farbeFuerProzent(thema.progress_percent) }}
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
