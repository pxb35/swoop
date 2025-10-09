// components/Card.jsx
import React from 'react';
import { useRef, useEffect } from 'react';
import './card.css';

const Card = ({ rank, selected, showEdge, className = '', onClick, faceDown, cardRefX }) => {
  const cardClasses = [
    'card',
    selected ? 'selected' : '',
    showEdge ? 'showEdge' : '',
    faceDown ? 'faceDown' : '',
    className
  ].join(' ').trim();

  const cardRef = useRef(null);
   
  useEffect(() => {
    if (cardRef) {
      console.log(cardRef.current.getBoundingClientRect());
    }
  }, [cardRef]);

if (faceDown) {
    return (
      <div ref={cardRef} className={cardClasses} onClick={onClick}>
        <img src='/swoop/public/swoop.png' className='card-swoop'></img>
      </div>
    );
  } else {}
  return (
    <div ref={cardRef} className={cardClasses} onClick={onClick}>
      <div className="corner top-left">{rank}</div>
      <div className="center">{rank}</div>
      <div className="corner bottom-right">{rank}</div>
    </div>
  );
};

export default Card;

/*
import './card.css'

function Card({ card, selectedCards, onClick, playerType, pileKey, cardType, playerIndex}) {
  return (
    <div className={'card ' + (selectedCards.includes(card) ? 'selected' : '') + (pileKey ? 'showEdge' : '')}
      onClick={() => onClick?.(card, playerType, cardType, playerIndex)}>
      <div className="corner top-left">
        {card ? 
          cardType && cardType === 'hand' && playerType === 'bot' ? '*' : cardType && cardType === 'mystery' && !selectedCards.includes(card) ?
          '?' : card.rank === 13 ?
          'S' : card.rank  : 'Empty'
        }
      </div>
      <div className="center">
        {card ? 
          cardType && cardType === 'hand' && playerType === 'bot' ? '*' : cardType && cardType === 'mystery' && !selectedCards.includes(card) ?
          '?' : card.rank === 13 ?
          'S' : card.rank  : 'Empty'
        }
      </div>
      <div className="corner bottom-right">
        {card ? 
          cardType && cardType === 'hand' && playerType === 'bot' ? '*' : cardType && cardType === 'mystery' && !selectedCards.includes(card) ?
          '?' : card.rank === 13 ?
          'S' : card.rank  : 'Empty'
        }
      </div>
    </div>
  );
}

export default Card;
*/