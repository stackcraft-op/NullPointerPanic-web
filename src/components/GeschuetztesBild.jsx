import { useState, useEffect } from "react";

// ngrok (kostenlose Stufe, unser lokales Backend-Tunneling) zeigt fuer JEDE
// Anfrage ohne den Header "ngrok-skip-browser-warning" eine HTML-Warnseite
// statt der echten Antwort - api.js schickt den Header deshalb bei jedem
// fetch() mit. Ein normales <img src="..."> kann der Browser aber keine
// Custom-Header mitgeben - dort kommt also die HTML-Warnseite als "Bild" an
// (kaputtes Icon), obwohl die Datei serverseitig laengst existiert.
// Workaround: Bild selbst per fetch() (mit Header) laden, als Blob-URL dem
// echten <img> geben. Nur fuer vom Backend/ngrok gelieferte Bilder noetig -
// lokale Assets aus public/ (z.B. die Stufen-Avatare) laufen weiter ganz
// normal ueber <img src="..."> ohne dieses Bauteil.
function GeschuetztesBild({ src, ...imgProps }) {
    const [blobUrl, setBlobUrl] = useState(null);

    useEffect(() => {
        if (!src) {
            setBlobUrl(null);
            return;
        }
        let abgebrochen = false;
        let objektUrl = null;

        fetch(src, { headers: { "ngrok-skip-browser-warning": "true" } })
            .then((response) => response.blob())
            .then((blob) => {
                if (abgebrochen) return;
                objektUrl = URL.createObjectURL(blob);
                setBlobUrl(objektUrl);
            })
            .catch((error) => console.error("Bild laden fehlgeschlagen:", error));

        // Aufraeumen bei Bild-Wechsel/Unmount - sonst sammeln sich Blob-URLs
        // im Speicher an, die nie wieder freigegeben werden.
        return () => {
            abgebrochen = true;
            if (objektUrl) URL.revokeObjectURL(objektUrl);
        };
    }, [src]);

    if (!blobUrl) {
        return null;
    }
    return <img src={blobUrl} {...imgProps}/>;
}

export default GeschuetztesBild;
