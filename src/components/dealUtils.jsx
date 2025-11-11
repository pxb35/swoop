export default function dealDeck(players) {
  const numPlayers = players.length;
  let targets = [];
 
  for (let j = 0; j < 19; j++) {
    for (let i = 0; i < numPlayers; i++) {
      const divElement = document.getElementById("player-" + i.toString()); // Or use querySelector()
      const rect = divElement.getBoundingClientRect();
      cardInfos.push({ playerIndex: i, cardIndex: j });
      targets.push({ x: rect.left + 10 * j, y: rect.top });
    }
  }
  dealHands({ x: 0, y: 0 }, targets);
  
}

function dealHands(deckPosition, targets, cardInfos) {
  /*
  // run the reveal at the same time dealing is occuring
  document.querySelectorAll(".reveal-container").forEach((parent) => {
    Array.from(parent.children).forEach((child) => {
      child.classList.add("reveal-content");
    });
  });
*/

  targets.forEach((target, i) => {
    //const card = document.createElement("div");

    // set up delete at the end of animation
    //card.addEventListener('animationend', () => {
    //  card.remove();
    //});
    //card.className = "swoopCard";

    // Calculate vector from deck to target
    const dx = target.x - deckPosition.x;
    const dy = target.y - deckPosition.y;

    // Set custom properties for animation
    card.style.setProperty("--dx", `${dx}px`);
    card.style.setProperty("--dy", `${dy}px`);
    card.style.animationDelay = `${i * 0.05}s`;

    document.body.appendChild(card);
  });

  cardInfos.forEach((cardInfo, i) => {
    // make the card visible
    const playerId = "player-" + cardInfo.playerIndex.toString();
    const cardIndex = i % 19;
    document
      .querySelectorAll(
        "#" + playerId + " .card:nth-child(" + (cardIndex + 1).toString() + ")"
      )
      .forEach((card) => {
        card.style.animationDelay = `${i * 0.05}s`;
        card.classList.add("visible");
      });
  });
}
