import XPBar from "../components/XPBar";
import Navbar from "../components/Navbar";
import Leaderboard from "../components/Leaderboard";

function DashboardPage(){
    const weeklySpieler = [
        { id: 1, name: "Ben", xp: 90 },
        { id: 2, name: "Aylin", xp: 75 },
        { id: 3, name: "Chris", xp: 40 },
    ];

    return(
        <div>
            <Navbar></Navbar>
            <h1>Dashboard</h1>
            <h2>Weakly Ranking</h2>
            <Leaderboard spieler={weeklySpieler}/>
            <XPBar xp={30} maxXp={50} />
        </div>
    )
}

export default DashboardPage;