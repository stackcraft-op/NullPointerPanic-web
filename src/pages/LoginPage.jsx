import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { einloggen } from "../api";


function LoginPage({setEingeloggterName, ladeProfil, ladeTagesKarten}){
    const [username,setUsername] = useState("");
    const [passwort, setPasswort] = useState("");
    const navigate = useNavigate();
    const [serverFehler,setServerFehler] = useState("");
    async function login(){
        try{
            const daten = await einloggen(username,passwort);
            localStorage.setItem("token", daten.token)
            ladeProfil();
            ladeTagesKarten();
            setEingeloggterName(username);
            navigate("/dashboard")
        }
        catch(fehler){
            setServerFehler(fehler.message)
        }
    }


    return(
        <div className="auth-karte">
            <h1>Login</h1>
            <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Dein Username"/>
            <input
                type="password"
                value={passwort}
                onChange={(event)=> setPasswort(event.target.value)}
                placeholder="Passwort"/>
                {serverFehler && <p className="auth-fehler">{serverFehler}</p>}
                <button onClick={() => login()}>Einloggen</button>
                <p className="auth-link">
                    <Link to="/registrieren">
                    Noch kein Konto? Jetzt registrieren
                    </Link>
                </p>
        </div>
    )
}
export default LoginPage;