
const API_URL = import.meta.env.VITE_API_URL;

export async function registrieren(username,email,password) {
    const response = await fetch(`${API_URL}/api/register`, {
        method : "POST",
        headers: {"Content-Type": "application/json"},
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
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username,password})
    });

    const daten = await response.json();
    if(!response.ok){
        throw new Error(daten.error);
    }
    return daten;
}

export async function profilSpeichern(profilDaten){
    const response = await fetch(`${API_URL}/api/profile`, {
        method: "PATCH",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(profilDaten),
    });

    const daten = await response.json();
    if(!response.ok){
        throw new Error(daten.error)
    }
    return daten;
}