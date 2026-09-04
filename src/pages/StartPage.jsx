import { Link } from "react-router-dom";

function StartPage() {
    return (
        <div className="start-hero">
            <div className="cert-rahmen">
                <div className="cert-siegel">
                    {/* Line-Icon statt Emoji - wirkt hochwertiger/einheitlicher als
                        das Standard-Emoji-Rendering des Betriebssystems. currentColor
                        uebernimmt automatisch die Textfarbe des Kreises drumherum. */}
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3 2 8l10 5 10-5-10-5Z"/>
                        <path d="M6 10.5V16c0 1.2 2.7 3 6 3s6-1.8 6-3v-5.5"/>
                        <path d="M22 8v6"/>
                    </svg>
                </div>
                <span className="start-badge">IHK-Prüfungsvorbereitung</span>
                <h1>AP1 &amp; AP2 Trainer</h1>
                <div className="cert-trennlinie"></div>
                <p className="start-tagline">
                    Bereite dich mit Karteikarten, Quiz und Rankings gezielt auf AP1 und AP2 vor.
                </p>
                <Link to="/login" className="cta-button">Los geht's <span className="cta-pfeil">→</span></Link>
            </div>
        </div>
    )
}

export default StartPage;
