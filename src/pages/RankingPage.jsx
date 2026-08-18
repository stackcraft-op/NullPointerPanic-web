import Leaderboard from "../components/Leaderboard";
import Navbar from "../components/Navbar";

function RankingPage(){

    const weeklySpieler = [
        { id: 1, name: "Ben", xp: 90 },
        { id: 2, name: "Aylin", xp: 75 },
        { id: 3, name: "Chris", xp: 40 },
    ];
    const globalSpieler = [
        { id: 1, name: "Aylin", xp: 420 },
        { id: 2, name: "Ben", xp: 380 },
        { id: 3, name: "Chris", xp: 260 },
    ]

    return(
        <div>
            <Navbar></Navbar>
            <h1>Ranking</h1>
            <h2>Wöchentlich</h2>
            <Leaderboard spieler={weeklySpieler}/>
            <h2>Gesamt</h2>
            <Leaderboard spieler={globalSpieler} />
        </div>
    )
}
export default RankingPage;