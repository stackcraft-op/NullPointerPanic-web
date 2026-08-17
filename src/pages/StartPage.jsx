import { Link } from "react-router-dom";

function StartPage() {
    return (
        <div>
            <h1>IHK (AP1 und AP2 Trainer)</h1>
            <p>Vorbereitung</p>
            <Link to="/login">Los gehts</Link>
        </div>
    )
}

export default StartPage;
