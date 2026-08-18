function Leaderboard({spieler}) {
    

    return (
        <ul>
            {spieler.map((person) => (
                <li key={person.id}>{person.name} - {person.xp} XP</li>
            ))}
        </ul>
    )
}

export default Leaderboard;
