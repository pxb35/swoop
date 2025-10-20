export function dealPlayers(deck, numPlayers, interactivePlayers) {
    let cardIndex = 0;
    let localLoc = ''
    let players = []
    // Deal cards to players
    
    for (let i = 0; i < numPlayers; i++) {
        players[i] = {};
        players[i]['type'] = interactivePlayers.includes(i) ? 'human' : 'bot';
        players[i]['index'] = i;
        players[i]['hand'] = [];
        players[i]['faceUp'] = [];
        players[i]['mystery'] = [];
        players[i]['roundScore'] = 0;
        players[i]['totalScore'] = 0;
        players[i]['winner'] = false;
        players[i]['name'] = players[i]['type'] === 'human' ? `You` : `Bot ${i}`;
        players[i]['position'] = i === 0 ? 'bottom' : i === 1 ? 'left' : i === 2 ? 'right' : 'top';
        // Deal cards to player
        // 4 mystery, 4 faceUp, 11 hand cards
        for (let j = 0; j < 4; j++) {
           players[i]['mystery'][j] = deck[cardIndex];
           cardIndex++;
        }
        for (let j = 0; j < 4; j++) {
           players[i]['faceUp'][j] = deck[cardIndex];
           cardIndex++;
        }
        for (let j = 0; j < 11; j++) {
            players[i]['hand'][j] = deck[cardIndex];
            cardIndex++;
        }
        players[i]['hand'].sort((a, b) => a.rank - b.rank);
    }

    //----------  added this to test ---------
    cardIndex = 0;
    for (let i = 0; i < numPlayers; i++) {
        players[i]['hand'] = [];
        players[i]['faceUp'] = [];
        players[i]['mystery'] = [];
        for (let j=0; j<2; j++) {
            players[i]['hand'][j] = deck[cardIndex];
            cardIndex++;
        }
    }
    // ------- end of test section ----------

    return players;
}
