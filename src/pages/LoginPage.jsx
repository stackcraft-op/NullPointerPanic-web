import { useState } from "react";

function LoginPage(){
    const [name,setName] = useState("");

    return(
        <div>
            <h1>Login</h1>
            <input 
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Dein Name"/>
                <p>du tippst gerade: {name}</p>
        </div>
    )
}
export default LoginPage;