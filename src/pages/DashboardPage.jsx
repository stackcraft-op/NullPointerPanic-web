import XPBar from "../components/XPBar";
import Navbar from "../components/Navbar";

function DashboardPage(){
    return(
        <div>
            <Navbar></Navbar>
            <h1>Dashboard</h1>
            <XPBar xp={30} maxXp={50} />
        </div>
    )
}

export default DashboardPage;