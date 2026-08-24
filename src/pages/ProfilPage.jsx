import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
function ProfilPage({eingeloggterName}){
    const xp = 200;//test
   

    const achievements = [
        { id: 1, titel : "Erste Schritte", schwelle: 10, icon: "🥉"},
        { id: 2, titel : "Auf Kurs", schwelle: 20, icon: "🥈"},
        { id: 3, titel : "Prüfungsreif", schwelle: 30, icon: "🥇"},        
    ];

    const stufen = [ 
    { name : "Einsteiger", schwelle: 0, rahmenFarbe: "blue", avatarBild: "/avatare/einsteiger.webp" },
    { name: "Junior", schwelle: 50, rahmenFarbe: "silver", avatarBild: "/avatare/junior.jpeg" },
    { name: "Middle", schwelle: 100, rahmenFarbe: "green", avatarBild: "/avatare/middle.jpg" },
    { name: "Senior", schwelle: 200, rahmenFarbe: "gold", avatarBild: "/avatare/senior.webp" },
]


    const aktuelleStufe = [...stufen].reverse().find((stufe)=> xp >= stufe.schwelle);

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