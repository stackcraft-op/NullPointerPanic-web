import {useState} from "react"
import { useNavigate, Link } from "react-router-dom"
import { registrieren } from "../api";


function RegisterPage(){
    const [benutzername,setBenutzername] = useState("");
    const[passwort, setPasswort] = useState("");
    const[passwortWiederholung, setPasswortWiederholung] = useState("");
    const[email,setEmail] = useState("");
    const[serverFehler, setServerFehler] = useState("");
    const[fachbereich, setFachbereich] = useState("");
    const[bundesland, setBundesland] = useState("");


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
                await registrieren(benutzername,email,passwort,fachbereich,bundesland);

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

            <select
                value={fachbereich}
                onChange={(event) => setFachbereich(event.target.value)}>
                <option value="">Fachbereich auswählen</option>
                <option value="FISI">Systemintegration</option>
                <option value="FIAE">Anwendungsentwicklung</option>
            </select>
            <select
                value={bundesland}
                onChange={(event) => setBundesland(event.target.value)}>
                <option value="">Bundesland auswählen</option>
                <option value="Baden-Württemberg">Baden-Württemberg</option>
                <option value="Bayern">Bayern</option>
                <option value="Berlin">Berlin</option>
                <option value="Brandenburg">Brandenburg</option>
                <option value="Bremen">Bremen</option>
                <option value="Hamburg">Hamburg</option>
                <option value="Hessen">Hessen</option>
                <option value="Mecklenburg-Vorpommern">Mecklenburg-Vorpommern</option>
                <option value="Niedersachsen">Niedersachsen</option>
                <option value="Nordrhein-Westfalen">Nordrhein-Westfalen</option>
                <option value="Rheinland-Pfalz">Rheinland-Pfalz</option>
                <option value="Saarland">Saarland</option>
                <option value="Sachsen">Sachsen</option>
                <option value="Sachsen-Anhalt">Sachsen-Anhalt</option>
                <option value="Schleswig-Holstein">Schleswig-Holstein</option>
                <option value="Thüringen">Thüringen</option>
            </select>
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

