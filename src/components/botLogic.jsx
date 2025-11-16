
export function botTurn(pileHistory, players, playerIndex) {
  const pileTop = pileHistory[pileHistory.length - 1];
  const bot = players[playerIndex];

  const isWild = card => card.rank === 13;
  const isLegal = card => !pileTop || isWild(card) || card.rank <= pileTop.rank;

  const mergedHand = [...bot.hand, ...bot.faceUp];
  const grouped = groupByRank(mergedHand);
  // for groups of more than one card, add the groups with less cards too
  for (const rank in grouped) {
    const group = grouped[rank]; 
    if (group.length > 1) {
      // sort the group so we drop the hand cards before the faceUp cards
      group.sort((a,b) => bot.faceUp.filter(c => c.deckIndex === b.deckIndex).length - bot.faceUp.filter(c => c.deckIndex === a.deckIndex).length);
      for (let i = 1; i < group.length; i++) {
        const subGroup = group.slice(0, i); 
        if (subGroup.length > 0) {
          grouped[rank + '_sub_' + i] = subGroup;
        }
      }
    }
  }  

  const options = Object.values(grouped)
    .filter(group => isLegal(group[0]))
    .map(group => ({
      cards: group,
      score: scoreGroup(group, pileHistory, players, playerIndex).score
    }));

  options.sort((a, b) => b.score - a.score);
  // score a reveal option too
  let revealScore = 0;
  if (bot.mystery.length > 0 && bot.faceUp.length < bot.mystery.length) {
    revealScore += 4; // base score for revealing
    if (pileTop === undefined || pileTop.rank === 12) {
      revealScore += 20;
    } else if (pileTop !== undefined && pileTop.rank > 10 && pileHistory.length < 3) {
      revealScore += 4;
    } 
  }

  let addToHand = [];
  if (options.length === 0 && revealScore === 0) return { action: 'pickup', addToHand };
  if (options.length === 0 && revealScore > 0 || (options.length > 0 && options[0].score < revealScore)) {
    const revealedCard = bot.mystery[bot.mystery.length - 1];
    if (isLegal(revealedCard)) {
      const mysteryGroup = mergedHand.filter(c => c.rank === revealedCard.rank);
      mysteryGroup.push(revealedCard);
      return {action: 'play', cards: mysteryGroup};
    } else {
      addToHand.push(revealedCard);
      return { action: 'pickup', cards: addToHand };
    }
  }
  
  return { action: 'play', cards: options[0].cards };
}

function groupByRank(hand) {
  return hand.reduce((acc, card) => {
    acc[card.rank] = acc[card.rank] || [];
    // don't group swoops
    //if (card.rank !== 13 || acc[13] == undefined || acc[13].length === 0) acc[card.rank].push(card);
    acc[card.rank].push(card);
    return acc;
  }, {});
}

function scoreGroup(group, pileHistory, players, playerIndex) {
  let reasons = [];
  let score = 0;
  const rank = group[0].rank;
  const nextPlayer = players[(playerIndex + 1) % players.length];
  const count = group.length;
  const player = players[playerIndex];
  const cardCnt = player.faceUp.length + player.hand.length + player.mystery.length;
  const nextPlayerCardCount = nextPlayer.hand.length + nextPlayer.faceUp.length + nextPlayer.mystery.length;
  
  let matchingHistoryCount = 0;
  for (const card of pileHistory) {
    if (card.rank === rank) matchingHistoryCount++;
  }

  const isLow = rank <= 4;
  const isHigh = rank >= 10 && rank <= 12;
  const willSwoop = matchingHistoryCount + group.length >= 4;
  const isSwoop = rank === 13;

  score += group.length * (isHigh ? 15 : isLow ? 10 : isSwoop ? 0 : 12);
  reasons.push(`Playing ${group.length} card(s) of rank ${rank}. total score ${score}`);
  
  score += rank === 13 ? 0 : ((pileHistory.length === 0 ? rank : 12 - (pileHistory[0].rank - rank)));
  reasons.push(`Rank difference from pile top. total score ${score}`);

  if (isSwoop) {
    score += 5;
    if (group.length > 1) {
      score -= group.length * 10;
    }
    reasons.push(`Playing swoop card. total score ${score}`);
  }

  if (willSwoop && !isSwoop) {
    score += 20;
    // extra if the swoop uses the pile (as opposed to having all swooped cards in hand)
    if (group.length < 4) score += 20;
    reasons.push(`Triggers a swoop. total score ${score}`);
  }

  if (isLow && group.length > 1) {
    // ok when card count is low
    if (players.every(p => p.faceUp.length + p.hand.length + p.mystery.length > 4)) {
      score -= 4 * group.length * (4 - rank)
      reasons.push(`Using more than one low card when all players have more than 4 cards. total score ${score}`);
    } 
  }

  if (isSwoop && players.filter(p => p.faceUp.length + p.hand.length + p.mystery.length < 4).length > 0 ) {
    score += 15;
    reasons.push(`Getting rid of swoop when a player has less than 4 cards. total score ${score}`);
  }

  if (nextPlayerCardCount <= 3 && (nextPlayer.faceUp.length === 0 || nextPlayer.faceUp.every(c => c.rank > rank))) {
    score += (15 - (rank * 2)) * (4-nextPlayerCardCount);
    reasons.push(`Blocking next player from going out. total score ${score}`);
  }

  if (group.length < 4 && nextPlayer.faceUp.filter(c => c.rank === rank).length + group.length + matchingHistoryCount >= 4) {
    score -= 15;
    reasons.push(`Blocking next player from getting a swoop. total score ${score}`);
  } else if (group.length < 4 && nextPlayer.faceUp.filter(c => c.rank === rank).length + group.length + matchingHistoryCount >= 3) {
    score -= nextPlayer.hand.length;
    reasons.push(`Blocking next player from getting a potential swoop. total score ${score}`);
  }

  if (isSwoop && cardCnt === 2) {
    score += 100;
    reasons.push(`Playing swoop first when 2 cards left. total score ${score}`);
  }

  console.log(reasons);

 return { score, reasons };
}
