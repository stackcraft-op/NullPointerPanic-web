import { Link } from "react-router-dom";

function StartPage() {
    return (
        <div className="start-hero">
            <div className="cert-rahmen">
                <div className="cert-siegel">🎓</div>
                <span className="start-badge">IHK-Prüfungsvorbereitung</span>
                <h1>AP1 &amp; AP2 Trainer</h1>
                <div className="cert-trennlinie"></div>
                <p className="start-tagline">
                    Karteikarten pauken, dich im Quiz beweisen und sehen, wo du im Ranking
                    gegen deine Kurskollegen stehst.
                </p>
                <Link to="/login" className="cta-button">Los geht's →</Link>
            </div>

            <ul className="start-features">
                <li><span className="start-feature-icon">🗂️</span>Karteikarten</li>
                <li><span className="start-feature-icon">🧠</span>Quiz</li>
                <li><span className="start-feature-icon">🏆</span>Ranking</li>
            </ul>
        </div>
    )
}

export default StartPage;
