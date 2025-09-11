import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createDeck } from './components/deckUtils';
import { dealPlayers } from './components/dealPlayers'; 
import PlayerStatus from './components/PlayerStatus';
import Pile from './components/Pile';


  const nummberOfPlayers = 4; 
  const interactivePlayers = [0]; // Only the first player is human

  const deck = createDeck(nummberOfPlayers);
  const players = dealPlayers(deck, nummberOfPlayers, interactivePlayers);

function App() {
  
  // set up game state
  const [pile, setPile] = useState([]);
  const [moveLog, setMoveLog] = useState([]);
  const [turnIndex, setTurnIndex] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  //const [playerHand, setPlayerHand] = useState(players[currentPlayerIndex].hand);
  //const [playerFaceUp, setPlayerFaceUp] = useState(players[currentPlayerIndex].faceUp);
  
  function handlePlaySelected() { 

    if (selectedCards.length === 0) return;

    const top = pile[pile.length - 1];
    const legal = selectedCards.every(c => !top || c.rank <= top.rank || c.rank === 13);
    const sameRank = selectedCards.every(c => c.rank === selectedCards[0].rank);
    if (!legal) {
      setMoveLog([...moveLog, `Invalid card selection`]);
      return;
    }
    if (!sameRank) {
      setMoveLog([...moveLog, `All selected cards must be the same rank`]);
      return;
    }

    setPile([...pile, ...selectedCards]);
    setMoveLog([...moveLog, `Player played ${selectedCards.length} x ${selectedCards[0].rank}`]);

    // Remove from hand and faceUp
    players[turnIndex].hand = players[turnIndex].hand.filter(c => !selectedCards.includes(c));
    players[turnIndex].faceUp = players[turnIndex].faceUp.filter(c => !selectedCards.includes(c));
    //
    //setPlayerHand(prev => prev.filter(c => !selectedCards.includes(c)));
    //setPlayerFaceUp(prev => prev.filter(c => !selectedCards.includes(c)));

    setSelectedCards([]);
    //setTurnIndex(1);
    
  }

  function handleCardClick(card, playerType) {
    if (playerType !== 'human') return;
    if (selectedCards.includes(card)) {
      setSelectedCards(selectedCards.filter(c => c !== card));
    } else {
      setSelectedCards([...selectedCards, card]);
    }
  }

  // set up player state
  //const [hand, setPlayerHand] = useState(players[0].hand);
  //const [faceUp, setPlayerFaceUp] = useState(players[0].faceUp);
  //const [mystery, setPlayerMystery] = useState(players[0].mystery);

  return (
    <div className="game-table">
      <div className="pile-log">
        <Pile topCard={pile[pile.length - 1]} moveLog={moveLog} />
      </div>
      <div className="players">
        {players.map((player, i) => (
            <PlayerStatus key={i} player={player} hand={player.hand} faceUp={player.faceUp} selectedCards={selectedCards} handleCardClick={handleCardClick} handlePlaySelected={handlePlaySelected} />
         // <PlayerStatus key={i} name={`Bot ${i + 1}`} hand={botHands[i] || []} cardsLeft={hand.length} isActive={turnIndex === i + 1} />   

        ))}
      </div>
    </div>
    )
}  

export default App

/*
import React, { useState, useEffect } from 'react';
import { createDeck } from './deckUtils';
import { dealPlayers } from './dealPlayers';
import { dealPlayers2 } from './dealPlayers2';
import { botTurn } from './botLogic';
import PlayerHand from './PlayerHand';
import FaceUpCards from './FaceUpCards';
import Pile from './Pile';
import PlayerStatus from './PlayerStatus';

function App() {
  const deck = createDeck(2);
  const players = dealPlayers(deck, 4); // 1 human + 3 bots
  const players2 = dealPlayers2(deck, 4); // 1 human + 3 bots

  // Human player setup
  const [playerHand, setPlayerHand] = useState(players[0].hand);
  const [playerFaceUp, setPlayerFaceUp] = useState(players[0].faceUp);
  const [playerMystery, setPlayerMystery] = useState(players[0].mystery);

  // Bot setup
  const [botHands, setBotHands] = useState(players.slice(1).map(p => p.hand));
  const [botFaceUps, setBotFaceUps] = useState(players.slice(1).map(p => p.faceUp));
  const [botMysteries, setBotMysteries] = useState(players.slice(1).map(p => p.mystery));

  const [pile, setPile] = useState([]);
  const [moveLog, setMoveLog] = useState([]);
  const [turnIndex, setTurnIndex] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);

function handlePlaySelected() { 
  
  if (selectedCards.length === 0) return;

  const top = pile[pile.length - 1];
  const legal = selectedCards.every(c => !top || c.rank <= top.rank || c.rank === 10 || c.rank === 13);
  const sameRank = selectedCards.every(c => c.rank === selectedCards[0].rank);
  if (!legal || !sameRank) return;

  setPile([...pile, ...selectedCards]);
  setMoveLog([...moveLog, `Player played ${selectedCards.length} x ${selectedCards[0].rank}`]);

  // Remove from hand and faceUp
  setPlayerHand(prev => prev.filter(c => !selectedCards.includes(c)));
  setPlayerFaceUp(prev => prev.filter(c => !selectedCards.includes(c)));

  setSelectedCards([]);
  setTurnIndex(1);
  }

  useEffect(() => {
    if (turnIndex === 0) return;

    const botId = turnIndex - 1;
    const botHand = botHands[botId];
    const pileTop = pile[pile.length - 1];
    const move = botTurn(botHand, pileTop, pile);

    if (move.action === 'pickup') {
      setMoveLog(prev => [...prev, `Bot ${turnIndex} picked up the pile`]);
      setBotHands(prev => {
        const updated = [...prev];
        updated[botId] = [...updated[botId], ...pile];
        return updated;
      });
      setPile([]);
    } else {
      setMoveLog(prev => [...prev, `Bot ${turnIndex} played ${move.cards.length} x ${move.cards[0].rank}`]);
      setPile(prev => [...prev, ...move.cards]);
      setBotHands(prev => {
        const updated = [...prev];
        updated[botId] = updated[botId].filter(c => !move.cards.includes(c));
        return updated;
      });
    }

    const nextTurn = (turnIndex + 1) % 4;
    setTimeout(() => setTurnIndex(nextTurn), 1000);
  }, [turnIndex]);

  return (
    <div className="game-table">
      <div className="bots">
        {botHands.map((hand, i) => (
          <PlayerStatus key={i} name={`Bot ${i + 1}`} hand={botHands[i] || []} cardsLeft={hand.length} isActive={turnIndex === i + 1} />
        ))}
      </div>
      <Pile topCard={pile[pile.length - 1]} moveLog={moveLog} />
      <PlayerHand hand={playerHand} selectedCards={selectedCards} setSelectedCards={setSelectedCards} />
      {botFaceUps.map((cards, i) => (
        <FaceUpCards key={i} cards={cards} playerName={`Bot ${i + 1}`} />
      ))}
      
      <FaceUpCards cards={playerFaceUp} playerName="You" />
      <button onClick={handlePlaySelected}>Play Selected</button>
    </div>
  );
}

export default App;


  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )

  
  */
 