import { useState, useEffect, useRef } from 'react';
import PlayerStatus from "./PlayerStatus";
import BotStatus from "./BotStatus";
import Pile from './Pile';
import Scores from './Scores';
import dealDeck from './dealUtils';
import './rectangularLayout.css'
import LogPlays from './LogPlays'
import GameOverPopup from './GameOverPopup';

export default function RectangularLayout({ pile, playerIndex, players, selectedCards, handleCardClick, handlePlaySelected, handlePickUpPile, moveLog, 
                                            gameOver, handleClosePopup, handleNewRound }) {
  const playerZoneRef = useRef(null);

  return (
     <div className="rectangular-container" ref={playerZoneRef} >
      <Row1 players={players} 
            playerIndex={playerIndex}
            selectedCards={selectedCards} 
            handleCardClick={handleCardClick} 
            handlePlaySelected={handlePlaySelected}  />
      <Row2 pile={pile}
           players={players} 
            playerIndex={playerIndex}
            selectedCards={selectedCards} 
            handleCardClick={handleCardClick} 
            handlePlaySelected={handlePlaySelected} 
            handlePickUpPile={handlePickUpPile} />
      <Row3 players={players} 
            playerIndex={playerIndex}
            selectedCards={selectedCards} 
            handleCardClick={handleCardClick} 
            handlePlaySelected={handlePlaySelected} 
            moveLog={moveLog}
            gameOver={gameOver}
            handleClosePopup={handleClosePopup}
            handleNewRound={handleNewRound}
     />
    </div>
  );
}

function Row1({ players, playerIndex, selectedCards, handleCardClick, handlePlaySelected, handlePickUpPile }) {
  
  const tblPlayerIndex = Math.floor(players.length/2);
  switch (players.length) {
    case 2:
    case 4:
    default:
    case 6:
      return (
        <div className="row justify-content-center cardtable-top">
            <div className="col-4">
              <PlayerStatus 
                players={players}
                player={players[tblPlayerIndex]} 
                playerIndex={tblPlayerIndex}  
                selectedCards={selectedCards} 
                handleCardClick={handleCardClick} 
                handlePlaySelected={handlePlaySelected} 
                handlePickUpPile={handlePickUpPile} />
            </div>
          </div>
      );
    case 3:
    case 5:
    case 7:
      return (
        <div className="row justify-content-center cardtable-top">
            <div className="col-4">
              <PlayerStatus 
                players={players}
                player={players[tblPlayerIndex]} playerIndex={tblPlayerIndex}  selectedCards={selectedCards} 
                handleCardClick={handleCardClick} 
                handlePlaySelected={handlePlaySelected} 
                handlePickUpPile={handlePickUpPile} />
            </div>
            <div className="col-4">
              <PlayerStatus
                players={players}
                player={players[tblPlayerIndex + 1]}  playerIndex={tblPlayerIndex + 1}  selectedCards={selectedCards} 
                handleCardClick={handleCardClick} 
                handlePlaySelected={handlePlaySelected} 
                handlePickUpPile={handlePickUpPile} />
            </div>
          </div>
      );
    case 8:
      return (
        <div className="row justify-content-center cardtable-top">
            <div className="col-4">
              <PlayerStatus
                players={players}
                player={players[tblPlayerIndex-1]} playerIndex={tblPlayerIndex-1}  selectedCards={selectedCards} 
                handleCardClick={handleCardClick} 
                handlePlaySelected={handlePlaySelected} 
                handlePickUpPile={handlePickUpPile} />
            </div>
            <div className="col-4">
              <PlayerStatus 
                players={players}
                player={players[tblPlayerIndex]} playerIndex={tblPlayerIndex}  selectedCards={selectedCards} 
                handleCardClick={handleCardClick} 
                handlePlaySelected={handlePlaySelected} 
                handlePickUpPile={handlePickUpPile} />
            </div>
            <div className="col-4">
              <PlayerStatus
                players={players} 
                player={players[tblPlayerIndex + 1]}  playerIndex={tblPlayerIndex + 1}  selectedCards={selectedCards} 
                handleCardClick={handleCardClick} 
                handlePlaySelected={handlePlaySelected} 
                handlePickUpPile={handlePickUpPile} />
            </div>
          </div>
      );
  }
}

