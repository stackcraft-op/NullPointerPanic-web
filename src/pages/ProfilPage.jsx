import Navbar from "../components/Navbar";

function ProfilPage({eingeloggterName}){
    const xp = 25;//test
    const avatar = "🧑‍💻";

    const achievements = [
        { id: 1, titel : "Erste Schritte", schwelle: 10, icon: "🥉"},
        { id: 2, titel : "Auf Kurs", schwelle: 20, icon: "🥈"},
        { id: 3, titel : "Prüfungsreif", schwelle: 30, icon: "🥇"},        
    ];

    const stufen = [ 
        { name : "Einsteger", schwelle: 0},
        { name: "Junior", schwelle: 50 },
        { name: "Middle", schwelle: 100 },
        { name: "Senior", schwelle: 200 },
    ]

    return (
        <div>
            <Navbar></Navbar>
            <h1>
                Profil
            </h1>
            <p>{avatar} {eingeloggterName}</p>
            
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