import { useState, useEffect, useRef } from 'react';
import PlayerStatus from "./PlayerStatus";
import BotStatus from "./BotStatus";
import Pile from './Pile';
import Scores from './Scores';
import dealDeck from './dealUtils';
import './rectangularLayout.css'
import LogPlays from './LogPlays'
import CustomModal from './CustomModal'
import GameOverPopup from './GameOverPopup';
import Settings from './GameSettings';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RectangularLayout({ pile, playerIndex, players, selectedCards, handleCardClick, handlePlaySelected, handlePickUpPile, moveLog, 
                                            gameOver, handleClosePopup, handleNewRound, showSettings, handleCloseSettings }) {
  const playerZoneRef = useRef(null);

  return (
     <>
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
            showSettings={showSettings}
            handleCloseSettings={handleCloseSettings}
     />
    </div>
    </>
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
            <div className="col-4 player-cell-center">
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
            <div className="col-4 player-cell-left">
              <PlayerStatus 
                players={players}
                player={players[tblPlayerIndex]} playerIndex={tblPlayerIndex}  selectedCards={selectedCards} 
                handleCardClick={handleCardClick} 
                handlePlaySelected={handlePlaySelected} 
                handlePickUpPile={handlePickUpPile} />
            </div>
            <div className="col-4 player-cell-right">
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
            <div className="col-4 player-cell-left">
              <PlayerStatus
                players={players}
                player={players[tblPlayerIndex-1]} playerIndex={tblPlayerIndex-1}  selectedCards={selectedCards} 
                handleCardClick={handleCardClick} 
                handlePlaySelected={handlePlaySelected} 
                handlePickUpPile={handlePickUpPile} />
            </div>
            <div className="col-4 player-cell-center">
              <PlayerStatus 
                players={players}
                player={players[tblPlayerIndex]} playerIndex={tblPlayerIndex}  selectedCards={selectedCards} 
                handleCardClick={handleCardClick} 
                handlePlaySelected={handlePlaySelected} 
                handlePickUpPile={handlePickUpPile} />
            </div>
            <div className="col-4 player-cell-right">
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

function Row2({ pile, players, playerIndex, UpPile, selectedCards, handleCardClick, handlePlaySelected, handlePickUpPile}) {
  
  const tblPlayerIndex = parseInt(players.length/2);
  switch (players.length) {
    case 2:
    case 3:
      return (
        <div className="row justify-content-center cardtable-center">
            <div className="col-4 justify-content-center vertically-content-center pile">
              <Pile pile={pile} handlePickUpPile={handlePickUpPile} players={players} playerIndex={playerIndex} />
            </div>
          </div>
      ); 
    case 4:
    default:
    case 5:
      return (
        <div className="row justify-content-center vertically-content-center cardtable-center">
            <div className="col-4 player-cell-left">
              <PlayerStatus 
                players={players}
                player={players[1]}  playerIndex={1} selectedCards={selectedCards} 
                handleCardClick={handleCardClick} 
                handlePlaySelected={handlePlaySelected} 
                handlePickUpPile={handlePickUpPile} />
            </div>
            <div className="col-4 pile">
              <Pile pile={pile} handlePickUpPile={handlePickUpPile}  players={players} playerIndex={playerIndex} />
            </div>
            <div className="col-4 player-cell-right">
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
              <div className='col-12 player-cell-left'>
                <PlayerStatus 
                players={players}
                player={players[2]}  playerIndex={2}  selectedCards={selectedCards} 
                handleCardClick={handleCardClick} 
                handlePlaySelected={handlePlaySelected} 
                handlePickUpPile={handlePickUpPile} />
              </div>
            </div>
            <div className="row justify-content-center table-sub-row ">
              <div className='col-12 left-cell-left'>
                <PlayerStatus 
                players={players}
                player={players[1]} playerIndex={1}  selectedCards={selectedCards} 
                handleCardClick={handleCardClick} 
                handlePlaySelected={handlePlaySelected} 
                handlePickUpPile={handlePickUpPile} />
              </div>
            </div>
          </div>
          <div className="col-4 justify-content-center vertically-content-center pile">
            <Pile pile={pile} handlePickUpPile={handlePickUpPile} players={players} playerIndex={playerIndex} />
          </div>
          <div className="col-4">
            <div className="row justify-content-center table-sub-row ">
              <div className='col-12 player-cell-right'>
                <PlayerStatus 
                players={players}
                player={players[players.length-2]}  playerIndex={players.length-2}  selectedCards={selectedCards} 
                handleCardClick={handleCardClick} 
                handlePlaySelected={handlePlaySelected} 
                handlePickUpPile={handlePickUpPile} />
              </div>
            </div>
            <div className="row justify-content-center table-sub-row ">
              <div className='col-12 playere-cell-right'>
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

function Row3({ pile, players, playerIndex, handlePickUpPile, selectedCards, handleCardClick, handlePlaySelected, moveLog, gameOver, handleClosePopup, 
  showSettins, handleNewRound, showSettings, handleCloseSettings}) {

  return (
    <div className="row justify-content-center cardtable-bottom">
      <div className="col-3">
        <div className="play-log" >
          <p>Play Log</p>
          <LogPlays moveLog={moveLog} />
        </div>
      </div>
      <div className="col-6 main-player">
        <div className='row main-player-spacer'></div>
        <PlayerStatus
          player={players[0]}
          playerIndex={0}
          players={players}
          selectedCards={selectedCards}
          handleCardClick={handleCardClick}
          handlePlaySelected={handlePlaySelected}
          handlePickUpPile={handlePickUpPile}
          handleNewRound={handleNewRound}
        />
      </div>
      <div className="col-3 ">
        <div className='scores'>
          <p>Current game scores</p>
          <Scores 
            players={players}
          />
        </div>
      </div>
        <div className={'game-over' + (gameOver ? ' popup-visible' : '')}>
          <GameOverPopup gameOver={gameOver} onClose={handleClosePopup} players={players} handleNewRound={handleNewRound} ></GameOverPopup>
        </div>
      </div>

  );
}
