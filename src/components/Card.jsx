// components/Card.jsx
import React from 'react';
import { useRef, useEffect } from 'react';
import './card.css';

const Card = ({ rank, deckIndex, selected, showEdge, className = '', onClick, faceDown }) => {
  const cardClasses = [
    'card',
    selected ? 'selected' : '',
    showEdge ? 'showEdge' : '',
    faceDown ? 'faceDown' : '',
    className
  ].join(' ').trim();

  console.log('deckIndex: ' + deckIndex.toString());

if (faceDown) {
    return (
      <div id={'card-' + deckIndex} className={cardClasses} onClick={onClick}>
        <img src='/swoop/public/swoop.png' className='card-swoop'></img>
      </div>
    );
  } else {}
  return (
    <div id={'card-' + deckIndex} className={cardClasses} onClick={onClick}>
      <div className="corner top-left">{rank}</div>
      <div className="center">{rank}</div>
      <div className="corner bottom-right">{rank}</div>
    </div>
  );
};

export default Card;
