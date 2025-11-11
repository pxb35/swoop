import Card from './Card';

export default function LogPlays({ moveLog }) {
  return (
    <div className="move-log">
        {moveLog.filter((move, j) => j > (moveLog.length - 10)).map((log, i) => (
           <div key={i}>{log}</div>
        ))}
    </div>
    );
}