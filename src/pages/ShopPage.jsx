import { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import UserContext from "../UserContext";
import GeschuetztesBild from "../components/GeschuetztesBild";
import { holeProfil, statusTextAendern, itemKaufen, avatarAusruesten, rahmenAusruesten, bildUrl } from "../api";

// Katalog + Kauf/Ausruesten laufen seit PR #26/#27 im Backend (siehe
// API_CONTRACT.md) ueber echte Endpoints, kein Mock-State mehr. items/
// Auswahl liegen bewusst in App.jsx statt hier lokal, weil ProfilPage.jsx
// den ausgeruesteten Avatar/Rahmen auch braucht (ersetzt dort den
// Stufen-Avatar).
// Rahmen kommen als eigenes transparentes PNG (Ring-Form) statt wie frueher
// in shopItemsMock als Farbe (item.farbe) - deckt sich mit dem echten
// Katalog, der pro Item nur id/type/name/price/image_url/owned liefert,
// kein farbe-Feld. Hier in der Katalog-Vorschau zeigen wir das Rahmenbild
// deshalb direkt (kein Beispiel-Avatar mehr dahinter); wo der Rahmen
// tatsaechlich einen Avatar umrahmt (Profilseite/Navbar), liegt er als
// Overlay ueber dem Avatar-Bild (.avatar-rahmen-overlay, siehe dort).
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

// Eigene, TOP-LEVEL-Komponente statt (wie vorher) innerhalb von ShopPage
// definiert - eine innerhalb einer Komponente definierte Komponente gilt bei
// jedem Render der aeusseren Komponente als neuer Typ, React mountet dann
// ALLE <Karte>-Instanzen komplett neu (nicht nur re-rendert) - z.B. bei
// jedem Tastendruck im "Neuer Status"-Feld. Frueher (reines <img src=...>)
// kaum sichtbar (Browser-Cache faengt's ab), mit GeschuetztesBild (macht
// bei jedem Mount einen echten fetch()) aber ein sichtbares Neuladen aller
// Shop-Bilder bei jeder Nutzereingabe. Deshalb hier auf Props statt
// Closures umgestellt (kaufen/auswaehlen/istAusgeruestet/itemFehler kommen
// jetzt von aussen rein).
function Karte({ item, fehler, ausgeruestet, onKaufen, onAuswaehlen }) {
    return (
        <div className="shop-karte">
            {item.type === "frame" ? (
                <div className="shop-karte-vorschau-rahmen">
                    <GeschuetztesBild src={bildUrl(item.image_url)} alt={item.name} className="shop-karte-vorschau-rahmen-bild"/>
                    {item.abzeichen && <span className="shop-karte-abzeichen">{item.abzeichen}</span>}
                </div>
            ) : (
                <div className="shop-karte-vorschau">
                    <GeschuetztesBild src={bildUrl(item.image_url)} alt={item.name}/>
                </div>
            )}
            <p className="shop-karte-name">{item.name}</p>
            <p className="shop-karte-preis">{CURRENCY_ICON} {item.price}</p>
            {!item.owned && <button onClick={() => onKaufen(item.id)}>Kaufen</button>}
            {item.owned && !ausgeruestet && (
                <button onClick={() => onAuswaehlen(item)}>Auswählen</button>
            )}
            {item.owned && ausgeruestet && (
                <span className="shop-karte-ausgeruestet">Ausgerüstet</span>
            )}
            {fehler && <p className="auth-fehler">{fehler}</p>}
        </div>
    );
}

function ShopPage() {
    const {
        currency, setCurrency,
        shopItems: items, setShopItems: setItems,
        ausgewaehlterAvatarId, setAusgewaehlterAvatarId,
        ausgewaehlterRahmenId, setAusgewaehlterRahmenId,
    } = useContext(UserContext);

    const [statusText, setStatusText] = useState("");
    const [neuerStatusText, setNeuerStatusText] = useState("");
    const [statusFehler, setStatusFehler] = useState("");
    // Fehler pro Item statt ein einzelnes globales Feld - sonst wuerde ein
    // fehlgeschlagener Kauf/Ausruesten-Versuch bei Item A auch unter Item B
    // auftauchen. Key ist die item.id.
    const [itemFehler, setItemFehler] = useState({});

    useEffect(() => {
        holeProfil()
            .then((daten) => setStatusText(daten.status_text || ""))
            .catch((error) => {
                console.error("Status laden fehlgeschlagen:", error);
                setStatusFehler(nutzerFreundlicheFehlermeldung(error, "Status konnte nicht geladen werden."));
            });
    }, []);

    async function kaufen(itemId) {
        try {
            const antwort = await itemKaufen(itemId);
            setCurrency(antwort.currency);
            setItems(items.map((i) =>
                i.id === itemId ? { ...i, owned: true } : i
            ));
            setItemFehler((bisher) => ({ ...bisher, [itemId]: "" }));
        } catch (fehler) {
            console.error("Kauf fehlgeschlagen:", fehler);
            setItemFehler((bisher) => ({
                ...bisher,
                [itemId]: nutzerFreundlicheFehlermeldung(fehler, "Kauf fehlgeschlagen. Bitte erneut versuchen."),
            }));
        }
    }

    async function auswaehlen(item) {
        try {
            if (item.type === "avatar") {
                await avatarAusruesten(item.id);
                setAusgewaehlterAvatarId(item.id);
            } else {
                await rahmenAusruesten(item.id);
                setAusgewaehlterRahmenId(item.id);
            }
            setItemFehler((bisher) => ({ ...bisher, [item.id]: "" }));
        } catch (fehler) {
            console.error("Ausruesten fehlgeschlagen:", fehler);
            setItemFehler((bisher) => ({
                ...bisher,
                [item.id]: nutzerFreundlicheFehlermeldung(fehler, "Ausrüsten fehlgeschlagen. Bitte erneut versuchen."),
            }));
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
                    <div className="shop-status-spalten">
                        <div className="shop-status-spalte">
                            <span className="shop-status-label">Aktuell</span>
                            <p className="shop-status-aktuell">
                                {statusText ? `„${statusText}“` : "Noch kein Status gesetzt"}
                            </p>
                        </div>
                        <div className="shop-status-spalte">
                            <span className="shop-status-label">Status ändern</span>
                            <input
                                type="text"
                                value={neuerStatusText}
                                onChange={(event) => setNeuerStatusText(event.target.value)}
                                placeholder="Neuer Status"/>
                            {statusFehler && <p className="auth-fehler">{statusFehler}</p>}
                            <button onClick={() => statusAendern()}>Für {CURRENCY_ICON} 100 ändern</button>
                        </div>
                    </div>
                </div>

                <h2 className="shop-abschnitt-titel">Avatare</h2>
                <div className="shop-grid">
                    {avatare.map((item) => (
                        <Karte
                            item={item}
                            key={item.id}
                            fehler={itemFehler[item.id]}
                            ausgeruestet={istAusgeruestet(item)}
                            onKaufen={kaufen}
                            onAuswaehlen={auswaehlen}
                        />
                    ))}
                </div>

                <h2 className="shop-abschnitt-titel">Rahmen</h2>
                <div className="shop-grid">
                    {rahmen.map((item) => (
                        <Karte
                            item={item}
                            key={item.id}
                            fehler={itemFehler[item.id]}
                            ausgeruestet={istAusgeruestet(item)}
                            onKaufen={kaufen}
                            onAuswaehlen={auswaehlen}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
export default ShopPage;
