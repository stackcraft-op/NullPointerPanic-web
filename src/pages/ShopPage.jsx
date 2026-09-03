import { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import { shopItemsMock } from "../mockData";
import UserContext from "../UserContext";
import { holeProfil, statusTextAendern } from "../api";

// Avatare/Rahmen kommen noch aus mockData.js, weil das Backend dafuer noch
// keinen Endpoint hat (GET /api/shop/items, POST /api/shop/items/:id/purchase
// sind im API_CONTRACT.md vorgeschlagen). Kauf aendert deshalb erstmal nur
// lokalen State, keine echte Persistenz - wird 1:1 gegen echte fetch()-Calls
// getauscht, sobald der Endpoint da ist. Gleiches gilt fuers "Ausruesten" -
// welcher Avatar/Rahmen aktiv ist, wird erst dauerhaft, sobald PATCH
// /api/profile die Felder avatar_id/frame_id kennt.
// Ein Symbol fuer Currency, ueberall im Shop gleich (Guthaben-Badge UND
// Produktpreise) - vorher stand oben ein Muenz-Emoji, unten "Currency" als
// Wort, das wirkte inkonsistent.
const CURRENCY_ICON = "🌑";

// api.js wirft zwei Arten von Fehlern (siehe parseAntwort()): eine echte,
// verstaendliche Server-Meldung ("Nicht genug Currency") - die zeigen wir
// 1:1 an - oder einen technischen Fall wie "kein gueltiges JSON" (z.B. bei
// einem 500er/Internal Server Error, wo der Server gar kein JSON liefert).
// Letzteres soll der Nutzer nicht im Klartext sehen, deshalb hier durch
// eine freundliche Standardmeldung ersetzt.
function nutzerFreundlicheFehlermeldung(fehler, standardText) {
    if (!fehler.message || fehler.message.includes("JSON")) {
        return standardText;
    }
    return fehler.message;
}

function ShopPage() {
    const { currency, setCurrency } = useContext(UserContext);
    const [items, setItems] = useState(shopItemsMock);
    const [ausgewaehlterAvatarId, setAusgewaehlterAvatarId] = useState(null);
    const [ausgewaehlterRahmenId, setAusgewaehlterRahmenId] = useState(null);

    const [statusText, setStatusText] = useState("");
    const [neuerStatusText, setNeuerStatusText] = useState("");
    const [statusFehler, setStatusFehler] = useState("");

    useEffect(() => {
        holeProfil()
            .then((daten) => setStatusText(daten.status_text || ""))
            .catch((error) => {
                console.error("Status laden fehlgeschlagen:", error);
                setStatusFehler(nutzerFreundlicheFehlermeldung(error, "Status konnte nicht geladen werden."));
            });
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

    function auswaehlen(item) {
        if (item.type === "avatar") {
            setAusgewaehlterAvatarId(item.id);
        } else {
            setAusgewaehlterRahmenId(item.id);
        }
    }

    function istAusgeruestet(item) {
        return item.type === "avatar"
            ? item.id === ausgewaehlterAvatarId
            : item.id === ausgewaehlterRahmenId;
    }

    async function statusAendern() {
        try {
            const antwort = await statusTextAendern(neuerStatusText);
            setStatusText(antwort.status_text);
            setCurrency(antwort.currency);
            setNeuerStatusText("");
            setStatusFehler("");
        } catch (fehler) {
            console.error("Status ändern fehlgeschlagen:", fehler);
            setStatusFehler(nutzerFreundlicheFehlermeldung(fehler, "Status konnte nicht geändert werden. Bitte erneut versuchen."));
        }
    }

    // Eine Karte fuer Avatare UND Rahmen - unterscheiden sich nur in der
    // Vorschau (Rahmen zeigt einen farbigen Ring um einen Avatar-Platzhalter,
    // Avatar zeigt sich selbst) und in den drei moeglichen Button-Zustaenden.
    function Karte({ item }) {
        return (
            <div className="shop-karte">
                {item.type === "frame" ? (
                    <div className="shop-karte-vorschau-rahmen" style={{ borderColor: item.farbe }}>
                        <span>{item.image_url}</span>
                    </div>
                ) : (
                    <div className="shop-karte-vorschau">{item.image_url}</div>
                )}
                <p className="shop-karte-name">{item.name}</p>
                <p className="shop-karte-preis">{CURRENCY_ICON} {item.price}</p>
                {!item.owned && <button onClick={() => kaufen(item.id)}>Kaufen</button>}
                {item.owned && !istAusgeruestet(item) && (
                    <button onClick={() => auswaehlen(item)}>Auswählen</button>
                )}
                {item.owned && istAusgeruestet(item) && (
                    <span className="shop-karte-ausgeruestet">Ausgerüstet</span>
                )}
            </div>
        );
    }

    const avatare = items.filter((item) => item.type === "avatar");
    const rahmen = items.filter((item) => item.type === "frame");

    return (
        <div>
            <Navbar />
            <h1 style={{ textAlign: "center" }}>Shop</h1>

            <div className="shop-inhalt">
                <div style={{ textAlign: "center" }}>
                    <div className="shop-guthaben">
                        <span className="shop-guthaben-label">Dein Guthaben</span>
                        <span className="shop-guthaben-wert">{CURRENCY_ICON} {currency}</span>
                    </div>
                </div>

                <div className="shop-status-karte profil-karte">
                    <h2>Dein Status</h2>
                    <p className="shop-status-aktuell">
                        {statusText ? `„${statusText}“` : "Noch kein Status gesetzt"}
                    </p>
                    <div className="shop-status-eingabe">
                        <input
                            type="text"
                            value={neuerStatusText}
                            onChange={(event) => setNeuerStatusText(event.target.value)}
                            placeholder="Neuer Status"/>
                        <button onClick={() => statusAendern()}>Ändern</button>
                    </div>
                    {statusFehler && <p className="auth-fehler">{statusFehler}</p>}
                    <p className="shop-status-preis">Ändern kostet {CURRENCY_ICON} 100</p>
                </div>

                <h2 className="shop-abschnitt-titel">Avatare</h2>
                <div className="shop-grid">
                    {avatare.map((item) => <Karte item={item} key={item.id}/>)}
                </div>

                <h2 className="shop-abschnitt-titel">Rahmen</h2>
                <div className="shop-grid">
                    {rahmen.map((item) => <Karte item={item} key={item.id}/>)}
                </div>
            </div>
        </div>
    );
}
export default ShopPage;
