// components/Card.jsx
import React from 'react';
import { useRef, useEffect } from 'react';
import './card.css';
import swoopLogo from '/swoop.png'

const Card = ({ rank, deckIndex, selected, showEdge, className = '', onClick, faceDown, revealCards }) => {
 
   const cardClasses = [
    'card',
    selected ? 'selected' : '',
    showEdge ? 'showEdge' : '',
    faceDown ? 'faceDown' : '',
    className
  ].join(' ').trim();

 if (faceDown && !selected && !revealCards) {
    return (
      <div id={'card-' + deckIndex} className={cardClasses} onClick={onClick}>
        <img src={swoopLogo} className='card-swoop'></img>
      </div>
    );
  } else {
    return (
      <div id={'card-' + deckIndex} className={cardClasses} onClick={onClick}>
        <div className="corner top-left">{rank}</div>
        <div className="center">{rank}</div>
        <div className="corner bottom-right">{rank}</div>
      </div>
    );
  }
};

export default Card;
