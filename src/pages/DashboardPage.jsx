import XPBar from "../components/XPBar";

function DashboardPage(){
    return(
        <div>
            <h1>Dashboard</h1>
            <XPBar xp={30} maxXp={50} />
        </div>
    )
}

export default DashboardPage;