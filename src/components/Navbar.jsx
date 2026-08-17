import { NavLink } from "react-router-dom";

function Navbar(){
    return (
        <nav>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/ranking">Ranking</NavLink>
            <NavLink to= "/profil">Profil</NavLink>
        </nav>
    )
}

export default Navbar;