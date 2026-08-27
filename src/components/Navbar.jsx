import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../UserContext";


function Navbar(){
    const {eingeloggterName, setEingeloggterName, currency, aktuelleStufe, setProfilDaten} = useContext(UserContext)
    const navigate = useNavigate();

    function logout(){
        localStorage.removeItem("token");
        setEingeloggterName("");
        setProfilDaten({
            vorname: "",
            nachname: "",
            fachbereich: "",
            stadt: "",
            bundesland: "",
        });
        navigate("/login");
    }

    return (
        <nav>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/ranking">Ranking</NavLink>
            <NavLink to="/karteikarten">Karteikarten(feature)</NavLink>
            <NavLink to="/quiz">Quiz</NavLink>
            <NavLink to="/wiki">Wiki</NavLink>
            <NavLink to="/learning">Daily Learning</NavLink>
            <NavLink to= "/profil" className="profil-menu">
                <span>{eingeloggterName}</span>
                <span>{aktuelleStufe.name}</span>
                <span>🪙 {currency}</span>
            </NavLink>
            <button onClick={()=> logout()}>Logout</button>
            
        </nav>
    )
}

export default Navbar;