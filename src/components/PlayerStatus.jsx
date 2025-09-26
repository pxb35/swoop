import { useRef } from 'react'
import './playerStatus.css'
import Card from './Card';

export default function PlayerStatus({ player, playerIndex, name, handleCardClick, handlePlaySelected, selectedCards, handlePickUpPile }) {

  const startX = useRef(null);
  const startY = useRef(null);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX 
    const deltaX = Math.abs(startX.current - endX);
    const endY = e.changedTouches[0].clientY;
    const deltaY = Math.abs(startY.current - endY);

    // any swipe from the card div that leaves the div and goes up more than 50 pixels
    if (deltaY > 50 && (startY.current - endY) > Math.abs(startX.current - endX) * 0.2 ) {
      handlePlaySelected(playerIndex); 
    }
  };

  const handlePointerDown = (e) => {
    startX.current = e.clientX;
    startY.current = e.clientY;
  };

  const handlePointerUp = (e) => {
    const endX = e.clientX;
    const endY = e.clientY;
    const deltaX = Math.abs(startX.current - e.clientX);
    const deltaY = Math.abs(startY.current - e.clientY);

    // any swipe from the card div that leaves the div and goes up more than 50 pixels
    if (deltaY > 50 && (startY.current - endY) > Math.abs(startX.current - endX) * 0.2 ) {
      handlePlaySelected(playerIndex); 
    }
  };

  return (
    <div className={"bot-status " + player.type}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp} >

      <strong>{name}</strong>
      
      <div className={'row'}>
        <div className={"player-actions"}>
        {player.type === 'human' ? (
          <div className="play-selected-cards">
            <button 
              onClick={() => handlePlaySelected(player.type)}
            >Play Selected</button>
          </div>
        ) : null}      
    </div>
    </div>

      <div className={'player-hand row player ' + player.position}>
        <div>      
        {player.hand.map((card, index) => (
          <Card
            key={index}
            rank={card ? player.type !== 'human' ? ' ' : card.rank === 13 ? 'S' : card.rank : 'Empty'}
            selected={selectedCards.includes(card)}
            showEdge={false}
            onClick={() => handleCardClick(card, player.type, "hand", playerIndex)}
          />
        ))}
      </div>
    </div>
    <div className={'player-mystery row player ' + player.position}>
      <div>      
        {player.mystery.map((card, index) => (
          <Card
            key={index}
            rank={card ? selectedCards.includes(card) ? card.rank === 13 ? 'S' : card.rank : '?' : 'Empty'}
            selected={selectedCards.includes(card)}
            showEdge={false}
            onClick={() => handleCardClick(card, player.type, "mystery", playerIndex)}
          />        
        ))}
      </div>
    </div>
    <div className={'player-faceup rowplayer ' + player.position}>
      <div>      
        {player.faceUp.map((card, index) => (
          <Card
            key={index}
            rank={card ? card.rank === 13 ? 'S' : card.rank : 'Empty'}
            selected={selectedCards.includes(card)}
            showEdge={false}
            onClick={() => handleCardClick(card, player.type, "faceUp", playerIndex)}
          />        
        ))}
      </div>
    </div>
    
    </div>
  );
}

/*
import React from 'react'
import './playerStatus.css'
import Card from './Card';

export default function PlayerStatus({ player, playerIndex, name, handleCardClick, handlePlaySelected, selectedCards, handlePickUpPile }) {
  return (
    <div className="bot-status">
      <strong>{name}</strong>
      <div className="player-hand">
        <div>      
        {player.hand.map((card, index) => (
          <Card card={card} key={index} selectedCards={selectedCards}  cardType="hand"
            onClick={() => handleCardClick(card, player.type, "hand", playerIndex)} playerType={player.type} />        
        ))}
      </div>
    </div>
    <div className="player-mystery">
      <div>      
        {player.mystery.map((card, index) => (
          <Card card={card} key={index} selectedCards={selectedCards} cardType="mystery"
            onClick={() => handleCardClick(card, player.type, "mystery", playerIndex)}  playerType={player.type} />        
        ))}
      </div>
    </div>
    <div className="player-faceup">
      <div>      
        {player.faceUp.map((card, index) => (
          <Card card={card} key={index} selectedCards={selectedCards}  cardType="faceUp"
            onClick={() => handleCardClick(card, player.type, "faceup", playerIndex)}  playerType={player.type} />        
        ))}
      </div>
    </div>
    <div>
        {player.type === 'human' ? (
          <>
            <button 
              onClick={() => handlePlaySelected(player.type)}
            >Play Selected</button>
            <button 
              onClick={() => handlePickUpPile(playerIndex)}
            >Pick Up Pile</button>
          </>
        ) : null}      
    </div>
    </div>
  );
}
*/