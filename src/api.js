import { spielerProfilMock } from "./mockData";

const API_URL = import.meta.env.VITE_API_URL;

// image_url kommt vom Server laut API_CONTRACT.md ueberall als relativer
// Pfad (Shop-Katalog UND Profil-Avatar/Rahmen) - Basis-URL muss frontend-
// seitig vorangestellt werden. Schon-absolute URLs (http/https) unveraendert
// durchreichen statt zu verdoppeln - kommt z.B. bei manuell in der DB
// angelegten Test-Items vor (siehe "Roboter"-Item, zeigt auf example.com).
export function bildUrl(pfad) {
    if (!pfad || pfad.startsWith("http://") || pfad.startsWith("https://")) {
        return pfad;
    }
    return `${API_URL}${pfad}`;
}

// Gemeinsame Auswertung fuer jede fetch()-Antwort: faengt zusaetzlich den Fall
// ab, dass der Server (z.B. wegen ngrok/Serverfehler) mal HTML statt JSON
// liefert - ohne das wuerde response.json() mit einem kryptischen
// "Unexpected token <" abstuerzen, statt einer verstaendlichen Fehlermeldung.
async function parseAntwort(response){
    let daten;
    try{
        daten = await response.json();
    } catch {
        throw new Error(`Antwort vom Server war kein gültiges JSON (Status ${response.status})`);
    }
    if(!response.ok){
        throw new Error(daten.error);
    }
    return daten;
}

export async function registrieren(username,email,password,fachbereich,bundesland) {
    const response = await fetch(`${API_URL}/api/register`, {
        method : "POST",
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
        },
        body:JSON.stringify({
            username,
            email,
            password,
            specialization: fachbereich,
            state: bundesland,
        })
    });

    return parseAntwort(response);
}


export async function einloggen(username, password){
    const response = await fetch(`${API_URL}/api/login`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify({username,password})
    });

    return parseAntwort(response);
}

export async function profilSpeichern(profilDaten){
    const token = localStorage.getItem("token");
    const body = {
        first_name: profilDaten.vorname,
        last_name: profilDaten.nachname,
        specialization: profilDaten.fachbereich,
        city: profilDaten.stadt,
        state: profilDaten.bundesland,
    };
    const response = await fetch(`${API_URL}/api/profile`, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify(body),
    });

    return parseAntwort(response);
}

export async function holeTagesKarten() {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/flashcards/daily`,{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true"
        },
    })

    return parseAntwort(response);
}

export async function holeProfil() {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/profile`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true"
        },
    });

    return parseAntwort(response);
}

export async function holeAlleKarteikarten() {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/flashcards`,{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true"
        },
    })

    return parseAntwort(response);
}

export async function beantworten(answerOptionId) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/answer_options/${answerOptionId}/submit`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true"
        },
    })

    return parseAntwort(response);
}

export async function holeRankingGesamt() {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/rankings/overall`,{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true"
        },
    })

    return parseAntwort(response);
}

export async function holeRankingNachBundesland(bundesland) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/rankings/by_state?state=${encodeURIComponent(bundesland)}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true"
        },
    })

    return parseAntwort(response);
}

export async function holeRankingWoche() {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/rankings/weekly`,{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true"
        },
    })

    return parseAntwort(response);
}

// TODO: Backend-Endpoint GET /api/users/:id/profile ist noch nicht gebaut
// (spezifiziert in API_CONTRACT.md, PR #36) - bis dahin liefert diese
// Funktion Mock-Daten (spielerProfilMock in mockData.js). Nimmt bewusst
// "username" statt "id" entgegen, weil die echten Ranking-Endpunkte aktuell
// noch kein id-Feld liefern (siehe Contract). Async, obwohl (noch) kein
// echtes fetch() drinsteckt - Aufrufstellen (RankingPage.jsx) behandeln das
// schon jetzt wie jeden anderen API-Call (.then()/.catch()), damit sich beim
// Umstieg auf den echten Endpoint nichts an den Aufrufstellen ändern muss.
// Umstieg dann: fetch(`${API_URL}/api/users/${id}/profile`) + parseAntwort(),
// gleiches Muster wie holeProfil() oben.
export async function holeSpielerProfil(username) {
    return spielerProfilMock[username] ?? {
        id: null,
        username,
        status_text: null,
        avatar: null,
        frame: null,
        overall_progress_percent: 0,
    };
}

export async function holeThemenFortschritt() {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/topics/progress`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true"
        },
    })

    return parseAntwort(response);
}

export async function holeKartenFuerThema(themaId) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/topics/${themaId}/flashcards`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true"
        },
    })

    return parseAntwort(response);
}

export async function karteAbhaken(flashcardId) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/flashcards/${flashcardId}/check`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true"
        },
    })

    return parseAntwort(response);
}

export async function starteQuiz(themaId) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/quiz`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify({ topic_id: themaId }),
    })

    return parseAntwort(response);
}

export async function quizAntwortEinreichen(answerOptionId) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/answer_options/${answerOptionId}/quiz_submit`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true"
        },
    })

    return parseAntwort(response);
}

export async function holeShopItems() {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/shop/items`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true"
        },
    })

    return parseAntwort(response);
}

export async function itemKaufen(itemId) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/shop/items/${itemId}/purchase`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true"
        },
    })

    return parseAntwort(response);
}

// Zwei eigene Funktionen statt einer gemeinsamen mit {avatar_id, frame_id} -
// laut API_CONTRACT.md sind beide Felder "unabhaengig voneinander setzbar",
// beim Ausruesten eines Avatars soll also nicht versehentlich frame_id mit
// abgeschickt (und z.B. auf null gesetzt) werden, und umgekehrt.
export async function avatarAusruesten(avatarId) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/profile`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify({ avatar_id: avatarId }),
    });

    return parseAntwort(response);
}

export async function rahmenAusruesten(rahmenId) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/profile`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify({ frame_id: rahmenId }),
    });

    return parseAntwort(response);
}

export async function statusTextAendern(statusText){
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/profile/status_text`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify({ status_text: statusText }),
    });

    return parseAntwort(response);
}
