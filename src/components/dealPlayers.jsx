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
    return players;
}
