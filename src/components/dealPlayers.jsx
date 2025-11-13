export function dealPlayers(deck, numPlayers, interactivePlayers, settings) {
    let cardIndex = 0;
    let localLoc = ''
    let gamePlayers = []
    // Deal cards to gamePlayers
    
    for (let i = 0; i < numPlayers; i++) {
        gamePlayers[i] = {};
        gamePlayers[i]['type'] = interactivePlayers.includes(i) ? 'human' : 'bot';
        gamePlayers[i]['index'] = i;
        gamePlayers[i]['hand'] = [];
        gamePlayers[i]['faceUp'] = [];
        gamePlayers[i]['mystery'] = [];
        gamePlayers[i]['roundScore'] = 0;
        gamePlayers[i]['totalScore'] = 0;
        gamePlayers[i]['winner'] = false;
        gamePlayers[i]['position'] = i === 0 ? 'bottom' : i === 1 ? 'left' : i === 2 ? 'right' : 'top';
        switch (i) {
            case 0:
                gamePlayers[i].name = settings.playerName1;
                break;
            case 1:
                gamePlayers[i].name = settings.playerName2;
                break;
            case 2:
                gamePlayers[i].name = settings.playerName3;
                break;
            case 3:
                gamePlayers[i].name = settings.playerName4;
                break;
            case 4:
                gamePlayers[i].name = settings.playerName5;
                break;
            case 5:
                gamePlayers[i].name = settings.playerName6;
                break;
            case 6:
                gamePlayers[i].name = settings.playerName7;
                break;
            case 7:
                gamePlayers[i].name = settings.playerName8;
                break;
        }
        // Deal cards to player
        // 4 mystery, 4 faceUp, 11 hand cards
        for (let j = 0; j < 4; j++) {
           gamePlayers[i]['mystery'][j] = deck[cardIndex];
           cardIndex++;
        }
        for (let j = 0; j < 4; j++) {
           gamePlayers[i]['faceUp'][j] = deck[cardIndex];
           cardIndex++;
        }
        for (let j = 0; j < 11; j++) {
            gamePlayers[i]['hand'][j] = deck[cardIndex];
            cardIndex++;
        }
        gamePlayers[i]['hand'].sort((a, b) => a.rank - b.rank);
    }

    
    //----------  added this to test ---------
    cardIndex = 0;
    for (let i = 0; i < numPlayers; i++) {
        gamePlayers[i]['hand'] = [];
        gamePlayers[i]['faceUp'] = [];
        gamePlayers[i]['mystery'] = [];
        for (let j=0; j<2; j++) {
            gamePlayers[i]['hand'][j] = deck[cardIndex];
            cardIndex++;
            gamePlayers[i]['faceUp'][j] = deck[cardIndex];
            cardIndex++;
            gamePlayers[i]['mystery'][j] = deck[cardIndex];
            cardIndex++;
        }
    }
    // ------- end of test section ----------
    
   
    return gamePlayers;
}
