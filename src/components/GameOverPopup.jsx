import Scores from './Scores';
import BootstrapModal from './BootstrapModal';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import './GameOverPopup.css'; 

const GameOverPopup = ({ onClose, children, players, gameOver, handleNewRound }) => {
  if (!gameOver) {
    return null; // Don't render anything if 'show' is false
  }

  return (
      <Modal show={gameOver} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>We Have a Winner</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>The player with the lowest totalscore when any player reaches 500 is the game winner.</p>
              <h4 className="round-winner">{ players.filter((p) => p.roundScore === 0).length > 0 ? players.filter((p) => p.roundScore === 0)[0].name : "Nobody"} won the round.</h4>
              <h2 className="game-winner">{ players.filter((p) => p.winner).length > 0 ? players.filter((p) => p.winner)[0].name + " won the game!" : "Nobody has won the game yet"}</h2>
              <Scores players={players} />
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-primary" onClick={() => onClose()}>Close</button>
              <button className="btn btn-primary" onClick={() => handleNewRound(false)}>Deal New Round</button>
              <button className="btn btn-primary" onClick={() => handleNewRound(true)}>Deal New Game</button>
            </Modal.Footer>
          </Modal>
  );
};

export default GameOverPopup;