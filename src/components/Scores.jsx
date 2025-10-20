import Card from './Card';

export default function Scores({ players }) {
 
  return (
    <div className="scores-log">
        {players.map((player, i) => (
          <div key={i} className='row'>
            <div className="col-3" >{player.name}</div>
            <div className="col-3" >{player.roundScore}</div>
            <div className="col-3" >{player.totalScore}</div>
            <div className="col-3" >{player.winner ? "GAME WINNER" : ""}</div>
            </div>
        ))}
    </div>
  );
}  
