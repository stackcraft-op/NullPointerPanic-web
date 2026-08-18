import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LoginPage({setEingeloggterName}){
    const [name,setName] = useState("");
    const [passwort, setPasswort] = useState("");
    const navigate = useNavigate();

    function einloggen(){
        setEingeloggterName(name);
        navigate("/dashboard");
    }

    return(
        <div>
            <h1>Login</h1>
            <input 
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Dein Name"/>
            <input 
                type="password"
                value={passwort}
                onChange={(event)=> setPasswort(event.target.value)}
                placeholder="Passwort"/>
                <p>du tippst gerade: {name}</p>
                <button onClick={() => einloggen()}>Einloggen</button>
                <p>
                    <Link to="/registrieren">
                    Noch kein Konto? Jetzt registrieren 
                    </Link>
                </p>
        </div>
    )
}
export default LoginPage;