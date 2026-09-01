import {useState} from "react"
import { useNavigate, Link } from "react-router-dom"
import { registrieren } from "../api";


function RegisterPage(){
    const [benutzername,setBenutzername] = useState("");
    const[passwort, setPasswort] = useState("");
    const[passwortWiederholung, setPasswortWiederholung] = useState("");
    const[email,setEmail] = useState("");
    const[serverFehler, setServerFehler] = useState("");

    const navigate = useNavigate();
    const [versucht, setVersucht] = useState(false);
    let fehlerText = null;
    if(versucht && passwort !== passwortWiederholung){
        fehlerText = <p className="auth-fehler">Passwörter stimmen nicht überein</p>
    }


    async function kontoErstellen(){
            setVersucht(true);
            if(passwort !== passwortWiederholung){
                return
            }
            try {
                await registrieren(benutzername,email,passwort);
                navigate("/login");
            } catch(fehler){
                setServerFehler(fehler.message);
            }
        }
    

    return(
        <div className="auth-karte">
            <h1>Konto erstellen</h1>
            <input
                type = "text"
                value={benutzername}
                onChange={(event)=> setBenutzername(event.target.value)}
                placeholder="Benutzername"/>
            <input
                type ="email"
                value = {email}
                onChange={(event)=> setEmail
                (event.target.value)}
                placeholder="Email"/>
            <input
                type = "password"
                value={passwort}
                onChange={(event) => setPasswort(event.target.value)}
                placeholder="Passwort"/>
            <input
                type = "password"
                value={passwortWiederholung}
                onChange={(event) => setPasswortWiederholung(event.target.value)}
                placeholder="Passwort wiederholen"/>
            {fehlerText}
            {serverFehler && <p className="auth-fehler">{serverFehler}</p>}
            <button onClick={() => kontoErstellen()}>Konto erstellen</button>
            <p className="auth-link">
                <Link to="/login">Schon ein Konto? Zurück zum Login</Link>
            </p>
        </div>
    )
}
export default RegisterPage;

