import React from 'react';
import Card from './Card';
import './cardTable.css';
/*
const players = [
  { name: 'Alice', position: 'top', faceUp: [3, 7], faceDown: [null, null] },
  { name: 'Bob', position: 'left', faceUp: [2, 5], faceDown: [null, null] },
  { name: 'Charlie', position: 'right', faceUp: [4, 6], faceDown: [null, null] },
  { name: 'Pete', position: 'bottom', faceUp: [1, 11], faceDown: [null, null] },
];
*/
function Table({ players, pile }) {
  return (
    <div className="table">
      <div className="player-row top">
        {players.slice(0, 2).map((p, i) => <PlayerZone key={i} player={p} />)}
      </div>

      <div className="player-row center">
        <PileZone pile={pile} />
      </div>

      <div className="player-row bottom">
        {players.slice(2).map((p, i) => <PlayerZone key={i + 2} player={p} />)}
      </div>
    </div>
  );
}

function PlayerZone({ player }) {
    return (        
        <div className={`player-zone ${player.position}`}>  
            <div className="player-name">{player.name}</div>
            <div className="face-up-cards">
                {player.faceUp.map((card, index) => ( 
                    <Card
                        key={index}
                        rank={card ? card.rank === 13 ? 'S' : card.rank : 'Empty'}
                        selected={false}
                        showEdge={false}
                        onClick={() => {}}
                    />
                ))}
            </div>
            <div className="face-down-cards">     
                {player.mystery.map((card, index) => (
                    <Card
                        key={index}
                        rank={card ? '?' : 'Empty'}
                        selected={false}
                        showEdge={false}
                        onClick={() => {}}
                    />
                    //<Card card={card} key={index} selectedCards={[]} />
                ))} 
            </div>
        </div>      
    );   
}

function PileZone({ pile }) {
    return (
        <div className="pile-zone">
            <div className="pile-label">Pile</div>  
            <div className="pile-cards">
                {pile !== undefined ? pile.map((card, index) => (
                    <Card
                        key={index}
                        rank={card ? card.rank === 13 ? 'S' : card.rank : 'Empty'}
                        selected={false}        
                        showEdge={pile && index - pile.length < -5 }
                        onClick={() => {}}
                    />
                )) : 'No cards in pile'}
                {/* <Card card={card} key={index} pileKey={pile && index - pile.length < -5 } selectedCards={[]} />         */}
            </div>
        </div>
    );
}

function CardTable({ players, pile }) {
  return (
    <div className="card-table">    
        <Table players={players} pile={pile} />
    </div>
    );
}

export default CardTable;
