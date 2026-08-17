import Leaderboard from "../components/Leaderboard";
import Navbar from "../components/Navbar";

function RankingPage(){
    return(
        <div>
            <Navbar></Navbar>
            <h1>Leaderboard</h1>
            <Leaderboard/>
        </div>
    )
}
export default RankingPage;