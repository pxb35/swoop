export default function moveDOMElement(
  element,
  targetLocation,
  targetRotation
) {
  const rect = element.getBoundingClientRect();
  const absoluteX = rect.left;
  const absoluteY = rect.top;
  const offsetX = targetLocation.x - absoluteX;
  const offsetY = targetLocation.y - absoluteY;
  const rotation = 720 + targetRotation;

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

export function selectTargetFromRange(targetCenter, offset) {
  const targetX = Math.round(
    targetCenter.x - offset / 2 + Math.random() * offset
  );
  const targetY = Math.round(
    targetCenter.y - offset / 2 + Math.random() * offset
  );
  return { x: targetX, y: targetY };
}
