export function botTurn(botHand, pileHistory) {
  const pileTop = pileHistory[pileHistory.length - 1];
  
  const isWild = card => card.rank === 13;
  const isLegal = card => !pileTop || isWild(card) || card.rank <= pileTop.rank;

  const mergedHand = [...botHand.hand, ...botHand.faceUp];
  const grouped = groupByRank(mergedHand);
  const options = Object.values(grouped)
    .filter(group => isLegal(group[0]))
    .map(group => ({
      cards: group,
      score: scoreGroup(group, pileTop, pileHistory)
    }));

  // score a reveal option too
  let revealScore = 0;
  if (botHand.mystery.length > 0 && botHand.faceUp.length < botHand.mystery.length) {
    revealScore += 2; // base score for revealing
    if (pileTop === undefined || pileTop.rank === 12) {
      revealScore += 7;
    } else if (pileTop !== undefined && pileTop.rank > 10 && pileHistory.length < 3) {
      revealScore += 4;
    } 
  }

  if (options.length === 0 && revealScore === 0) return { action: 'pickup' };
  if (options.length === 0 && revealScore > 0 || (options.length > 0 && options[0].score < revealScore)) {
    if (isLegal(botHand.mystery[botHand.mystery.length - 1])) {
      const mysteryGroup = mergedHand.filter(c => c.rank === botHand.mystery[botHand.mystery.length - 1].rank);
      mysteryGroup.push(botHand.mystery[botHand.mystery.length - 1]);
      return {action: 'play', cards: mysteryGroup};
    } else {
      return { action: 'pickup' };
    }
  }
  
  return { action: 'play', cards: options[0].cards };
}

function groupByRank(hand) {
  return hand.reduce((acc, card) => {
    acc[card.rank] = acc[card.rank] || [];
    // don't group swoops
    if (card.rank !== 13 || acc[13] == undefined || acc[13].length === 0) acc[card.rank].push(card);
    return acc;
  }, {});
}

function scoreGroup(group, pileTop, pileHistory) {
  let score = 0;
  const rank = group[0].rank;

  if (rank === 13) score += 10;
  const lastThree = pileHistory.slice(-3);

  const swoopPossible = lastThree.every(c => c.rank === rank);
  //if (swoopPossible) score += 8;
  if (swoopPossible) score += 11;
  if (rank <= 5) score += 3;
  if (rank >= 11 && rank < 13) score -= 2;

  return score + group.length;
}
