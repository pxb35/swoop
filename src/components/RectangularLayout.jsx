import { useState, useEffect, useRef } from 'react';
import PlayerStatus from "./PlayerStatus";
import BotStatus from "./BotStatus";
import Pile from './Pile';
import dealDeck from './dealUtils';
import './rectangularLayout.css'
import LogPlays from './LogPlays'

export default function RectangularLayout({ pile, playerIndex, players, selectedCards, handleCardClick, handlePlaySelected, handlePickUpPile, moveLog }) {
  const playerZoneRef = useRef(null);

  console.log('rectangular layout');
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
            moveLog={moveLog} />
    </div>
  );
}

function Row1({ players, playerIndex, selectedCards, handleCardClick, handlePlaySelected, handlePickUpPile }) {
  
  const tblPlayerIndex = parseInt(players.length/2);
  switch (players.length) {
    case 2:
    case 4:
    case 6:
      return (
        <div className="row justify-content-center cardtable-top">
            <div className="col-4">
              <BotStatus player={players[tblPlayerIndex]} 
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
    default:
      return (
        <div className="row justify-content-center cardtable-top">
            <div className="col-4">
              <BotStatus player={players[tblPlayerIndex]} playerIndex={tblPlayerIndex}  selectedCards={selectedCards} 
            handleCardClick={handleCardClick} 
            handlePlaySelected={handlePlaySelected} 
            handlePickUpPile={handlePickUpPile} />
            </div>
            <div className="col-4">
              <BotStatus player={players[tblPlayerIndex + 1]}  playerIndex={tblPlayerIndex + 1}  selectedCards={selectedCards} 
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
    case 5:
      return (
        <div className="row justify-content-center vertically-content-center cardtable-center">
            <div className="col-4 bot-cell-left">
              <BotStatus player={players[1]}  playerIndex={1} selectedCards={selectedCards} 
            handleCardClick={handleCardClick} 
            handlePlaySelected={handlePlaySelected} 
            handlePickUpPile={handlePickUpPile} />
            </div>
            <div className="col-4">
              <Pile pile={pile} handlePickUpPile={handlePickUpPile}  players={players} playerIndex={playerIndex} />
            </div>
            <div className="col-4 bot-cell-right">
              <BotStatus player={players[players.length-1]}  playerIndex={players.length-1}  selectedCards={selectedCards} 
            handleCardClick={handleCardClick} 
            handlePlaySelected={handlePlaySelected} 
            handlePickUpPile={handlePickUpPile} />
            </div>
          </div>
      );
    case 6:
    case 7:
    default:
      return (
        <div className="row justify-content-center cardtable-center">
          <div className="col-4">
            <div className="rowjustify-content-center table-sub-row ">
              <div className='col-12 bot-cell-left'>
                <BotStatus player={players[2]}  playerIndex={2}  selectedCards={selectedCards} 
            handleCardClick={handleCardClick} 
            handlePlaySelected={handlePlaySelected} 
            handlePickUpPile={handlePickUpPile} />
              </div>
            </div>
            <div className="row justify-content-center table-sub-row ">
              <div className='col-12 bot-cell-left'>
                <BotStatus player={players[1]} playerIndex={1}  selectedCards={selectedCards} 
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
                <BotStatus player={players[players.length-2]}  playerIndex={players.length-2}  selectedCards={selectedCards} 
            handleCardClick={handleCardClick} 
            handlePlaySelected={handlePlaySelected} 
            handlePickUpPile={handlePickUpPile} />
              </div>
            </div>
            <div className="row justify-content-center table-sub-row ">
              <div className='col-12 bot-cell-right'>
                <BotStatus player={players[players.length-1]}  playerIndex={players.length-1}  selectedCards={selectedCards} 
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

function Row3({ pile, players, playerIndex, handlePickUpPile, selectedCards, handleCardClick, handlePlaySelected, moveLog }) {
  const player = players[0];
  return (
    <div className="row justify-content-center cardtable-bottom">
      <div className="col-4"></div>
        <div className="col-4">
          <PlayerStatus
            playerIndex={playerIndex}
            players={players}
            hand={player.hand}
            faceUp={player.faceUp}
            selectedCards={selectedCards}
            handleCardClick={handleCardClick}
            handlePlaySelected={handlePlaySelected}
            handlePickUpPile={handlePickUpPile}
          />
        </div>
        <div className="col-4 move-log">
          <LogPlays moveLog={moveLog} />
       </div>
    </div>
  );
}
