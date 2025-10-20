export default function calculateScores(players) {
  let returnScores = [];
  let lowestScore = 9999;
  let lowestScorePlayerIndex = -1;
  let gameOver = false;
  for (let j = 0; j < players.length; j++) {
    let playerPoints = 0;
    for (let i = 0; i < players[j].hand.length; i++) {
      playerPoints +=
        players[j].hand[i].rank === 13 ? 50 : players[j].hand[i].rank;
    }
    for (let i = 0; i < players[j].faceUp.length; i++) {
      playerPoints +=
        players[j].faceUp[i].rank === 13 ? 50 : players[j].faceUp[i].rank;
    }
    for (let i = 0; i < players[j].mystery.length; i++) {
      playerPoints +=
        players[j].mystery[i].rank === 13 ? 50 : players[j].mystery[i].rank;
    }

    let totalScore = players[j].totalScore + playerPoints;
    if (totalScore < lowestScore) {
      lowestScore = totalScore;
      lowestScorePlayerIndex = j;
    }
    if (totalScore > 49) gameOver = true;

    returnScores.push({
      roundScore: playerPoints,
      totalScore: players[j].totalScore + playerPoints,
    });
  }
  return {
    gameOver: gameOver,
    lowestPlayer: lowestScorePlayerIndex,
    scores: returnScores,
  };
}
