import { useRef } from 'react'
import './playerStatus.css'
import './card.css'
import Card from './Card';

export default function botStaptus({ player, playerIndex, players, selectedCards, handleCardClick, handlePlaySelected }) {

  console.log('bot status playerIndex: ' + playerIndex.toString());

if (player) return (
    <div className={"bot-cards"} id={"player-" + playerIndex}>
      <strong><span>{'B'+ playerIndex.toString()}</span></strong>
      <div className={'player-hand row reveal-container'}>
        <div className="d-flex justify-content-center" >      
        {player.hand.map((card, index) => (
          <Card
            key={index}
            rank={card ? player.type !== 'human' ? ' ' : card.rank === 13 ? 'S' : card.rank : 'Empty'}
            showEdge={false}
            selected={selectedCards && selectedCards.includes(card)}
            faceDown={true}
            deckIndex={card.deckIndex}
            onClick={() => handleCardClick(card, player.type, "hand", playerIndex)}
          />
        ))}
      </div>
    </div>
    <div className="d-flex justify-content-left mystery-faceup-container" >
      <div className={'player-mystery row reveal-container'}>
        {player.mystery.map((card, index) => (
          <div className="player-table-cards">      
            <Card
              key={index}
              rank="?"
              selected={selectedCards && selectedCards.includes(card)}
            showEdge={false}
              faceDown={true}
            deckIndex={card.deckIndex}
            onClick={() => handleCardClick(card, player.type, "hand", playerIndex)}
            
              />        
          </div>
          ))}
      </div>
      <div className={'player-faceup row reveal-container'}>
        {player.faceUp.map((card, index) => (
          <div className="player-table-cards">      
            <Card
              key={index}
              rank={card ? card.rank === 13 ? 'S' : card.rank : 'Empty'}
              selected={selectedCards && selectedCards.includes(card)}
            showEdge={false}
              faceDown={false}
            deckIndex={card.deckIndex}
            onClick={() => handleCardClick(card, player.type, "hand", playerIndex)}
            />        
          </div>
          ))}
      </div>
    </div>
    </div>
  );
}
