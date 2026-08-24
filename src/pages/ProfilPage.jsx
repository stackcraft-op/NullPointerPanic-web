import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../UserContext";

function ProfilPage(){
    
    const { eingeloggterName, aktuelleStufe} = useContext(UserContext);
    const xp = 200;
   

    const achievements = [
        { id: 1, titel : "Erste Schritte", schwelle: 10, icon: "🥉"},
        { id: 2, titel : "Auf Kurs", schwelle: 20, icon: "🥈"},
        { id: 3, titel : "Prüfungsreif", schwelle: 30, icon: "🥇"},        
    ];

    




    return (
        <div>
            <Navbar></Navbar>
            <h1>
                Profil
            </h1>
            <img
                src={aktuelleStufe.avatarBild}
                alt={aktuelleStufe.name}
                style={{
                    width : "80px",
                    height : "80px",
                    borderRadius: "50px",
                    border: `4px solid ${aktuelleStufe.rahmenFarbe}`,
                    objectFit: "cover"
                }}
                />
                <p>{eingeloggterName}</p>
            <p>{aktuelleStufe.name}</p>
            <Link to="/profil/bearbeiten">Profil Bearbeiten</Link>
            <ul>
                {achievements.map((achievement)=>(
                    <li key={achievement.id}>{achievement.titel}(ab {achievement.schwelle} XP)-{" "}
                    {xp >= achievement.schwelle ? "✅ freigeschaltet" : "🔒 gesperrt"}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProfilPage;