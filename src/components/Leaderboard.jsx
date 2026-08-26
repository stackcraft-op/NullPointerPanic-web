function Leaderboard({spieler}) {
    

    return (
        <table className="leaderboard">
            <thead>
                <th>Platz</th>
                <th>Name</th>
                <th>XP</th>
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
