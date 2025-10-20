import { useState, useEffect, useRef } from 'react';
import './App.css';
import createDeck, { shuffle } from './components/deckUtils';
import calculateScores from './components/calculateScores';
import processPile from './components/pileUtils';
import { dealPlayers } from './components/dealPlayers';
import { botTurn } from './components/botLogic';
import RectangularLayout from './components/RectangularLayout';
import tossCardsOnPile from './components/animationUtils';  

const numberOfPlayers = 5
const interactivePlayers = [0]; // Only the first player is human
const turnDelay = 500;
const firstPlayer = Math.floor(Math.random() * numberOfPlayers);

export default function App() {
  // Game state
  const [players, setPlayers] = useState([]);
  const [pile, setPile] = useState([]);
  const [moveLog, setMoveLog] = useState([]);
  const [turnIndex, setTurnIndex] = useState(firstPlayer);
  const [turnNumber, setTurnNumber] = useState(firstPlayer);
  const [selectedCards, setSelectedCards] = useState([]);
  const [pilePicked, setPilePicked] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [ignoreEvents, setIgnoreEvents] = useState(false);
  //const [showPopup, setShowPopup] = useState(false);

  const handleClosePopup = () => {
    setGameOver(false);
  }

  // Initialize deck and players -runs once
  useEffect(() => {
    if (ignoreEvents) return;

    const deck = createDeck(numberOfPlayers);
    const dealtPlayers = dealPlayers(deck, numberOfPlayers, interactivePlayers);
    console.log(dealtPlayers);
    setPlayers(dealtPlayers);

    setMoveLog([`Game started. Player ${firstPlayer} begins.`]);
    setTurnIndex(firstPlayer);
    setTurnNumber(firstPlayer);

  }, []);
  
  // whenever the player object changes
  useEffect(() => {
    if (ignoreEvents) return;
    if (!players || players.length === 0) return;

    if (players[turnIndex].hand.length === 0 && players[turnIndex].faceUp.length === 0 && players[turnIndex].mystery.length === 0) {
      setMoveLog(prev => [...prev, `Player ${turnIndex} has won the round!`]);
      // if I use a function, the assignment should be sync
      setTimeout(() => {
        setGameOver(function() {
         return true;
        });
      }, turnDelay);
    } else {
      
      console.log('pile length: ' + pile.length.toString() + ' players len: ' + players.length.toString() + (pilePicked ? ' pile picked' : ' pile NOT picked')); 

      console.log('1 turn index and number: ' + turnIndex.toString() + ' / ' + turnNumber.toString());
      //setTurnIndex((prev) => (prev + ((pile.length === 0 && !pilePicked) ? players.length : 1)) % players.length); // Optional turn rotation
      if (pile.length === 0 && !pilePicked) {
        setTurnIndex((prev) => prev % players.length); // same player goes again
      } else {
        setTurnIndex((prev) => (prev + 1) % players.length );
      }
      setTimeout(() => {
        setTurnNumber((prev) => prev + 1);
      }, turnDelay);
      
      console.log('2 turn index and number: ' + turnIndex.toString() + ' / ' + turnNumber.toString());
    }
  }, [players]);

  // run when turn number changes - bot logic
useEffect(() => {
  if (ignoreEvents) return;
  
  console.log('3 turn index and number: ' + turnIndex.toString() + ' / ' + turnNumber.toString());
  setSelectedCards([]);
  if (players.length === 0) return;
  if (!turnIndex) return;
  if (players[turnIndex].type === "human") return;

  const botId = turnIndex;
  const botHand = players[botId];
  const move = botTurn(botHand, pile);
  let samePlayer = false;

  setPilePicked(false);
  if (move.action === 'pickup') {
    setPilePicked(true);
    const updated = handlePickUpPile(turnIndex);
    //return updated;
  } else if (move.action === 'play') {
    // animation
    tossCardsOnPile(move.cards, 'pileId');
    //for (let i=0; i<move.cards.length; i++) {
      //const cardDOMId = document.getElementById('card-' + move.cards[i].deckIndex.toString());
      
      //console.log('move cards:' + move.cards.length);
      
      //cardDOMId.click();
    //}
    //setTimeout(() => {
    //  handlePlaySelected();
    //}, 3000);

    // add cards to selected list
    const updateSelected = [...move.cards];
    setTimeout(() => {
      setSelectedCards(updateSelected);
    }, turnDelay / 1.2);
  } 
  
}, [turnNumber]);

// run when selected cards change
useEffect(() => {
  if (ignoreEvents) return;
  if (players && players.length > 0 && players[turnIndex].type === "human") return;
  if (selectedCards && selectedCards.length > 0) handlePlaySelected();
}, [selectedCards]);

  const handlePickUpPile = (playerIndex) => {
  
    if (pile.length === 0) return;

    const pileCopy = [...pile]; // snapshot before clearing

    console.log('Player ' + playerIndex.toString() + ' is picking up the pile');
    setMoveLog(prev => [...prev, 'Player ' + playerIndex.toString() + ' picked up the pile']);
    setPlayers(prev => {
      const updated = [...prev];
      const currentPlayer = { ...updated[playerIndex] };
      const newHand = [...currentPlayer.hand, ...pileCopy];

      // move the revealed mystery card (if there is one) to the players hand
      if (currentPlayer.mystery.filter(c => selectedCards.includes(c)).length > 0) {
        newHand.push(...currentPlayer.mystery.filter(c => selectedCards.includes(c)));
        currentPlayer.mystery = currentPlayer.mystery.filter(c => !selectedCards.includes(c));
      }

      // only sort for the human player
      if (currentPlayer.type === 'human') {
        newHand.sort((a, b) => a.rank - b.rank);
      }
      updated[playerIndex] = { ...currentPlayer, hand: newHand,};
      setPile([]); // clear pile
      
      setSelectedCards([]);
      setPilePicked(true);

      console.log(updated);
      return updated;
    });
    
  };

  const handleCardClick = (card, player) => {

    // no selecting another person's cards
    if (players[turnIndex] !== player) {
      setMoveLog(prev => [...prev, 'What do you think you are doing?']);
      return;
    }

    // see if the user is selecting or de-selecting a mystery card
    const updatedSelected = [...selectedCards];
    if (player.mystery.includes(card)) {
      if (updatedSelected.includes(card)) {
        setMoveLog(prev => [...prev, 'You cannot deselect a mystery card']);
        return;
      } else {
        // can't reveal more than one mystery card at a time
        if (updatedSelected.filter(c => player.mystery.includes(c)).length > 0) {
          setMoveLog(prev => [...prev, 'You can only reveal one mystery card at a time']);
          return;
        } 
        // you can't reveal a mystery card after selecting another card
        if (updatedSelected.length > 0) {
          setMoveLog(prev => [...prev, "You can't reveal a mystery card after selecting another card"]);
          return;
        }
        setMoveLog(prev => [...prev, 'You have revealed a mystery card!']);
        setSelectedCards([...updatedSelected, card]);
      }
    } else {
      if (updatedSelected.includes(card)) {
        // unpick a card
        setSelectedCards(updatedSelected.filter(c => c !== card));
      } else {
        setSelectedCards([...updatedSelected, card]);
      }
    }
  }

  const handleNewRound = (wholeNewGame) => {
    setIgnoreEvents(true);
    //clear the cards
    let updatedPlayers = [...players];
    const deck = createDeck(numberOfPlayers);
    let cardIndex = 0;
    
    for (let i = 0; i < updatedPlayers.length; i++) {
        updatedPlayers[i]['hand'] = [];
        updatedPlayers[i]['faceUp'] = [];
        updatedPlayers[i]['mystery'] = [];
        updatedPlayers[i]['roundScore'] = 0;
        updatedPlayers[i]['winner'] = false;
        if (wholeNewGame) updatedPlayers[i]['totalScore'] = 0;

        // use a new deck
        for (let j = 0; j < 4; j++) {
           updatedPlayers[i]['mystery'][j] = deck[cardIndex];
           cardIndex++;
        }
        for (let j = 0; j < 4; j++) {
           updatedPlayers[i]['faceUp'][j] = deck[cardIndex];
           cardIndex++;
        }
        for (let j = 0; j < 11; j++) {
            updatedPlayers[i]['hand'][j] = deck[cardIndex];
            cardIndex++;
        }
        updatedPlayers[i]['hand'].sort((a, b) => a.rank - b.rank);
    }
    
    /*
    //----------  added this to test ---------
    cardIndex = 0;
    for (let i = 0; i < updatedPlayers.length; i++) {
        updatedPlayers[i]['hand'] = [];
        updatedPlayers[i]['faceUp'] = [];
        updatedPlayers[i]['mystery'] = [];
        for (let j=0; j<2; j++) {
            updatedPlayers[i]['hand'][j] = deck[cardIndex];
            cardIndex++;
        }
    }
    // ------- end of test section ----------
    */

    setPlayers(updatedPlayers)
    setPile([]);
    setMoveLog([]);
    setSelectedCards([]);
    setPilePicked(false);
    setGameOver(false);
    setIgnoreEvents(false);

    const newFirstPlayer = Math.floor(Math.random() * numberOfPlayers);
    setMoveLog([`Game started. Player ${newFirstPlayer} begins.`]);
    setTurnIndex(newFirstPlayer);
    //setTurnNumber(newFirstPlayer);
  }

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

    setPilePicked(false);
    
    // Add selected cards to pile
    const updatedPile = processPile(pile, selectedCards);
    setPile(updatedPile);
    setMoveLog(prev => [...prev, 'Player ' + turnIndex + ' played ' + selectedCards.length.toString() + ' x ' + (selectedCards[0].rank === 13 ? 'swoop' : selectedCards[0].rank.toString())]);
    console.log('Player ' + turnIndex + ' played ' + selectedCards.length.toString() + ' x ' + (selectedCards[0].rank === 13 ? 'swoop' : selectedCards[0].rank.toString()));

    // Update player hand and faceUp
    const updatedPlayers = [...players];
    const currentPlayer = { ...updatedPlayers[turnIndex] };
    currentPlayer.hand = currentPlayer.hand.filter(c => !selectedCards.includes(c));
    currentPlayer.faceUp = currentPlayer.faceUp.filter(c => !selectedCards.includes(c));
    currentPlayer.mystery = currentPlayer.mystery.filter(c => !selectedCards.includes(c));
    if (currentPlayer.hand.length === 0 && currentPlayer.faceUp.length === 0 && currentPlayer.mystery.length === 0) {
      // game over
      updatedPlayers[turnIndex] = currentPlayer;
      const playerScores = calculateScores(updatedPlayers);
      for (let i=0; i<updatedPlayers.length; i++) {
        updatedPlayers[i].roundScore = playerScores.scores[i].roundScore;
        updatedPlayers[i].totalScore = playerScores.scores[i].totalScore;
        if (playerScores.gameOver && playerScores.lowestPlayer === i) updatedPlayers[i].winner = true;
      }
    } else {
      updatedPlayers[turnIndex] = currentPlayer;
    }
    console.log(updatedPlayers);
    setPlayers(updatedPlayers);
  }

  if (!players || players.length === 0) {
    return (<div>Loading players...</div>);
  } else {
    return (
      <div>
        <RectangularLayout players={players} 
                        pile={pile} 
                        playerIndex={turnIndex} 
                        selectedCards={selectedCards} 
                        handleCardClick={handleCardClick} 
                        handlePickUpPile={handlePickUpPile} 
                        handlePlaySelected={handlePlaySelected}
                        moveLog={moveLog}
                        gameOver={gameOver}
                        handleClosePopup={handleClosePopup}
                        handleNewRound={handleNewRound}
                    />
        <div></div>
      </div>  
    );
  }
 }

