import { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import { shopItemsMock } from "../mockData";
import UserContext from "../UserContext";
import { holeProfil, statusTextAendern } from "../api";

// Avatare/Rahmen kommen noch aus mockData.js, weil das Backend dafuer noch
// keinen Endpoint hat (GET /api/shop/items, POST /api/shop/items/:id/purchase
// sind im API_CONTRACT.md vorgeschlagen). Kauf aendert deshalb erstmal nur
// lokalen State, keine echte Persistenz - wird 1:1 gegen echte fetch()-Calls
// getauscht, sobald der Endpoint da ist.
function ShopPage() {
    const { currency, setCurrency } = useContext(UserContext);
    const [items, setItems] = useState(shopItemsMock);

    const [statusText, setStatusText] = useState("");
    const [neuerStatusText, setNeuerStatusText] = useState("");
    const [statusFehler, setStatusFehler] = useState("");

    useEffect(() => {
        holeProfil()
            .then((daten) => setStatusText(daten.status_text || ""))
            .catch((error) => setStatusFehler(error.message));
    }, []);

    function kaufen(itemId) {
        const item = items.find((i) => i.id === itemId);
        if (currency < item.price) {
            return;
        }
        setCurrency(currency - item.price);
        setItems(items.map((i) =>
            i.id === itemId ? { ...i, owned: true } : i
        ));
    }

    async function statusAendern() {
        try {
            const antwort = await statusTextAendern(neuerStatusText);
            setStatusText(antwort.status_text);
            setCurrency(antwort.currency);
            setNeuerStatusText("");
            setStatusFehler("");
        } catch (fehler) {
            setStatusFehler(fehler.message);
        }
    }

    const avatare = items.filter((item) => item.type === "avatar");
    const rahmen = items.filter((item) => item.type === "frame");

    return (
        <div>
            <Navbar />
            <h1>Shop</h1>
            <p>🪙 {currency}</p>

            <div className="status-aendern profil-karte">
                <h2>Status</h2>
                <p>Aktuell: {statusText || "(kein Status gesetzt)"}</p>
                <p>Ändern kostet 100 Currency</p>
                <input
                    type="text"
                    value={neuerStatusText}
                    onChange={(event) => setNeuerStatusText(event.target.value)}
                    placeholder="Neuer Status"/>
                <button onClick={() => statusAendern()}>Ändern</button>
                {statusFehler && <p className="auth-fehler">{statusFehler}</p>}
            </div>

            <h2>Avatare</h2>
            <ul>
                {avatare.map((item) => (
                    <li key={item.id}>
                        {item.image_url} {item.name} – {item.price} Currency
                        {item.owned
                            ? <span> (gekauft)</span>
                            : <button onClick={() => kaufen(item.id)}>Kaufen</button>}
                    </li>
                ))}
            </ul>

            <h2>Rahmen</h2>
            <ul>
                {rahmen.map((item) => (
                    <li key={item.id}>
                        {item.image_url} {item.name} – {item.price} Currency
                        {item.owned
                            ? <span> (gekauft)</span>
                            : <button onClick={() => kaufen(item.id)}>Kaufen</button>}
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default ShopPage;
