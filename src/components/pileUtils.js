export function processPile(originalPile, newCards) {
  
  // assumes newCards are already validated
  if (newCards.length === 0) return originalPile;
  if (newCards[newCards.length-1].rank === 13) {
    return [];
  }

  // if top 4 cares are the same rank, clear pile
  const combinedPile = [...originalPile, ...newCards];
  if (combinedPile.length >= 4) {
    const topFour = combinedPile.slice(-4);
    const allSameRank = topFour.every(card => card.rank === topFour[0].rank); 
    if (allSameRank) {
      return [];
    } else {
      return combinedPile;
    }
  } else {
    return combinedPile;
  }
}
