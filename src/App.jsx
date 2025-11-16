import { useState, useEffect, useRef } from 'react';
import './App.css';
import createDeck, { shuffle } from './components/deckUtils';
import calculateScores from './components/calculateScores';
import processPile from './components/pileUtils';
import { dealPlayers } from './components/dealPlayers';
import { botTurn } from './components/botLogic';
import RectangularLayout from './components/RectangularLayout';
import tossCardsOnPile, { swoopBird, breezeCardsAway, AnimatePickuPile } from './components/animationUtils';
//import swoopBird from './components/swoopBird';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Example from './components/Example';
import GameSettings, { getSettings } from './components/GameSettings';
import FullscreenComponent from './components/FullScreenComponent';

let numberOfPlayers = 4;
const interactivePlayers = [0]; // Only the first player is human
const turnDelay = 750;
let cntr = 0;
let firstPlayer = 0;
let duplicateRun = false;

// keep track of last turnNumber so we check if it has really changed

export default function App() {

  // Game state
  const [players, setPlayers] = useState([]);
  const [pile, setPile] = useState([]);
  const [moveLog, setMoveLog] = useState([0]);
  const [turnIndex, setTurnIndex] = useState(0);
  const [turnNumber, setTurnNumber] = useState(0);
  const [selectedCards, setSelectedCards] = useState([]);
  const [pilePicked, setPilePicked] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [ignoreEvents, setIgnoreEvents] = useState(false);
  const [revealCardsIsChecked, setRevealCardsIsChecked] = useState(false);
  const [selectDisabled, setSelectDisabled] = useState(false);

  //const [showPopup, setShowPopup] = useState(false);

  // -- initialize deck and players -runs once --
  useEffect(() => {
    if (ignoreEvents) return;

    const settings = getSettings();
    if (settings) {
      numberOfPlayers = settings.playerCount;
      setRevealCardsIsChecked(settings.revealCards);
    }
    firstPlayer = Math.floor(Math.random() * numberOfPlayers);
    const deck = createDeck(numberOfPlayers);
    const dealtPlayers = dealPlayers(deck, numberOfPlayers, interactivePlayers, settings);
    //console.log(dealtPlayers);
    setPlayers(dealtPlayers);

    setMoveLog([`Game started. Player ${firstPlayer} begins.`]);
    //console.log([`Game started. Player ${firstPlayer} begins.`]);
    setTurnIndex(firstPlayer);
    setTurnNumber(firstPlayer);

    setPile([]);

  }, []);
  
  // -- whenever the player object changes --
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
        let turnNumberCopy = turnNumber;
        if (pile.length === 0 && !pilePicked) {
          // same player
          turnNumberCopy += players.length;
        } else {
          turnNumberCopy++;
        }
        setTurnIndex(turnNumberCopy % players.length);
        setTurnNumber(turnNumberCopy);
        duplicateRun = false;
          
        //console.log('turnIndex: ' + turnIndex.toString() + ' /turnNumber: ' + turnNumber.toString() + ' /urnNumberCopy: ' + turnNumberCopy.toString());
      //}, turnDelay);
      
      //console.log('2 turn index and number: ' + turnIndex.toString() + ' / ' + turnNumber.toString());
    }
  }, [pile]);

  // -- run when turn number changes - bot logic --
  useEffect(() => {

    if (duplicateRun) {
      duplicateRun = false;
      return;
    }
    duplicateRun = true;

    //console.log('turnIndex II: ' + turnIndex.toString() + ' / ' + turnNumber.toString());
        
    if (ignoreEvents) return;
    if (!players || players.length === 0) return;
    
    //console.log('3 turn index and number: ' + turnIndex.toString() + ' / ' + turnNumber.toString());
    setSelectedCards([]);
    if (players.length === 0) return;
    if (!turnIndex) return;
    if (players[turnIndex].type === "human") return;

    const botId = turnIndex;
    const botHand = players[botId];
    const move = botTurn(pile, players, turnIndex);
    let samePlayer = false;

    setPilePicked(false);
    if (move.action === 'pickup') {
      setPilePicked(true);
      //console.log('botlogic: ', move);
      const updated = handlePickUpPile(turnIndex, move.cards);
      //return updated;
    } else if (move.action === 'play') {
      
      // add cards to selected list
      const updateSelected = [...move.cards];
      setSelectedCards(updateSelected);
    } 
    
  }, [turnNumber]);

  // -- run when selected cards change --
  useEffect(() => {
    if (ignoreEvents) return;
    if (players && players.length > 0 && players[turnIndex].type === "human") return;
    if (selectedCards && selectedCards.length > 0) handlePlaySelected();
  }, [selectedCards]);

  //----- event handlers -----
  // --Player picks up pile --
  const handlePickUpPile = (playerIndex, addToHand) => {
  console.log(playerIndex);
  console.log(addToHand);

    if (pile.length === 0) return;

    const pileCopy = [...pile]; // snapshot before clearing

    console.log('Player ' + playerIndex.toString() + ' is picking up the pile');
    setMoveLog(prev => [...prev, 'Player ' + playerIndex.toString() + ' picked up the pile']);
    
    AnimatePickuPile(pileCopy, playerIndex);
    setTimeout(() => {
      setPlayers(prev => {
        const updated = [...prev];
        const currentPlayer = { ...updated[playerIndex] };
        const newHand = [...currentPlayer.hand, ...pileCopy];

        // move the revealed mystery card (if there is one) to the players hand
        if (addToHand && currentPlayer.mystery.filter(c => addToHand.includes(c)).length > 0) {
          newHand.push(...currentPlayer.mystery.filter(c => addToHand.includes(c)));
          currentPlayer.mystery = currentPlayer.mystery.filter(c => !addToHand.includes(c));
        }

        // only sort for the human player
        if (currentPlayer.type === 'human') {
          newHand.sort((a, b) => a.rank - b.rank);
        }
        updated[playerIndex] = { ...currentPlayer, hand: newHand,};

        setPile([]); // clear pile
        
        setSelectedCards([]);
        setPilePicked(true);

        //console.log(updated);
        return updated;
      });
    }, turnDelay / .4);
  };

  // -- Player clicks on a card --
  const handleCardClick = (card, player) => {
    if (selectDisabled) return;

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

  // -- Start a new round or game --
  const handleNewRound = (wholeNewGame) => {
    setIgnoreEvents(true);
    //clear the cards
    if (wholeNewGame) {
      const settings = getSettings();
      if (settings) {
        numberOfPlayers = settings.playerCount;
      }
      const deck = createDeck(numberOfPlayers);
      const dealtPlayers = dealPlayers(deck, numberOfPlayers, interactivePlayers, settings);
      //console.log(dealtPlayers);
      setPlayers(dealtPlayers);

      firstPlayer = Math.floor(Math.random() * numberOfPlayers);
      
      setMoveLog([`Game started. Player ${firstPlayer} begins.`]);
      setIgnoreEvents(false);
  
      setTurnIndex(firstPlayer);
      setTurnNumber(firstPlayer);

    } else {
      
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

      //console.log(updatePlayers);
      setPlayers(updatedPlayers)
      setPile([]);
      setMoveLog([]);
      setSelectedCards([]);
      setPilePicked(false);
      setGameOver(false);
      setIgnoreEvents(false);

      firstPlayer = (firstPlayer + 1) % numberOfPlayers;
      setMoveLog([`Game started. Player ${firstPlayer} begins.`]);
      setTurnIndex(firstPlayer);
      setTurnNumber(firstPlayer);
    }
    setPile([]);
  }

  // -- Player plays selected cards --
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

    setSelectDisabled(true);
    setPilePicked(false);
    tossCardsOnPile(selectedCards, 'pileId');
    
    setTimeout(() => {
      updatePileAndPlayers();
    }, turnDelay / .75);
  }

  // -- update pile and players after playing selected cards --
  const updatePileAndPlayers = () => {
    // Add selected cards to pile - show the cards briefly on the pile before showing the updated pile
    const newPile = [...pile, ...selectedCards];
    //setPile(newPile);
    const updatedPile = processPile(pile, selectedCards);
    if (updatedPile.length === 0) {
      //swoopBird();
      breezeCardsAway(newPile);
      setTimeout(() => {
        setPile(updatedPile);
        updatePlayers()
        setMoveLog(prev => [...prev, 'Swoop! The pile has been cleared!']);  
        setSelectDisabled(false);
      }, turnDelay/.25);  
    } else {
      setPile(updatedPile);
      updatePlayers();
      setSelectDisabled(false);
    }   
  }

  const updatePlayers = () => {
      
    setMoveLog(prev => [...prev, 'Player ' + turnIndex + ' played ' + selectedCards.length.toString() + ' x ' + (selectedCards[0].rank === 13 ? 'swoop' : selectedCards[0].rank.toString())]);
    console.log('Player ' + turnIndex + ' played ' + selectedCards.length.toString() + ' x ' + (selectedCards[0].rank === 13 ? 'swoop' : selectedCards[0].rank.toString()));

    // Update player hand and faceUp
    const updatedPlayers = [...players];
    const currentPlayer = { ...updatedPlayers[turnIndex] };
    currentPlayer.hand = currentPlayer.hand.filter(c => !selectedCards.includes(c));
    currentPlayer.faceUp = currentPlayer.faceUp.filter(c => !selectedCards.includes(c));
    currentPlayer.mystery = currentPlayer.mystery.filter(c => !selectedCards.includes(c));
    if (currentPlayer.hand.length === 0 && currentPlayer.faceUp.length === 0 && currentPlayer.mystery.length === 0) {
      // round over
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
    //console.log(updatedPlayers);
    setPlayers(updatedPlayers);
  }

  const handleSettingsClick = () => {
    const currentSetting = showSettings;
    setShowSettings(!currentSetting);
  }

  const handleClosePopup = () => {
    setGameOver(false);
  }

  const handleCloseSettings = () => {
    setShow(false); 
  }
  
  // -- build the DOM for the game --
  //cntr++;
  //console.log('refreshes: ' + cntr.toString());
    
  if (!players || players.length === 0) {
    console.log('loading');
    return (<div className='loading-message'>Loading players...</div>);
  } else {
    /// console.log('loaded');
    return (
      <div className="App">
       
        <RectangularLayout players={players} 
                        pile={pile} 
                        playerIndex={turnIndex} 
                        selectedCards={selectedCards} 
                        handleCardClick={handleCardClick} 
                        handlePickUpPile={handlePickUpPile} 
                        handlePlaySelected={handlePlaySelected}
                        moveLog={moveLog}
                        gameOver={gameOver}
                        handleNewRound={handleNewRound}
                        showSettings={showSettings} 
                        handleCloseSettings={handleCloseSettings}
                        handleClosePopup={handleClosePopup}
                        revealCardsIsChecked={revealCardsIsChecked}
                    />
            
            <GameSettings handleNewRound={handleNewRound} 
                          setRevealCardsIsChecked={setRevealCardsIsChecked}
                          revealCardsIsChecked={revealCardsIsChecked}
                     />           
      
      </div>
    );
  }
 }

