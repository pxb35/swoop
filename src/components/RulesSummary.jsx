import Scores from './Scores';
import BootstrapModal from './BootstrapModal';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import './RulesSummary.css'; 

const RulesSummary = (params) => {

    const onClose = () => params.setShowRules(false);

    return (
        
      <Modal show={params.showRules} onHide={onClose} className="rules-summary-modal">
        <Modal.Header closeButton>
          <Modal.Title>Swoop Quick Reference</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>Turn Basics</h4>
            <p>Play proceeds clockwise. On your turn, you must either:</p>
            <ul>
                <li><strong>Play cards</strong> onto the Center Pile, or</li>
                <li><strong>Take the pile</strong> if you cannot play.</li>
            </ul> 
            <hr />
            <h4>Playing Cards</h4>
            <p>You may play <strong>one or more cards of the same rank</strong> from your hand or board. Cards must be <strong>equal to or lower</strong> than the last card(s) in the pile.</p>
            <hr />
            <h4>SWOOP!</h4>
            <p>A <strong>SWOOP</strong> occurs when <strong>four or more of the same rank</strong> are played consecutively. Playing a <strong>SWOOP card</strong> also clears the pile immediately. After a swoop, the pile is discarded and you continue your turn.</p>
            <hr />
            <h4>Mystery Cards</h4>
            <p>Mystery cards are face-down until uncovered. Once uncovered, they must be played immediately. If the revealed card is too high to play, you must take the pile.</p>
            <hr /> 
            <h4>Taking the Pile</h4>
            <p>If you cannot play a valid card (or SWOOP card), you must:</p>
            <ol>
                <li>Take the entire pile into your hand.</li>
                <li>End your turn.</li>
            </ol>
            <hr />
            <h4>Ending a Round</h4>
            <p>A round ends when a player has <strong>no cards left</strong> (hand, board, mystery). Everyone else totals their remaining cards.</p>
            <p>The player with the lowest total score when any player reaches 500 is the game winner.</p>

        </Modal.Body>
        <Modal.Footer>
            <button className="btn btn-primary" onClick={() => onClose()}>Close</button>
        </Modal.Footer>
    </Modal>
  );
};

export default RulesSummary;