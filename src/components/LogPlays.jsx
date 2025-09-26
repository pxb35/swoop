import Card from './Card';

export default function LogPlays({ moveLog }) {
  return (
    <div className="move-log">
      <div>
        {moveLog.slice(-10).map((log, i) => (
           <div key={i}>{log}</div>
        ))}
      </div>
    </div>
    );
}