import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import UserContext from "../UserContext";
import { holeThemenFortschritt } from "../api";

// Ab welchem Prozentwert welche Farbe - gleiches Ampel-Prinzip wie bei
// Skill-Anzeigen in echten Apps (z.B. LinkedIn-Skill-Balken): rot = grad
// erst angefangen, orange = auf dem Weg, gruen = gut drauf.
function farbeFuerProzent(prozent) {
    if (prozent < 34) return "#ef4444";
    if (prozent < 67) return "#f59e0b";
    return "#22c55e";
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
        <div>
            <Navbar></Navbar>
            <h1>
                Profil
            </h1>
            <img
                src={aktuelleStufe.avatarBild}
                alt={aktuelleStufe.name}
                style={{
                    width : "80px",
                    height : "80px",
                    borderRadius: "50px",
                    border: `4px solid ${aktuelleStufe.rahmenFarbe}`,
                    objectFit: "cover"
                }}
                />
                <p>{eingeloggterName}</p>
            <p>{aktuelleStufe.name}</p>
            <Link to="/profil/bearbeiten">Profil Bearbeiten</Link>

            <h2>Lernfortschritt</h2>
            {ladeFehler && <p className="auth-fehler">{ladeFehler}</p>}
            {themenFortschritt.length === 0 && !ladeFehler && <p>Lädt...</p>}
            <div className="fortschritt-liste">
                {themenFortschritt.length > 0 && (
                    <div className="fortschritt-zeile fortschritt-zeile-gesamt">
                        <span>Gesamt</span>
                        <div className="fortschritt-balken">
                            <div
                                className="fortschritt-balken-fuellung"
                                style={{ width: `${gesamtProzent}%`, background: farbeFuerProzent(gesamtProzent) }}
                            ></div>
                        </div>
                        <span>{gesamtProzent}%</span>
                    </div>
                )}
                {themenFortschritt.map((thema) => (
                    <div className="fortschritt-zeile" key={thema.id}>
                        <span>{thema.name}</span>
                        <div className="fortschritt-balken">
                            <div
                                className="fortschritt-balken-fuellung"
                                style={{ width: `${thema.progress_percent}%`, background: farbeFuerProzent(thema.progress_percent) }}
                            ></div>
                        </div>
                        <span>{thema.progress_percent}%</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProfilPage;
