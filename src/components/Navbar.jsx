import { NavLink } from "react-router-dom";

function Navbar(){
    return (
        <nav>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/ranking">Ranking</NavLink>
            <NavLink to= "/profil">Profil</NavLink>
            <NavLink to="/karteikarten">Karteikarten(feature)</NavLink>
            <NavLink to="/quiz">Quiz</NavLink>
            <NavLink to="/learning">Daily Learning</NavLink>
        </nav>
    )
}

export default Navbar;