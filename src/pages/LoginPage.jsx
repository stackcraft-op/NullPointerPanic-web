import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage(){
    const [name,setName] = useState("");
    const navigate = useNavigate();

    return(
        <div>
            <h1>Login</h1>
            <input 
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Dein Name"/>
                <p>du tippst gerade: {name}</p>
                <button onClick={() => navigate("/dashboard")}>Einloggen</button>
        </div>
    )
}
export default LoginPage;