function Row2({ pile, players, playerIndex, handlePickUpPile, selectedCards, handleCardClick, handlePlaySelected }) {
  
  const tblPlayerIndex = parseInt(players.length/2);
  switch (players.length) {
    case 2:
    case 3:
      return (
        <div className="row justify-content-center cardtable-center">
            <div className="col-4 justify-content-center vertically-content-center">
              <Pile pile={pile} handlePickUpPile={handlePickUpPile} players={players} playerIndex={playerIndex} />
            </div>
          </div>
      ); 
    case 4:
    default:
    case 5:
      return (
        <div className="row justify-content-center vertically-content-center cardtable-center">
            <div className="col-4 bot-cell-left">
              <PlayerStatus 
                players={players}
                player={players[1]}  playerIndex={1} selectedCards={selectedCards} 
                handleCardClick={handleCardClick} 
                handlePlaySelected={handlePlaySelected} 
                handlePickUpPile={handlePickUpPile} />
            </div>
            <div className="col-4">
              <Pile pile={pile} handlePickUpPile={handlePickUpPile}  players={players} playerIndex={playerIndex} />
            </div>
            <div className="col-4 bot-cell-right">
              <PlayerStatus 
                players={players}
                player={players[players.length-1]}  playerIndex={players.length-1}  selectedCards={selectedCards} 
                handleCardClick={handleCardClick} 
                handlePlaySelected={handlePlaySelected} 
                handlePickUpPile={handlePickUpPile} />
            </div>
          </div>
      );
    case 6:
    case 7:
    case 8:
      return (
        <div className="row justify-content-center cardtable-center">
          <div className="col-4">
            <div className="rowjustify-content-center table-sub-row ">
              <div className='col-12 bot-cell-left'>
                <PlayerStatus 
                players={players}
                player={players[2]}  playerIndex={2}  selectedCards={selectedCards} 
                handleCardClick={handleCardClick} 
                handlePlaySelected={handlePlaySelected} 
                handlePickUpPile={handlePickUpPile} />
              </div>
            </div>
            <div className="row justify-content-center table-sub-row ">
              <div className='col-12 bot-cell-left'>
                <PlayerStatus 
                players={players}
                player={players[1]} playerIndex={1}  selectedCards={selectedCards} 
                handleCardClick={handleCardClick} 
                handlePlaySelected={handlePlaySelected} 
                handlePickUpPile={handlePickUpPile} />
              </div>
            </div>
          </div>
          <div className="col-4 justify-content-center vertically-content-center">
            <Pile pile={pile} handlePickUpPile={handlePickUpPile} players={players} playerIndex={playerIndex} />
          </div>
          <div className="col-4">
            <div className="row justify-content-center table-sub-row ">
              <div className='col-12 bot-cell-right'>
                <PlayerStatus 
                players={players}
                player={players[players.length-2]}  playerIndex={players.length-2}  selectedCards={selectedCards} 
                handleCardClick={handleCardClick} 
                handlePlaySelected={handlePlaySelected} 
                handlePickUpPile={handlePickUpPile} />
              </div>
            </div>
            <div className="row justify-content-center table-sub-row ">
              <div className='col-12 bot-cell-right'>
                <PlayerStatus 
                players={players}
                player={players[players.length-1]}  playerIndex={players.length-1}  selectedCards={selectedCards} 
                handleCardClick={handleCardClick} 
                handlePlaySelected={handlePlaySelected} 
                handlePickUpPile={handlePickUpPile} />
              </div>
            </div>
          </div>
        </div>
      );
  }
}

function Row3({ pile, players, playerIndex, handlePickUpPile, selectedCards, handleCardClick, handlePlaySelected, moveLog, gameOver, handleClosePopup, handleNewRound }) {
  return (
    <div className="row justify-content-center cardtable-bottom">
      <div className="col-4">
        <div className="log-container" >
          <LogPlays moveLog={moveLog} />
        </div>
      </div>
      <div className="col-4">
        <PlayerStatus
          player={players[0]}
          playerIndex={playerIndex}
          players={players}
          selectedCards={selectedCards}
          handleCardClick={handleCardClick}
          handlePlaySelected={handlePlaySelected}
          handlePickUpPile={handlePickUpPile}
          handleNewRound={handleNewRound}
        />
      </div>
      <div className={'game-over' + (gameOver ? ' popup-visible' : '')}>
          <GameOverPopup gameOver={gameOver} onClose={handleClosePopup} players={players} handleNewRound={handleNewRound} ></GameOverPopup>
      </div>
      <div className="col-4 ">
        <div className='scores-container'>
          <Scores 
            players={players}
          />
        </div>
      </div>
    </div>
  );
}
