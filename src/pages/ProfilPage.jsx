import Navbar from "../components/Navbar";

function ProfilPage(){
    const xp = 25;//test
    const name = "Alex";
    const avatar = "🧑‍💻";

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
            <p>{avatar} {name}</p>
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