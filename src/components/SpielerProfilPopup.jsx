import { prozentSicher, farbeFuerProzent } from "../utils";

// Modal fuers Ranking: zeigt Avatar+Rahmen+Statustext+Gesamtfortschritt
// eines ANDEREN Spielers, geoeffnet per Klick auf den Username in
// Leaderboard.jsx. Bewusst kein eigener useEffect/Ladezustand hier -
// RankingPage.jsx laedt die Daten (holeSpielerProfil) und reicht sie fertig
// rein, diese Komponente ist nur fuers Anzeigen zustaendig (gleiche
// Aufteilung wie z.B. bei Leaderboard.jsx).
//
// avatar/frame kommen (noch) als lokale Mock-Pfade (public/avatare/,
// public/rahmen-vorschlag/) und werden deshalb direkt per <img> gerendert.
// Sobald holeSpielerProfil() auf den echten Endpoint umgestellt ist, liefert
// der Server echte, vom Backend gehostete Bilder - dann muessen avatarBild/
// spieler.frame.image_url wie in ProfilPage.jsx durch bildUrl() +
// GeschuetztesBild ersetzt werden (ngrok-Workaround, siehe dort).
function SpielerProfilPopup({ spieler, onSchliessen }) {
    // Fallback fuer "kein Avatar ausgeruestet" - anders als im eigenen Profil
    // (ProfilPage.jsx) kennen wir hier keine Stufe/XP des fremden Spielers
    // (bewusst nicht im Contract, siehe API_CONTRACT.md), darum ein neutraler
    // Platzhalter statt eines stufenabhaengigen Bilds.
    const avatarBild = spieler.avatar?.image_url ?? "/avatare/einsteiger.webp";

    return (
        <div className="spieler-popup-hintergrund" onClick={onSchliessen}>
            {/* stopPropagation, sonst schliesst ein Klick INS Popup (z.B. auf
                den Statustext) das Popup ueber den Hintergrund-Handler mit */}
            <div className="spieler-popup profil-karte" onClick={(event) => event.stopPropagation()}>
                <button
                    type="button"
                    className="spieler-popup-schliessen"
                    onClick={onSchliessen}
                    aria-label="Popup schließen"
                >
                    ✕
                </button>

                <div className="profil-avatar-shop">
                    <div className="profil-avatar-shop-kreis">
                        <img src={avatarBild} alt={spieler.username} />
                    </div>
                    {spieler.frame && (
                        <img src={spieler.frame.image_url} alt="" className="avatar-rahmen-overlay" />
                    )}
                </div>

                <p className="profil-name">{spieler.username}</p>
                {spieler.status_text && <p className="profil-status">„{spieler.status_text}“</p>}

                <div className="gesamtfortschritt-kopf">
                    <span>Gesamtfortschritt</span>
                    <span className="gesamtfortschritt-prozent">{spieler.overall_progress_percent}%</span>
                </div>
                <div className="fortschritt-balken fortschritt-balken-gross">
                    <div
                        className="fortschritt-balken-fuellung"
                        style={{
                            width: `${prozentSicher(spieler.overall_progress_percent)}%`,
                            background: farbeFuerProzent(spieler.overall_progress_percent),
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default SpielerProfilPopup;
