import { useRef } from 'react';
import Card from './Card';

export default function Pile({ pile, handlePickUpPile, players, playerIndex }) {

  return (
    <div className={'pile-cards'}>     
      <div id={'pileId'}>
        {pile.map((card, index) => (
          <Card
              key={index}
              rank={card ? card.rank === 13 ? 'S' : card.rank : 'Empty'}
              selected={false}
              showEdge={pile && index - pile.length < -5 }
              onClick={() => {}}
              deckIndex={card.deckIndex}
            />
        //<Card card={card} key={index} pileKey={pile && index - pile.length < -5 } selectedCards={[]} />        
        ))}
      </div>
      <div className={"pick-up" + (pile && pile.length> 0 && players && players[playerIndex].type === "human" ? ' button-visible' : '')}>
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
