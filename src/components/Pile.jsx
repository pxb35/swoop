import { useRef } from 'react';
import Card from './Card';

export default function Pile({ pile, handlePickUpPile, playerIndex, isHuman }) {
  
  const startX = useRef(null);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const deltaX = Math.abs(startX.current - endX);

    if (deltaX > 50) {
      handlePickUpPile(playerIndex); // swipe up to pick up pile
    }
  };

  const handlePointerDown = (e) => {
    startX.current = e.clientX;
  };

  const handlePointerUp = (e) => {
    const deltaX = Math.abs(startX.current - e.clientX);
    if (deltaX > 50) handlePickUpPile(playerIndex);
  };

  return (
  <div className={'pile-cards'}
    onTouchStart={handleTouchStart}
    onTouchEnd={handleTouchEnd}
    onPointerDown={handlePointerDown}
    onPointerUp={handlePointerUp}
  >     
  <div>
    {pile.map((card, index) => (
      <Card
            key={index}
            rank={card ? card.rank === 13 ? 'S' : card.rank : 'Empty'}
            selected={false}
            showEdge={pile && index - pile.length < -5 }
            onClick={() => {}}
          />
      //<Card card={card} key={index} pileKey={pile && index - pile.length < -5 } selectedCards={[]} />        
    ))}
  </div>
  <div className={"pick-up" + (pile && pile.length> 0 && isHuman ? ' button-visible' : '')}>
    <button onClick={() => handlePickUpPile(playerIndex)}>Pick Up Pile</button>
  </div>
  </div>   
  );
}
/*
function PileZone({ pile, onPickUp }) {
   return (
    <div
      className="pile-zone"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {pile.map((card, i) => (
        <div key={i} className="pile-card">{card.rank}</div>
      ))}
    </div>
  );
}
  */
