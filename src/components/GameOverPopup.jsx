import React from 'react';
import Scores from './Scores';

//import './Popup.css'; // Assuming you have some CSS for styling

const GameOverPopup = ({ onClose, children, players, gameOver, handleNewRound }) => {
  if (!gameOver) {
    return null; // Don't render anything if 'show' is false
  }

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <p>The player with the lowest totalscore when any player reaches 500 is the game winner.</p>
        <Scores players={players} gameOver={gameOver} /><div className='row button-group'>
                <div className="row button-group">
                    <div className='col-4'>
                        <button onClick={() => onClose()}>Close</button>
                    </div>
                    <div className={'col-4' + ((players.filter((p) => p.winner).length > 0) ? ' new-round-not-visible' : ' new-round-visible')}>
                        <button onClick={() => handleNewRound(false)}>Deal New Round</button>
                    </div>
                    <div className='col-4'>
                        <button onClick={() => handleNewRound(true)}>Deal New Game</button>
                    </div>
                </div>
            </div>
        {children}
      </div>
    </div>
  );
};

export default GameOverPopup;