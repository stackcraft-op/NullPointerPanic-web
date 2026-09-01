
const API_URL = import.meta.env.VITE_API_URL;

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

export async function registrieren(username,email,password) {
    const response = await fetch(`${API_URL}/api/register`, {
        method : "POST",
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
        },
        body:JSON.stringify({ username, email, password})
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
