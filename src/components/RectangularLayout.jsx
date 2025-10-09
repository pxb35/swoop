import { useState, useEffect, useRef } from 'react';
import PlayerStatus from "./PlayerStatus";
import BotStatus from "./BotStatus";
import Pile from './Pile';
import dealDeck from './dealUtils';
import './rectangularLayout.css'
import LogPlays from './LogPlays'

export default function RectangularLayout({ pile, playerIndex, players, selectedCards, handleCardClick, handlePlaySelected, handlePickUpPile, moveLog, cardsDealt, setCardsDealt }) {
  const playerZoneRef = useRef(null);
  //const layoutReadyRef = useRef(false);

  useEffect(() => {
    const deckPosition = {x: 0, y: 0};

    // Check if all key layout elements are mounted
    if (playerZoneRef.current) {
      //layoutReadyRef.current = true;

      for (let i=0; i<players.length; i++) {
        
        const divElement = document.getElementById("player-" + i.toString()); // Or use querySelector()
        const rect = divElement.getBoundingClientRect();
        const target = {x: rect.left, y: rect.top};
        let newTarget = {};

        for (let j=0; j<19; j++) {
            
          const card = document.querySelectorAll('#player-'+i.toString()+' .card:nth-child('+(j+1).toString()+')')[0];

          if (j > 14) {
            newTarget.y = target.y + 100;
            newTarget.x = target.x + ((j - 15) % 4) * 80;
          } else if (j > 10) {
            newTarget.y = target.y + 105;
            newTarget.x = target.x + ((j - 11) % 4) * 85;
          } else {
            newTarget.y = target.y;
            newTarget.x = target.x + (j % 11) * 80;
          }
            
          // Calculate vector from deck to target
          const dx = target.x - deckPosition.x;
          const dy = target.y - deckPosition.y;

          if (card) {
            // Set custom properties for animation
            card.style.setProperty("--dx", `${dx}px`);
            card.style.setProperty("--dy", `${dy}px`);
            card.style.animationDelay = `${i * 0.05}s`;
          }

        }
        setCardsDealt(true);
      };
      
    }
  }, [playerZoneRef]);
  
  console.log('rectangular layout');
  return (
     <div className="rectangular-container" ref={playerZoneRef} >
      <Row1 players={players} />
      <Row2 pile={pile}
            players={players}
            playerIndex={playerIndex}
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

function Row1({ players, playerIndex, cardsDealt }) {
  
  const tblPlayerIndex = parseInt(players.length/2);
  switch (players.length) {
    case 2:
    case 4:
    case 6:
      return (
        <div className="row justify-content-center cardtable-top">
            <div className="col-4">
              <BotStatus player={players[tblPlayerIndex]} playerIndex={tblPlayerIndex} cardsDealt={cardsDealt} />
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
              <BotStatus player={players[tblPlayerIndex]} playerIndex={tblPlayerIndex} cardsDealt={cardsDealt} />
            </div>
            <div className="col-4">
              <BotStatus player={players[tblPlayerIndex + 1]}  playerIndex={tblPlayerIndex + 1} cardsDealt={cardsDealt} />
            </div>
          </div>
      );
  }
}

function Row2({ pile, players, playerIndex, handlePickUpPile, cardsDealt }) {
  
  const tblPlayerIndex = parseInt(players.length/2);
  switch (players.length) {
    case 2:
    case 3:
      return (
        <div className="row justify-content-center cardtable-center">
            <div className="col-4">
              <Pile pile={pile} handlePickUpPile={handlePickUpPile} players={players} playerIndex={playerIndex} />
            </div>
          </div>
      ); 
    case 4:
    case 5:
      return (
        <div className="row justify-content-center cardtable-center">
            <div className="col-4">
              <BotStatus player={players[1]}  playerIndex={1} cardsDealt={cardsDealt} />
            </div>
            <div className="col-4">
              <Pile pile={pile} handlePickUpPile={handlePickUpPile}  players={players} playerIndex={playerIndex} />
            </div>
            <div className="col-4">
              <BotStatus player={players[players.length-1]}  playerIndex={players.length-1} cardsDealt={cardsDealt} />
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
              <div className='col-12'>
                <BotStatus player={players[2]}  playerIndex={2} cardsDealt={cardsDealt} />
              </div>
            </div>
            <div className="row justify-content-center table-sub-row ">
              <div className='col-12'>
                <BotStatus player={players[1]} playerIndex={1} cardsDealt={cardsDealt} />
              </div>
            </div>
          </div>
          <div className="col-4">
            <Pile pile={pile} handlePickUpPile={handlePickUpPile} players={players} playerIndex={playerIndex} />
          </div>
          <div className="col-4">
            <div className="row justify-content-center table-sub-row ">
              <div className='col-12'>
                <BotStatus player={players[players.length-2]}  playerIndex={players.length-2} cardsDealt={cardsDealt} />
              </div>
            </div>
            <div className="row justify-content-center table-sub-row ">
              <div className='col-12'>
                <BotStatus player={players[players.length-1]}  playerIndex={players.length-1} cardsDealt={cardsDealt} />
              </div>
            </div>
          </div>
        </div>
      );
  }
}

function Row3({ pile, players, playerIndex, handlePickUpPile, selectedCards, handleCardClick, handlePlaySelected, moveLog, cardsDealt }) {
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
             cardsDealt={cardsDealt}
          />
        </div>
        <div className="col-4 move-log">
          <LogPlays moveLog={moveLog} />
       </div>
    </div>
  );
}
/*

      <RectangularLayout players={players} 
                        pile={pile} 
                        playerIndex={turnIndex} 
                        selectedCards={selectedCards} 
                        handleCardClick={handleCardClick} 
                        handlePickUpPile={handlePickUpPile} 
                        handlePlaySelected={handlePlaySelected}
                        moveLog={moveLog}
                    />  

  switch (players.length) {
    case 2:
      return (
        <div className="rectangular-container">
          <div className="row justify-content-center cardtable-top">
            <div className="col-6">
              <PlayerStatus
                playerIndex={1}
                player={players[1]}
                hand={players[1].hand}
                faceUp={players[1].faceUp}
                selectedCards={selectedCards}
                handleCardClick={handleCardClick}
                handlePlaySelected={handlePlaySelected}
                handlePickUpPile={handlePickUpPile}
              />
            </div>
          </div>
          return (
          <div className="row justify-content-center cardtable-center">
            <div className="col-6">
              <Pile pile={pile} handlePickUpPile={handlePickUpPile} playerIndex={playerIndex} isHuman={players[playerIndex].type === 'human'}/>
            </div>
          </div>
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
              <PlayerStatus
                playerIndex={0}
                player={players[0]}
                hand={players[0].hand}
                faceUp={players[0].faceUp}
                selectedCards={selectedCards}
                handleCardClick={handleCardClick}
                handlePlaySelected={handlePlaySelected}
                handlePickUpPile={handlePickUpPile}
              />
            </div>
            <div className="col-3">
              <div>
                {moveLog.slice(-10).map((log, i) => (
                  <div key={i}>{log}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )

    case 3:
      return (
        <div className="rectangular-container">
          <div className="row justify-content-center cardtable-top">
            <div className="col-6">
              <PlayerStatus
                playerIndex={1}
                player={players[1]}
                hand={players[1].hand}
                faceUp={players[1].faceUp}
                selectedCards={selectedCards}
                handleCardClick={handleCardClick}
                handlePlaySelected={handlePlaySelected}
                handlePickUpPile={handlePickUpPile}
              />
            </div>
            <div className="col-6">
              <PlayerStatus
                playerIndex={2}
                player={players[2]}
                hand={players[2].hand}
                faceUp={players[2].faceUp}
                selectedCards={selectedCards}
                handleCardClick={handleCardClick}
                handlePlaySelected={handlePlaySelected}
                handlePickUpPile={handlePickUpPile}
              />
            </div>
          </div>
          <div className="row justify-content-center cardtable-center">
            <div className="col-6">
              <Pile pile={pile} handlePickUpPile={handlePickUpPile} playerIndex={playerIndex} isHuman={players[playerIndex].type === 'human'}/>
            </div>
          </div>
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
              <PlayerStatus
                playerIndex={0}
                player={players[0]}
                hand={players[0].hand}
                faceUp={players[0].faceUp}
                selectedCards={selectedCards}
                handleCardClick={handleCardClick}
                handlePlaySelected={handlePlaySelected}
                handlePickUpPile={handlePickUpPile}
              />
            </div>
            <div className="col-3">
              <div>
                {moveLog.slice(-10).map((log, i) => (
                  <div key={i}>{log}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
      )
     
    default:
      
    } 
  }
    */