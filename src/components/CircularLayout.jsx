import PlayerStatus from "./PlayerStatus";

export default function CircularLayout({ players, selectedCards, handleCardClick, handlePlaySelected, handlePickUpPile }) {
  const count = players.length;
  const radius = 320; // distance from center

  return (
    <div>
    <div className="circle-container">
      {players.map((player, i) => {
        const angle = (((count - i) / count) * 360 + 270) % 360; // 90° = bottom
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);

        return (
          <div
            key={i}
            className="circle-item"
            style={{
              transform: `translate(${x}px, ${-y}px)`,
            }}
          >
            {player.name || `P${i}`}
           <PlayerStatus
              playerIndex={i}
              key={i}
              player={player}
              hand={player.hand}
              faceUp={player.faceUp}
              selectedCards={selectedCards}
              handleCardClick={handleCardClick}
              handlePlaySelected={handlePlaySelected}
              handlePickUpPile={handlePickUpPile}
            />
          </div>
        );
      })}
    </div>
    </div>
  );
}
