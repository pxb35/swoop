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

export function swoopBird() {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const pile = document.getElementById("pileId");
  const pileRect = pile.getBoundingClientRect();

  // find center of the pile
  const pileCenterX = pileRect.left + (pileRect.right - pileRect.left) / 2;
  const pileCenterY = pileRect.top + (pileRect.bottom - pileRect.top) / 2;

  const element = document.getElementById("breeze");
  //element.style.right = "200px";
  //element.style.top = "-150px";

  const birdAnimation = element.animate(
    [
      {
        translate: "200px " + "-150px",
        scale: 1.5,
        opacity: 0,
      },
      {
        scale: 1.2,
      },
      {
        scale: 1.0,
      },
      {
        scale: 0.8,
      },
      {
        scale: 0.6,
      },
      {
        scale: 0.6,
        opacity: 1,
      },
      {
        scale: 0.8,
      },
      {
        scale: 1.0,
      },
      {
        scale: 1.2,
      },
      {
        scale: 1.5,
        opacity: 1.0,
      },
      {
        translate:
          viewportWidth.toString() +
          "px " +
          (viewportHeight * -1.2).toString() +
          "px",
        scale: 1.5,
        opacity: 0,
      },
      {
        translate: "200px " + "-150px",
        scale: 1.5,
        opacity: 0,
      },
    ],
    {
      duration: 2000,
      delay: 0,
      easing: "ease-in-out",
      fill: "forwards",
      direction: "normal",
    }
  );
}

export function breezeCardsAway(newPile) {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const pile = document.getElementById("pileId");
  const pileRect = pile.getBoundingClientRect();

  // find center of the pile
  const pileCenterX = pileRect.left + (pileRect.right - pileRect.left) / 2;
  const pileCenterY = pileRect.top + (pileRect.bottom - pileRect.top) / 2;

  const element = document.getElementById("breeze");
  //element.style.right = "200px";
  //element.style.top = "-150px";

  //const pileCards = getPileCardsFromDOM("pileId");
  for (let i = 0; i < newPile.length; i++) {
    const pileCard = document.getElementById(
      "card-" + newPile[i].deckIndex.toString()
    );
    const cardRect = pileCard.getBoundingClientRect();
    const absoluteX = cardRect.left;
    const absoluteY = cardRect.top;
    const offsetX = pileCenterX - absoluteX;
    const offsetY = pileCenterY - absoluteY;

    // calculate the random direction for each card - destination off screen
    const randomAngle = Math.random() * 2 * Math.PI;
    const distance = Math.max(viewportWidth, viewportHeight) * 1.5;
    const targetX = pileCenterX + distance * Math.cos(randomAngle);
    const targetY = pileCenterY + distance * Math.sin(randomAngle);

    const cardAnimation = pileCard.animate(
      [
        //{
        //  translate: offsetX.toString() + "px " + offsetY.toString() + "px",
        //  opacity: 1,
        //},
        {
          opacity: 1,
        },
        {
          transform:
            "rotateX(" +
            Math.floor(Math.random() * 360).toString() +
            "deg)" +
            " rotateY(" +
            Math.floor(Math.random() * 360).toString() +
            "deg)" +
            " rotateZ(" +
            Math.floor(Math.random() * 360).toString() +
            "deg)",
        },
        {
          transform:
            "rotateX(" +
            Math.floor(Math.random() * 360).toString() +
            "deg)" +
            " rotateY(" +
            Math.floor(Math.random() * 360).toString() +
            "deg)" +
            " rotateZ(" +
            Math.floor(Math.random() * 360).toString() +
            "deg)",
        },
        {
          transform:
            "rotateX(" +
            Math.floor(Math.random() * 360).toString() +
            "deg)" +
            " rotateY(" +
            Math.floor(Math.random() * 360).toString() +
            "deg)" +
            " rotateZ(" +
            Math.floor(Math.random() * 360).toString() +
            "deg)",
        },
        {
          transform:
            "rotateX(" +
            Math.floor(Math.random() * 360).toString() +
            "deg)" +
            " rotateY(" +
            Math.floor(Math.random() * 360).toString() +
            "deg)" +
            " rotateZ(" +
            Math.floor(Math.random() * 360).toString() +
            "deg)",
        },
        {
          transform:
            "rotateX(" +
            Math.floor(Math.random() * 360).toString() +
            "deg)" +
            " rotateY(" +
            Math.floor(Math.random() * 360).toString() +
            "deg)" +
            " rotateZ(" +
            Math.floor(Math.random() * 360).toString() +
            "deg)",
        },
        {
          transform:
            "rotateX(" +
            Math.floor(Math.random() * 360).toString() +
            "deg)" +
            " rotateY(" +
            Math.floor(Math.random() * 360).toString() +
            "deg)" +
            " rotateZ(" +
            Math.floor(Math.random() * 360).toString() +
            "deg)",
        },
        {
          transform:
            "rotateX(" +
            Math.floor(Math.random() * 360).toString() +
            "deg)" +
            " rotateY(" +
            Math.floor(Math.random() * 360).toString() +
            "deg)" +
            " rotateZ(" +
            Math.floor(Math.random() * 180).toString() +
            "deg)",
          opacity: 1,
        },
        {
          translate: targetX.toString() + "px " + targetY.toString() + "px",
          opacity: 0,
        },
        {
          translate: offsetX.toString() + "px " + offsetY.toString() + "px",
          opacity: 0,
        },
      ],
      {
        duration: 1000,
        delay: 500,
        easing: "ease-in-out",
        fill: "forwards",
        direction: "normal",
      }
    );
  }
}

export function AnimatePickuPile(pileCopy, playerIndex) {
  let targetRect = {};
  // calculate the next card location in the players hand
  const handCards = document.querySelectorAll(
    ".hand-container.playerIndex-" + playerIndex.toString() + " .card"
  );
  if (handCards.length === 0) {
    const handCardContainer = document.querySelectorAll(
      ".hand-container.playerIndex-" + playerIndex.toString()
    );
    targetRect = handCardContainer[0].getBoundingClientRect();
  } else {
    targetRect = handCards[handCards.length - 1].getBoundingClientRect();
  }
  for (let i = 0; i < pileCopy.length; i++) {
    const pileCard = document.getElementById(
      "card-" + pileCopy[i].deckIndex.toString()
    );
    const pileCardRect = pileCard.getBoundingClientRect();

    const targetX = (targetRect.left - pileCardRect.left).toString() + "px";
    const targetY = (targetRect.top - pileCardRect.top).toString() + "px";

    const cardAnimation = pileCard.animate(
      [
        {
          opacity: 1,
          scale: 1,
        },
        {
          opacity: 1,
          scale: 1,
        },
        {
          opacity: 1,
          scale: 0.9,
        },
        {
          opacity: 1,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 0.75,
        },
        {
          opacity: 1,
          scale: 0.7,
        },
        {
          opacity: 1,
          scale: 0.65,
        },
        {
          opacity: 1,
          scale: 0.6,
        },
        {
          opacity: 0.75,
          scale: 0.55,
        },
        {
          opacity: 0.25,
          scale: 0.5,
        },
        {
          translate: targetX + " " + targetY,
          opacity: 0,
        },
      ],
      {
        duration: 1500,
        delay: (i * 500) / pileCopy.length,
        easing: "ease-in-out",
        fill: "forwards",
        direction: "normal",
      }
    );
  }
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
    if (DOMcard) {
      moveDOMElement(
        DOMcard,
        { x: pileRect.left, y: pileRect.top },
        Math.random() * 360 + 180
      );
    }
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
