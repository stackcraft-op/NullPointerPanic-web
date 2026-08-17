function Leaderboard() {
    const spieler = [
        { id: 1, name: "Aylin", xp:420 },
        { id: 2, name: "Ben", xp:380 },
        { id: 3, name: "Chris", xp:260 },
    ];

    return (
        <ul>
            {spieler.map((person) => (
                <li key={person.id}>{person.name} - {person.xp} XP</li>
            ))}
        </ul>
    )
}

export default Leaderboard;
