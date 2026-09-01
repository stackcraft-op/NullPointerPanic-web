function Leaderboard({spieler}) {

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
                        <td>{person.username}</td>
                        <td>{person.score}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Leaderboard;
