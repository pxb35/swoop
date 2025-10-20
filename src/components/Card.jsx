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

if (faceDown && !selected) {
    return (
      <div id={'card-' + deckIndex} className={cardClasses} onClick={onClick}>
        <img src='/swoop/swoop.png' className='card-swoop'></img>
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
