import { prozentSicher, farbeFuerProzent } from "../utils";
import { bildUrl } from "../api";
import GeschuetztesBild from "./GeschuetztesBild";

// Modal fuers Ranking: zeigt Avatar+Rahmen+Statustext+Gesamtfortschritt
// eines ANDEREN Spielers, geoeffnet per Klick auf den Username in
// Leaderboard.jsx. Bewusst kein eigener useEffect/Ladezustand hier -
// RankingPage.jsx laedt die Daten (holeSpielerProfil) und reicht sie fertig
// rein, diese Komponente ist nur fuers Anzeigen zustaendig (gleiche
// Aufteilung wie z.B. bei Leaderboard.jsx).
//
// avatar/frame kommen vom Server (GET /api/users/:id/profile) als relativer
// Pfad, gleiches Muster wie beim eigenen Profil - GeschuetztesBild statt
// <img> noetig, weil ngrok ohne Custom-Header eine HTML-Warnseite statt des
// Bilds liefert (siehe ProfilPage.jsx/GeschuetztesBild.jsx fuer Details).
function SpielerProfilPopup({ spieler, onSchliessen }) {
    // Fallback fuer "kein Avatar ausgeruestet" - anders als im eigenen Profil
    // (ProfilPage.jsx) kennen wir hier keine Stufe/XP des fremden Spielers
    // (bewusst nicht im Contract, siehe API_CONTRACT.md), darum der
    // Einsteiger-Avatar als fester Standard (08.09 mit Kollegen abgesprochen:
    // wird spaeter der serverseitige Standardavatar fuer neue Accounts, bis
    // dahin nur lokaler Platzhalter hier) - kein GeschuetztesBild noetig,
    // liegt in public/, kein ngrok involviert.
    const avatarBild = spieler.avatar && bildUrl(spieler.avatar.image_url);

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
                        {avatarBild ? (
                            <GeschuetztesBild src={avatarBild} alt={spieler.username} />
                        ) : (
                            <img src="/avatare/einsteiger.webp" alt={spieler.username} />
                        )}
                    </div>
                    {spieler.frame && (
                        <GeschuetztesBild src={bildUrl(spieler.frame.image_url)} alt="" className="avatar-rahmen-overlay" />
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
