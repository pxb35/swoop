export function moveDOMElement(element, targetLocation, targetRotation) {
  const rect = element.getBoundingClientRect();
  const absoluteX = rect.x;
  const absoluteY = rect.y;
  const offsetX = targetLocation.x - absoluteX;
  const offsetY = targetLocation.y - absoluteY;

  const animation = element.animate(
    [
      { rotate: "0deg", scale: 1, opacity: 1 },
      { rotate: "90deg", scale: 1.2 },
      { rotate: "180deg", scale: 1.5 },
      { rotate: "270deg", scale: 1.2, opacity: 0.8 },
      { rotate: "330deg", scale: 1, opacity: 0.5 },
      {
        translate: offsetX.toString() + "px " + offsetY.toString() + "px",
        rotate: "360deg",
        scale: 1,
        opacity: 0,
      },
      //translate: offsetX.toString() + "px " + offsetY.toString() + "px",
      //scale: 1,
      //opacity: 0,
      //rotate: "360deg",
      //},
    ],
    {
      duration: 700,
      delay: 0,
      easing: "ease-in-out",
      fill: "forwards",
    }
  );
}

/*
export function moveDOMElement(element, targetLocation, targetRotation) {
  const rect = element.getBoundingClientRect();
  const absoluteX = rect.left;
  const absoluteY = rect.top;
  const offsetX = targetLocation.x - absoluteX;
  const offsetY = targetLocation.y - absoluteY;
  const rotation = 360 + targetRotation;

  const animation = element.animate(
    [
      { scale: 1 },
      { scale: 1.2 },
      { scale: 1.5 },
      { scale: 1.6 },
      { scale: 1.4 },
      { scale: 1.2 },
      {
        translate: offsetX.toString() + "px " + offsetY + "px",
        scale: 1,
        rotate: rotation.toString() + "deg",
        background: "yellow",
      },
    ],
    {
      duration: 1000,
      delay: 200,
      easing: "ease-in-out",
      fill: "forwards",
    }
  );
}
*/

export function selectTargetFromRange(targetTopLeft, offset) {
  const targetX = Math.round(targetTopLeft.x + Math.random() * offset);
  const targetY = Math.round(targetTopLeft.y + Math.random() * offset);
  return { x: targetX, y: targetY };
}

export function alignTopCards(targetLocation, numberOfCards) {
  const pileCards = getPileCardsFromDOM("pileId");
  if (pileCards.length === 0) return;
  const cards = pileCards.filter(
    (c, indx) => indx > pileCards.length - numberOfCards - 1
  );
  for (let i = 0; i < cards.length; i++) {
    const cardRect = cards[i].getBoundingClientRect();
    const absoluteX = cardRect.left;
    const absoluteY = cardRect.top;
    const offsetX = targetLocation.x - absoluteX;
    const offsetY = targetLocation.y - absoluteY;

    const animation = cards[i].animate(
      [
        { rotate: "0deg", scale: 1, background: "orange", scale: 1 },
        { rotate: "0deg", scale: 1, background: "orange", scale: 1 },
        {
          translate: (offsetX + i * 25).toString() + "px " + offsetY + "px",
          rotate: "360deg",
        },
      ],
      {
        duration: 4000,
        delay: 500,
        easing: "ease-in-out",
        fill: "forwards",
      }
    );
  }
}

export default function tossCardsOnPile(cards, pileIdStr) {
  const offset = 100;
  const pile = document.getElementById(pileIdStr);
  const pileRect = pile.getBoundingClientRect();

  //const pileCenterX = pileRect.left + (pileRect.right - pileRect.left) / 2;
  //const pileCenterY = pileRect.top + (pileRect.bottom - pileRect.top) / 2;

  for (let i = 0; i < cards.length; i++) {
    //  const target = selectTargetFromRange(
    //    { x: pileCenterX + offset / 2, y: pileCenterY + offset / 2 },
    //    offset
    //  );
    const DOMcard = document.getElementById(
      "card-" + cards[i].deckIndex.toString()
    );
    moveDOMElement(
      DOMcard,
      { x: pileRect.left, y: pileRect.top },
      Math.random() * 360 + 180
    );
  }
}

export function tossCardsOnPileV1(cards, pileIdStr) {
  const offset = 100;
  const pile = document.getElementById(pileIdStr);
  const pileRect = pile.getBoundingClientRect();
  const pileCenterX = pileRect.left + (pileRect.right - pileRect.left) / 2;
  const pileCenterY = pileRect.top + (pileRect.bottom - pileRect.top) / 2;

  for (let i = 0; i < cards.length; i++) {
    const target = selectTargetFromRange(
      { x: pileCenterX + offset / 2, y: pileCenterY + offset / 2 },
      offset
    );
    const DOMcard = document.getElementById(
      "card-" + cards[i].deckIndex.toString()
    );
    moveDOMElement(DOMcard, target, Math.random() * 360 + 180);
    alignTopCards(target, 3);
  }
}

export function getPileCardsFromDOM(pileIdStr) {
  const pileCards = document.querySelectorAll("#" + pileIdStr + " .card");
  return pileCards && pileCards.length > 0 ? Array.from(pileCards) : [];
}

export function rerotatePileCards(pileIdStr, numberOfCards) {
  const pileCards = getPileCardsFromDOM("pileId");
  if (pileCards.length === 0) {
    return;
  }
  const cards = pileCards.filter(
    (c, indx) => indx > pileCards.length - numberOfCards - 1
  );

  for (let i = 0; i < cards.length; i++) {
    const animation = cards[i].animate(
      [{ scale: 1 }, { rotate: (Math.random() * 360).toString() + "deg" }],
      {
        duration: 500,
        delay: 0,
        easing: "ease-in-out",
        fill: "forwards",
      }
    );
  }
}
