import { useState, useEffect } from 'react';
import './App.css';
import { createDeck } from './components/deckUtils';
import { processPile } from './components/pileUtils';
import { dealPlayers } from './components/dealPlayers';
import PlayerStatus from './components/PlayerStatus';
import Pile from './components/Pile';
import LogPlays from './components/LogPlays';
import { botTurn } from './components/botLogic';
import CardTable from './components/CardTable';
import CircularLayout from './components/CircularLayout';

const numberOfPlayers = 5;
const interactivePlayers = [0]; // Only the first player is human

function App() {
  // Game state
  const [players, setPlayers] = useState([]);
  const [pile, setPile] = useState([]);
  const [moveLog, setMoveLog] = useState([]);
  const [turnIndex, setTurnIndex] = useState(0);
  const [turnNmber, setTurnNumber] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  ///const [topPileCards, setTopPileCards] = useState([]);
/*

  // Bot setup
  const [botHands, setBotHands] = useState(players.slice(1).map(p => p.hand));
  const [botFaceUps, setBotFaceUps] = useState(players.slice(1).map(p => p.faceUp));
  const [botMysteries, setBotMysteries] = useState(players.slice(1).map(p => p.mystery));

  const [pile, setPile] = useState([]);
  const [moveLog, setMoveLog] = useState([]);
  const [turnIndex, setTurnIndex] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);

*/
  // Initialize deck and players once
  useEffect(() => {
    const deck = createDeck(numberOfPlayers);
    const dealtPlayers = dealPlayers(deck, numberOfPlayers, interactivePlayers);
    setPlayers(dealtPlayers);
    
    setTimeout(() => {
      const firstPlayer = parseInt(Math.random() * numberOfPlayers);
      setTurnIndex(firstPlayer);
      setTurnNumber(firstPlayer);
      setMoveLog([`Game started. Player ${firstPlayer} begins.`]);
    }, 2000)
  }, []);
    
  const handlePickUpPile = (playerIndex) => {
    if (pile.length === 0) return;

    const pileCopy = [...pile]; // snapshot before clearing

    setMoveLog(prev => [...prev, `Player picked up the pile`]);
    setPlayers(prev => {
      const updated = [...prev];
      const currentPlayer = { ...updated[playerIndex] };
      const newHand = [...currentPlayer.hand, ...pileCopy];
      if (currentPlayer.mystery.filter(c => selectedCards.includes(c)).length > 0) {
        newHand.push(...currentPlayer.mystery.filter(c => selectedCards.includes(c)));
        currentPlayer.mystery = currentPlayer.mystery.filter(c => !selectedCards.includes(c));
      }
      newHand.sort((a, b) => a.rank - b.rank);
      updated[playerIndex] = {
        ...currentPlayer,
        hand: newHand,
      };
      return updated;
    });
    
    setPile([]); // clear pile
    setSelectedCards([]);
    setTimeout(() => {
      setTurnIndex((prev) => (prev + 1) % players.length);
      setTurnNumber((prev) => prev + 1);
    }, 1000);
  };

  const handlePlaySelected = () => {
    if (selectedCards.length === 0) return;

    const top = pile[pile.length - 1];
    const legal = selectedCards.every(c => !top || c.rank <= top.rank || c.rank === 13);
    const sameRank = selectedCards.every(c => c.rank === selectedCards[0].rank);

    if (!legal) {
      setMoveLog(prev => [...prev, `Invalid card selection`]);
      return;
    }

    if (!sameRank) {
      setMoveLog(prev => [...prev, `All selected cards must be the same rank`]);
      return;
    }

    const updatedPile = processPile(pile, selectedCards);
    //const updatedPile = [...pile, ...selectedCards];
    setPile(updatedPile);
    //setTopPileCards(updatedPile);
    //setTopPileCards(updatedPile.slice(-4));
    setMoveLog(prev => [...prev, `Player played ${selectedCards.length} x ${selectedCards[0].rank}`]);

    // Update player hand and faceUp
    const updatedPlayers = [...players];
    const currentPlayer = { ...updatedPlayers[turnIndex] };
    currentPlayer.hand = currentPlayer.hand.filter(c => !selectedCards.includes(c));
    currentPlayer.faceUp = currentPlayer.faceUp.filter(c => !selectedCards.includes(c));
    currentPlayer.mystery = currentPlayer.mystery.filter(c => !selectedCards.includes(c));
    if (currentPlayer.hand.length === 0 && currentPlayer.faceUp.length === 0 && currentPlayer.mystery.length === 0) {
      setMoveLog(prev => [...prev, `Player ${turnIndex} has won the game!`]);
      // Game over logic can be added here
    } 
    updatedPlayers[turnIndex] = currentPlayer;
    setPlayers(updatedPlayers);

    setSelectedCards([]);
    // don't advance turn if pile was cleared - go again 
    setTurnIndex((prev) => (prev + (updatedPile.length === 0 ? players.length : 1)) % players.length); // Optional turn rotation
    setTurnNumber((prev) => prev + 1);
  };

/////////
/*
const [progress, setProgress] = useState(0);
const [status, setStatus] = useState('Starting...');

useEffect(() => {
  let step = 0;
  const steps = ['Loading deck...', 'Dealing cards...', 'Shuffling...', 'Ready!'];

  const timer = setInterval(() => {
    setStatus(steps[step]);
    setMoveLog(prev => [...prev, steps[step]]);
    setProgress(step);
    step++;

    if (step >= steps.length) clearInterval(timer);
  }, 1000);

  return () => clearInterval(timer);
}, [pile]);
*/
////////

useEffect(() => {
  if (players.length === 0) return;
  if (players[turnIndex].type === "human") return;

  const botId = turnIndex;
  const botHand = players[botId];
  const pileTop = pile[pile.length - 1];
  const move = botTurn(botHand, pileTop, pile);
  let samePlayer = false;

  if (move.action === 'pickup') {
    setMoveLog(prev => [...prev, `Bot ${turnIndex} picked up the pile`]);
    setPlayers(prev => {
      const updated = [...prev];
      const currentPlayer = { ...updated[botId] };
      const newHand = [...currentPlayer.hand, ...pile];
      if (currentPlayer.mystery.filter(c => selectedCards.includes(c)).length > 0) {
        newHand.push(...currentPlayer.mystery.filter(c => selectedCards.includes(c)));
        currentPlayer.mystery = currentPlayer.mystery.filter(c => !selectedCards.includes(c));
      }
      updated[botId] = {
        ...currentPlayer,
        hand: newHand,
      };
      return updated;
    });
    setPile([]);

  } else if (move.action === 'play') {
    setMoveLog(prev => [...prev, `Bot ${turnIndex} played ${move.cards.length} x ${move.cards[0].rank}`]);
    const updatedPile = processPile(pile, move.cards);
    if (updatedPile.length === 0) {
      samePlayer = true;
    } 
    //const updatedPile = [...pile, ...move.cards];
    setPile(updatedPile);
    setPlayers(prev => {
      const updated = [...prev];
      updated[botId].hand = updated[botId].hand.filter(c => !move.cards.includes(c));
      updated[botId].faceUp = updated[botId].faceUp.filter(c => !move.cards.includes(c));
      updated[botId].mystery = updated[botId].mystery.filter(c => !move.cards.includes(c));
      if (updated[botId].hand.length === 0 && updated[botId].faceUp.length === 0 && updated[botId].mystery.length === 0) {
        setMoveLog(prev => [...prev, `Bot ${botId} has won the game!`]);
        // Game over logic can be added here
      } 
      return updated;
    });
  } 

  const nextTurn = (turnIndex +  (samePlayer ? players.length : 1)) % players.length;
  //setTimeout(() => setTurnIndex(nextTurn), 2000);
  setTimeout(() => {
    setTurnIndex(nextTurn);
    setTurnNumber(prev => prev + 1);
  }, 1000);
  
}, [turnNmber]);

  const handleCardClick = (card, playerType, cardType, playerIndex) => {
    if (playerType !== 'human') return;
    if (cardType === 'mystery') {
      if (selectedCards.includes(card)) {
        setMoveLog(prev => [...prev, 'You cannot deselect a mystery card']);
        return;
      } else {
        // can't reveal more than one mystery card at a time
        if (selectedCards.filter(c => playerIndex === turnIndex && players[turnIndex].mystery.includes(c)).length > 0) {
          setMoveLog(prev => [...prev, 'You can only reveal one mystery card at a time']);
          return;
        }
        setMoveLog(prev => [...prev, 'You have revealed a mystery card!']);
        setSelectedCards([...selectedCards, card]);
      }
    } else {
     if (selectedCards.includes(card)) {
        setSelectedCards(selectedCards.filter(c => c !== card));
      } else {
        setSelectedCards([...selectedCards, card]);
      }
    }   
  };

  if (!players || players.length === 0) {
    return (<div>Loading players...</div>);
  } else {
    return (
      <>
      <CircularLayout players={players} selectedCards={selectedCards} handleCardClick={handleCardClick} handlePickUpPile={handlePickUpPile} handlePlaySelected={handlePlaySelected}/>  
      <div className="pile-log">
          <LogPlays moveLog={moveLog} />
        </div>
        <div className="bot-status">
          <Pile pile={pile} handlePickUpPile={handlePickUpPile} playerIndex={turnIndex} isHuman={players[turnIndex].type === 'human'}/>
        </div>
        </>
    )

    /*
    return (
      <div class="container text-center">
        <div class="row">
          <div class="col">
            1 of 3
          </div>
          <div class="col">
            2 of 3
          </div>
          <div class="col">
            3 of 3
          </div>
        </div>
        <div class="row">
          <div class="col">
            1 of 2
          </div>
          <div class="col">
            2 of 2
          </div>
        </div>
        <div class="row">
          <div class="col">
            1 of 3
          </div>
          <div class="col">
            2 of 3
          </div>
          <div class="col">
            3 of 3
          </div>
        </div>
      </div>
    )
*/
  }
}
  
export default App;

    /*
    return (
      <div className="game-table">
        <div className="pile-log">
          <LogPlays moveLog={moveLog} />
        </div>
        <div className="bot-status">
          <Pile pile={pile} />
        </div>
        <div className="players">
          {players.map((player, i) => (
            <PlayerStatus
              playerIndex={i}
              key={i}
              player={player}
              hand={player.hand}
              faceUp={player.faceUp}
              selectedCards={selectedCards}
              handleCardClick={handleCardClick}
              handlePlaySelected={handlePlaySelected}
              handlePickUpPile={handlePickUpPile}
            />
          ))}
        </div>
      </div>
    );
    */
