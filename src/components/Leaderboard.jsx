function Leaderboard({spieler}) {
    

    return (
        <table className="leaderboard">
            <thead>
                <tr>
                <th>Platz</th>
                    <th>Name</th>
                    <th>XP</th>
                </tr>
            </thead>

            <tbody>
                {spieler.map((person,index)=>(
                    <tr key={person.id}>
                        <td>#{index + 1}</td>
                        <td>{person.name}</td>
                        <td>{person.xp}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Leaderboard;
