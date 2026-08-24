import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { einloggen } from "../api";


function LoginPage({setEingeloggterName}){
    const [username,setUsername] = useState("");
    const [passwort, setPasswort] = useState("");
    const navigate = useNavigate();
    const [serverFehler,setServerFehler] = useState("");

    async function login(){
        try{
            const daten = await einloggen(username,passwort);
            localStorage.setItem("token", daten.token)
            setEingeloggterName(username);
            navigate("/dashboard")
        }
        catch(fehler){
            setServerFehler(fehler.message)
        }
    }

    return(
        <div>
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
                <p>du tippst gerade: {username}</p>
                {serverFehler && <p>{serverFehler}</p>}
                <button onClick={() => login()}>Einloggen</button>
                <p>
                    <Link to="/registrieren">
                    Noch kein Konto? Jetzt registrieren 
                    </Link>
                </p>
        </div>
    )
}
export default LoginPage;