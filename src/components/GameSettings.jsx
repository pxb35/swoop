import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Form } from 'react-bootstrap';
import "./GameSettings.css";
    
export default function GameSettings(params) {
 
  const handleRevealOptionChange = (event) => {
     params.setRevealCardsIsChecked(event.target.checked);
     handleSave();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSave = () => {
    const newSettings = {
      playerCount:    parseInt(playerOption.split('-')[1]),
      playerName1:    playerName1,
      playerName2:    playerName2,
      playerName3:    playerName3,
      playerName4:    playerName4,
      playerName5:    playerName5,
      playerName6:    playerName6,
      playerName7:    playerName7,
      playerName8:    playerName8,
      revealCards:    params.revealCardsIsChecked
    }
    localStorage.setItem('settings', JSON.stringify(newSettings));
    setSaved(true);
  }

      const storedSettings = getSettings();

      const [playerOption, setPlayerOption] = useState('option-' + storedSettings.playerCount);
      const [playerName1, setPlayerName1] = useState(storedSettings.playerName1);
      const [playerName2, setPlayerName2] = useState(storedSettings.playerName2);
      const [playerName3, setPlayerName3] = useState(storedSettings.playerName3);
      const [playerName4, setPlayerName4] = useState(storedSettings.playerName4);
      const [playerName5, setPlayerName5] = useState(storedSettings.playerName5);
      const [playerName6, setPlayerName6] = useState(storedSettings.playerName6);
      const [playerName7, setPlayerName7] = useState(storedSettings.playerName7);
      const [playerName8, setPlayerName8] = useState(storedSettings.playerName8);
      const [saved, setSaved] = useState(true);
/*
      const [saveSettings, setSaveSettings] = useState(false);
      
      useEffect(() => {
          if (saveSettings) {
              
            const newSettings = {
              playerCount:    playerOption.split('-')[1],
              playerName1:    playerName1,
              playerName2:    playerName2,
              playerName3:    playerName3,
              playerName4:    playerName4,
              playerName5:    playerName5,
              playerName6:    playerName6,
              playerName7:    playerName7,
              playerName8:    playerName8
            }
            localStorage.setItem('settings', JSON.stringify(newSettings));
            setSaveSettings(false);
          }
        }, [saveSettings]);
  */      
      return (
        <>
          <Button variant="primary" onClick={handleShow} className="settings">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
            <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
          </svg>
          </Button>

          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Game Settings</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="number-of-players section">
                <p className="settings label">Number of Players</p>
                <input type="radio" className="btn-check" name="options-players" id="players-2" autoComplete="off" value="option-2" checked={playerOption === 'option-2'} 
                      onChange={(e) => {setPlayerOption(e.target.value); setSaved(false); } } />
                <label className="btn" htmlFor="players-2">2</label>

                <input type="radio" className="btn-check" name="options-players" id="players-3" autoComplete="off" value="option-3" checked={playerOption === 'option-3'} 
                     onChange={(e) => {setPlayerOption(e.target.value); setSaved(false); } } />
                <label className="btn" htmlFor="players-3">3</label>

                <input type="radio" className="btn-check" name="options-players" id="players-4" autoComplete="off" value="option-4" checked={playerOption === 'option-4'} 
                      onChange={(e) => {setPlayerOption(e.target.value); setSaved(false); } } />
                <label className="btn" htmlFor="players-4">4</label>

                <input type="radio" className="btn-check" name="options-players" id="players-5" autoComplete="off" value="option-5" checked={playerOption === 'option-5'}
                      onChange={(e) => {setPlayerOption(e.target.value); setSaved(false); } } />
                <label className="btn" htmlFor="players-5">5</label>

                <input type="radio" className="btn-check" name="options-players" id="players-6" autoComplete="off" value="option-6" checked={playerOption === 'option-6'} 
                      onChange={(e) => {setPlayerOption(e.target.value); setSaved(false); } } />
                <label className="btn" htmlFor="players-6">6</label>

                <input type="radio" className="btn-check" name="options-players" id="players-7" autoComplete="off" value="option-7" checked={playerOption === 'option-7'} 
                      onChange={(e) => {setPlayerOption(e.target.value); setSaved(false); } } />
                <label className="btn" htmlFor="players-7">7</label>

                <input type="radio" className="btn-check" name="options-players" id="players-8" autoComplete="off" value="option-8" checked={playerOption === 'option-8'} 
                      onChange={(e) => {setPlayerOption(e.target.value); setSaved(false); } } />
                <label className="btn" htmlFor="players-8">8</label>
            </div>
            <div className="player-names section">
              <p className="settings label">Player Names</p>
              
              <div className="input-group mb-3">
                  <span className="input-group-text" id="player-name-1">Player 1</span>
                  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="player-name-1" 
                          onChange={(e) => {setPlayerName1(e.target.value); setSaved(false); } } value={playerName1} />
              </div>

              <div className="input-group mb-3">
                  <span className="input-group-text" id="player-name-2">Player 2</span>
                  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="player-name-2" 
                        onChange={(e) => {setPlayerName2(e.target.value); setSaved(false); } } value={playerName2} />
              </div>

              <div className="input-group mb-3">
                  <span className="input-group-text" id="player-name-3">Player 3</span>
                  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="player-name-3" 
                        onChange={(e) => {setPlayerName3(e.target.value); setSaved(false); } } value={playerName3} />
              </div>

              <div className="input-group mb-3">
                  <span className="input-group-text" id="player-name-4">Player 4</span>
                  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="player-name-4" 
                        onChange={(e) => {setPlayerName4(e.target.value); setSaved(false); } } value={playerName4} />
              </div>

              <div className="input-group mb-3">
                  <span className="input-group-text" id="player-name-5">Player 5</span>
                  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="player-name-5" 
                        onChange={(e) => {setPlayerName5(e.target.value); setSaved(false); } } value={playerName5} />
              </div>

              <div className="input-group mb-3">
                  <span className="input-group-text" id="player-name-6">Player 6</span>
                  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="player-name-6" 
                        onChange={(e) => {setPlayerName6(e.target.value); setSaved(false); } } value={playerName6} />
              </div>

              <div className="input-group mb-3">
                  <span className="input-group-text" id="player-name-7">Player 7</span>
                  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="player-name-7" 
                        onChange={(e) => {setPlayerName7(e.target.value); setSaved(false); } } value={playerName7} />
              </div>

              <div className="input-group mb-3">
                  <span className="input-group-text" id="player-name-8">Player 8</span>
                  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="player-name-8" 
                        onChange={(e) => {setPlayerName8(e.target.value); setSaved(false); } } value={playerName8} />
              </div>
            </div>

            <div className="row justify-contents-left settings-buttons">
              <button className={"btn btn-primary col-3" + (saved ? " disabled " : " ")}
                          onClick={() => handleSave()}>
                      {"save" + (saved ? "d" : "")}
              </button>
              <button className="btn btn-primary col-3"
                          onClick={() => handleClose()}>
                      close
              </button>
            </div>        
            <hr></hr>
            <h4>Game Actions</h4>
            <div className="row justify-contents-center game-buttons">
              <button className="btn btn-primary col-4" onClick={() => params.handleNewRound(false)}>
                new round
              </button>
              <button className="btn btn-primary col-4" onClick={() => params.handleNewRound(true)}>
                new game
              </button>
            </div>
            <div className="reveal-card=check">
              <input className="form-check-input" 
                    type="checkbox"   
                    id="reveal-cards"
                    checked={params.revealCardsIsChecked}
                    onChange={(e) => {handleRevealOptionChange(e); setSaved(false); } }
               />
              <label className="form-check-label" htmlFor="reveal-cards" >
                Reveal cards at the end of the round
              </label>
            </div>
            <div className='version-date'>
              Nov 12, 2025
            </div>
            </Offcanvas.Body>
          </Offcanvas>
        </>
      );
    }

    export function getSettings() {

        // get settings from local storage - use default if object if not there

        const defaultSettings = {
            playerCount:    4,
            playerName1:    "me",
            playerName2:    "bot 1",
            playerName3:    "bot 2",
            playerName4:    "bot 3",
            playerName5:    "bot 4",
            playerName6:    "bot 5",
            playerName7:    "bot 6",
            playerName8:    "bot 7"
        }

        const storedSettings = localStorage.getItem('settings');
        return storedSettings ? JSON.parse(storedSettings) : defaultSettings;
    }
