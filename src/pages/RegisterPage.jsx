import {useState} from "react"
import { useNavigate } from "react-router-dom"

function RegisterPage(){
    const [benutzername,setBenutzername] = useState("");
    const[passwort, setPasswort] = useState("");
    const[passwortWiederholung, setPasswortWiederholung] = useState("");
    const navigate = useNavigate();
    let fehlerText = null;
    if(passwort !== passwortWiederholung && passwortWiederholung !== ""){
        fehlerText = <p>Passwörter stimmen nicht überein</p>
    }

    function kontoErstellen(){
        if(passwort !== passwortWiederholung){
            return; 
        }
        navigate("/login"); 
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
            <button onClick={() => kontoErstellen()}>Konto erstellen</button>
        </div>
    )
}
export default RegisterPage;

