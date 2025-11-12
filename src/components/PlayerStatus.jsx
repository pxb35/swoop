import { useRef, useEffect } from 'react'
import './PlayerStatus.css'
import Card from './Card';
import dealDeck from './dealUtils';
import botPng from '/bot.png';

export default function PlayerStatus({ player, players, playerIndex, handleCardClick, handlePlaySelected, selectedCards }) {
 
  if (player) return (
    <> 
      <div className={"row " + (player.type === 'human' ? 'human-player' : 'bot-player')}>
        <div className={"col-3"}>
          <div className={"row"}>
            <div id={"player-" + playerIndex } className={'player-id'}>
              <img src={botPng} className={"bot-icon"}/>
              <strong>{player.name}</strong>
            </div>
            {player.type === 'human' ? (
              <div>
                <div className="play-selected-cards">
                  <button className="btn btn-primary" onClick={() => handlePlaySelected(player.type)}>Play Cards Selected</button>
                </div>
              </div>
            ) : null}      
          </div>
        </div>
        <div className="d-flex justify-content-left mystery-faceup-container col-9">
          <div className={'mystery-container row'}>
            <div className="d-flex justify-content-center">      
              {player.mystery.map((card, index) => (
                <Card
                  key={card.deckIndex}
                  rank={card ? selectedCards && selectedCards.includes(card) ? card.rank === 13 ? 'S' : card.rank : '?' : 'Empty'}
                  selected={selectedCards && selectedCards.includes(card)}
                  showEdge={false}
                  onClick={() => handleCardClick(card, player)}
                  faceDown={selectedCards && selectedCards.includes(card) ? false : true}
                  deckIndex={card.deckIndex}
                />        
              ))}
            </div>
          </div>
          <div className={'faceup-container row'}>
            <div className="d-flex justify-content-center">      
              {player.faceUp.map((card, index) => (
                <Card
                  key={card.deckIndex}
                  rank={card ? card.rank === 13 ? 'S' : card.rank : 'Empty'}
                  selected={selectedCards && selectedCards.includes(card)}
                  showEdge={false}
                  onClick={() => handleCardClick(card, player)}
                  faceDown={false}
                  deckIndex={card.deckIndex}
                />        
              ))}
            </div>
          </div>
        </div>
        <div className={'hand-container playerIndex-' + playerIndex.toString()} >
          <div className="d-flex justify-content-center">      
            {player.hand.map((card, index) => (
              <Card
                key={card.deckIndex}
                rank={card ? player.type !== 'human' ? ' ' : card.rank === 13 ? 'S' : card.rank : 'Empty'}
                selected={selectedCards && selectedCards.includes(card)}
                showEdge={false}
                onClick={() => handleCardClick(card, player)}
                faceDown={card && player.type !== 'human'}
                deckIndex={card.deckIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
