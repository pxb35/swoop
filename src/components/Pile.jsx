import Card from './Card';
import './Pile.css';

export default function Pile({ pile, UpPile, players, playerIndex, handlePickUpPile }) {
  const blankArr = [];
  return (
    <>
    <div className="pile-button row">
      <div className={"pick-up col-12" + (pile && pile.length> 0 && players && players[playerIndex].type === "human" ? ' button-visible' : '')}>
        <button className="btn btn-primary" onClick={() => handlePickUpPile(playerIndex, blankArr)}>Pick&nbsp;Up&nbsp;Pile</button>
      </div>
    </div> 
    <div className={'pile-cards row'}>
      <div id={'pileId'} className={'col-12'}>
        {pile.map((card, index) => (
          <Card
              key={index}
              rank={card ? card.rank === 13 ? 'S' : card.rank : 'Empty'}
              selected={false}
              showEdge={ pile && pile.length > 0 && (pile.length - index > 4 || card.rank !== pile[pile.length-1].rank )}
              onClick={() => {}}
              deckIndex={card.deckIndex}
            />   
        ))}
      </div>
    </div>
    </>  
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
