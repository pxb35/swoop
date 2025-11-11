import { useRef } from 'react'
import './playerStatus.css'
import './card.css'
import Card from './Card';

export default function botStatus({ player, playerIndex, players, selectedCards, handleCardClick, handlePlaySelected }) {

if (player) return (
    <div className={"bot-cards"} id={"player-" + playerIndex}>
      <strong><span>{'B'+ playerIndex.toString()}</span></strong>
      <div className={'player-hand row reveal-container'}>
        <div className="d-flex justify-content-center" >      
        {player.hand.map((card, index) => (
          <Card
            key={card.deckIndex}
            rank={card ? selectedCards && selectedCards.includes(card) ? card.rank === 13 ? 'S' : card.rank : '' : 'Empty'}
            showEdge={false}
            faceDown={!(selectedCards && selectedCards.includes(card))}
            deckIndex={card.deckIndex}
            selected={selectedCards && selectedCards.includes(card)}
            onClick={() => handleCardClick(card, player)}
          />
        ))}
      </div>
    </div>
    <div className="d-flex justify-content-left mystery-faceup-container" >
      <div className={'player-mystery row reveal-container'}>
        {player.mystery.map((card, index) => (
          <div className="player-table-cards" key={card.deckIndex} >      
            <Card
              key={card.deckIndex}
              rank={card ? selectedCards && selectedCards.includes(card) ? card.rank === 13 ? 'S' : card.rank : '?' : 'Empty'}
              showEdge={false}
              faceDown={!(selectedCards && selectedCards.includes(card))}
              deckIndex={card.deckIndex}
              selected={selectedCards && selectedCards.includes(card)}
              onClick={() => handleCardClick(card, player)}
              />        
          </div>
          ))}
      </div>
      <div className={'player-faceup row reveal-container'}>
        {player.faceUp.map((card, index) => (
          <div className="player-table-cards" key={card.deckIndex} >      
            <Card
              key={card.deckIndex}
            rank={card ? card.rank === 13 ? 'S' : card.rank : 'Empty'}
            showEdge={false}
            faceDown={false}
            deckIndex={card.deckIndex}
            selected={selectedCards && selectedCards.includes(card)}
            onClick={() => handleCardClick(card, player)}
            />        
          </div>
          ))}
      </div>
    </div>
    </div>
  );
}
