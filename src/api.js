
const API_URL = import.meta.env.VITE_API_URL;

export async function registrieren(username,email,password) {
    const response = await fetch(`${API_URL}/api/register`, {
        method : "POST",
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
        },
        body:JSON.stringify({ username, email, password})
    });

    const daten = await response.json();
    if(!response.ok){
        throw new Error(daten.error);
    }
    return daten;
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

    const daten = await response.json();
    if(!response.ok){
        throw new Error(daten.error);
    }
    return daten;
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

    const daten = await response.json();
    if(!response.ok){
        throw new Error(daten.error)
    }
    return daten;
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

    const daten = await response.json();
    if(!response.ok){
        throw new Error(daten.error);
    }
    return daten;
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

    const daten = await response.json();
    if (!response.ok) {
        throw new Error(daten.error);
    }
    return daten;
}