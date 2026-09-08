// onSpielerKlick ist optional - Leaderboard wird an mehreren Stellen genutzt
// (aktuell nur RankingPage.jsx), nicht ueberall soll ein Klick auf den Namen
// zwingend ein Popup oeffnen.
function Leaderboard({spieler, onSpielerKlick}) {

    return (
        <table className="leaderboard">
            <thead>
                <tr>
                    <th>Platz</th>
                    <th>Name</th>
                    <th>Punkte</th>
                </tr>
            </thead>

            <tbody>
                {spieler.map((person)=>(
                    <tr key={person.username}>
                        <td>#{person.rank}</td>
                        <td>
                            {onSpielerKlick ? (
                                <button
                                    type="button"
                                    className="leaderboard-name"
                                    onClick={() => onSpielerKlick(person)}
                                >
                                    {person.username}
                                </button>
                            ) : (
                                person.username
                            )}
                        </td>
                        <td>{person.score}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Leaderboard;
