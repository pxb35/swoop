
export function createDeck(numPlayers) {
  const deck = [];
  const numDecks = numPlayers < 5 ? 2 : numPlayers < 7 ? 3 : 4;

  let deckIndex = 0;
  for (let i = 0; i < numDecks; i++) {
    // Add 4 copies of ranks 1–13
    for (let rank = 1; rank <= 13; rank++) {
      for (let copy = 0; copy < 4; copy++) {
        deck.push({rank: rank, deckIndex: deckIndex++});
      }
    }

    // Add 2 extra Jokers (rank 13)
    
    deck.push({rank: 13, deckIndex: deckIndex++});
    deck.push({rank: 13, deckIndex: deckIndex++});
  }
  return shuffle(deck);
}

function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}
