import React from 'react'
import './playerStatus.css'

export default function PlayerStatus({ player, hand, name, cardsLeft, handleCardClick, handlePlaySelected, selectedCards, playerType }) {
  return (
    <div className="bot-status">
      <strong>{name}</strong>
      <div className="player-hand">
      {player.hand.map((card, index) => (
        <button
          key={index}
          className={'card ' + (selectedCards.includes(card) ? 'selected' : '')}
          onClick={() => handleCardClick(card, player.type)} 
        >
          {card.rank}
        </button>
      ))}
    </div>
    <div className="player-hand">
      {player.faceUp.map((card, index) => (
        <button
          key={index}
          className={'card ' + (selectedCards.includes(card) ? 'selected' : '')}
          onClick={() => handleCardClick(card, player.type)} 
        >
          {card.rank}
        </button>
      ))}
    </div>
    <div>
      <button 
        onClick={() => handlePlaySelected(playerType)}
        >Play Selected</button>
    </div>
    </div>
  );
}
