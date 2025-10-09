import { useRef } from 'react'
import './playerStatus.css'
import './card.css'
import Card from './Card';

export default function botStatus({ player, playerIndex }) {
  
const cardRef = useRef(null);

console.log('botstatus');
 
if (player) return (
    <div className="bot-cards" id={"player-" + playerIndex}>
      <strong><span>{'B'+ playerIndex.toString()}</span></strong>
      <div className={'player-hand row reveal-container'}>
        <div className="d-flex justify-content-center" >      
        {player.hand.map((card, index) => (
          <Card
            key={index}
            rank={card ? player.type !== 'human' ? ' ' : card.rank === 13 ? 'S' : card.rank : 'Empty'}
            showEdge={false}
            faceDown={true}
            ref={cardRef} 
          />
        ))}
      </div>
    </div>
    <div className="d-flex justify-content-left mystery-faceup-container" >
      <div className={'player-mystery row reveal-container'}>
        <div className="d-flex justify-content-center">      
          {player.mystery.map((card, index) => (
            <Card
              key={index}
              rank="?"
              showEdge={false}
              faceDown={true}
              ref={cardRef}  
              />        
          ))}
        </div>
      </div>
      <div className={'player-faceup reveal-container'}>
        <div className="d-flex justify-content-center">      
          {player.faceUp.map((card, index) => (
            <Card
              key={index}
              rank={card ? card.rank === 13 ? 'S' : card.rank : 'Empty'}
              showEdge={false}
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
