import { Link } from "react-router-dom";

function StartPage() {
    return (
        <div className="start-hero">
            <span className="start-badge">IHK-Prüfungsvorbereitung</span>
            <h1>AP1 &amp; AP2 Trainer</h1>
            <p className="start-tagline">
                Karteikarten pauken, dich im Quiz beweisen und sehen, wo du im Ranking
                gegen deine Kurskollegen stehst.
            </p>
            <Link to="/login" className="cta-button">Los geht's →</Link>

            <ul className="start-features">
                <li><span className="start-feature-icon">🗂️</span>Karteikarten</li>
                <li><span className="start-feature-icon">🧠</span>Quiz</li>
                <li><span className="start-feature-icon">🏆</span>Ranking</li>
            </ul>
        </div>
    )
}

export default StartPage;
