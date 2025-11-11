import Card from './Card';

export default function Scores({ players }) {
 
  return (
    <div className="scores-log">
      <table className="table">
        <tbody>
        <tr className="header-row">
          <td>Player</td>
          <td>Round</td>
          <td>Game</td>
          <td>&nbsp;</td>
        </tr>
        
        {players.map((player, i) => (
          <tr key={i} >
            <td>{player.name}</td>
            <td>{player.roundScore}</td>
            <td>{player.totalScore}</td>
            <td>{player.winner ? 'GAME WINNER' : '' }</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}  
