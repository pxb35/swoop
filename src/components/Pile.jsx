export default function Pile({ topCard, moveLog }) {
  return (
    <div className="pile">
      <div className="top-card">
        {topCard ? (topCard.rank === 13 ? '🃏' : topCard.rank) : 'Empty'}
      </div>
      <div className="move-log">
        {moveLog.slice(-3).map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </div>
    </div>
  );
}
