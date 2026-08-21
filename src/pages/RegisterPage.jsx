import {useState} from "react"
import { useNavigate } from "react-router-dom"
import { registrieren } from "../api";


function RegisterPage(){
    const [benutzername,setBenutzername] = useState("");
    const[passwort, setPasswort] = useState("");
    const[passwortWiederholung, setPasswortWiederholung] = useState("");
    const[email,setEmail] = useState("");
    const[serverFehler, setServerFehler] = useState("");

    const navigate = useNavigate();
    let fehlerText = null;
    if(passwort !== passwortWiederholung && passwortWiederholung !== ""){
        fehlerText = <p>Passwörter stimmen nicht überein</p>
    }

    
    async function kontoErstellen(){
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
        <div>
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
            {serverFehler && <p>{serverFehler}</p>}
            <button onClick={() => kontoErstellen()}>Konto erstellen</button>
        </div>
    )
}
export default RegisterPage;

