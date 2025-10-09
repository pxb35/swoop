import { useRef, useEffect } from 'react'
import './playerStatus.css'
import Card from './Card';
import dealDeck from './dealUtils';

export default function PlayerStatus({ players, playerIndex, name, handleCardClick, handlePlaySelected, selectedCards, handlePickUpPile }) {
  const player = players[0];
  const cardRef = useRef(null);

  console.log('player status');

  if (player) return (
    <div id={"player-" + playerIndex }>
      <strong>{player.name}</strong>
      
      <div className={'row'}>
        <div className={"player-actions"}>
        {player.type === 'human' ? (
          <div>
          <div className="play-selected-cards">
            <button 
              onClick={() => handlePlaySelected(player.type)}
            >Play Selected</button>
          </div>
          <div>
            <button 
              onClick={() => dealDeck(players)}
            >Deal New Game</button>
          </div>
          </div>
        ) : null}      
    </div>
    </div>

      <div className={'player-hand row player reveal-container ' + player.position} >
        <div className="d-flex justify-content-center">      
        {player.hand.map((card, index) => (
          <Card
            key={index}
            rank={card ? player.type !== 'human' ? ' ' : card.rank === 13 ? 'S' : card.rank : 'Empty'}
            selected={selectedCards && selectedCards.includes(card)}
            showEdge={false}
            onClick={() => handleCardClick(card, player.type, "hand", playerIndex)}
            faceDown={false}
            ref={cardRef} 
          />
        ))}
      </div>
    </div>
    <div className="d-flex justify-content-left mystery-faceup-container">
      <div className={'player-mystery row player reveal-container ' + player.position}>
        <div className="d-flex justify-content-center">      
          {player.mystery.map((card, index) => (
            <Card
              key={index}
              rank={card ? selectedCards && selectedCards.includes(card) ? card.rank === 13 ? 'S' : card.rank : '?' : 'Empty'}
              selected={selectedCards && selectedCards.includes(card)}
              showEdge={false}
              nClick={() => handleCardClick(card, player.type, "mystery", playerIndex)}
              faceDown={selectedCards && selectedCards.includes(card) ? false : true}
              ref={cardRef}  
            />        
          ))}
        </div>
      </div>
      <div className={'player-faceup rowplayer reveal-container ' + player.position}>
        <div className="d-flex justify-content-center">      
          {player.faceUp.map((card, index) => (
            <Card
              key={index}
              rank={card ? card.rank === 13 ? 'S' : card.rank : 'Empty'}
              selected={selectedCards && selectedCards.includes(card)}
              showEdge={false}
              onClick={() => handleCardClick(card, player.type, "faceUp", playerIndex)}
              faceDown={false}
              ref={cardRef}  
            />        
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
