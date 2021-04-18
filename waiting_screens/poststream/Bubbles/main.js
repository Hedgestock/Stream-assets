const bubbles = 250;
const bubbleMaxSize = 200;
const bubbleVariation = 100;
const averageRiseTime = 4;
const averageWobble = 4;
const wobbleVariation = 3;

function createBubble() {
  const bubble = document.createElement("div");
  const bubbleSize =
    bubbleMaxSize - Math.floor(Math.random() * bubbleVariation);
  const riseTime = averageRiseTime + Math.random() - 0.5;
  const wobble =
    averageWobble + Math.random() * wobbleVariation - wobbleVariation / 2;

  bubble.classList.add("bubble");
  bubble.setAttribute(
    "style",
    `width: ${bubbleSize}px;
    height: ${bubbleSize}px;
    left: ${Math.floor(Math.random() * 120) - 10}vw;
    animation: rise 1 ${riseTime}s;`
  );

  const div = document.createElement("div");
  div.setAttribute(
    "style",
    `animation: wobble ${wobble} linear ${riseTime / wobble}s`
  );

  const specular = document.createElement("div");
  specular.classList.add("specular");

  div.appendChild(specular);
  bubble.appendChild(div);

  document.body.append(bubble);
  setTimeout(() => document.body.removeChild(bubble), riseTime * 900);
  return bubble;
}

let timeoutList = [];

function addBubbles(amount) {
  for (let i = 0; i < amount; i++) {
    createBubble();
  }
}

function addBubbleWaves(amount, minSpawnDelay, randomSpawnDelay) {
  addBubbles(amount);
  timeoutList.push(
    setTimeout(
      () => addBubbleWaves(amount, minSpawnDelay, randomSpawnDelay),
      minSpawnDelay + Math.floor(Math.random() * randomSpawnDelay)
    )
  );
}

function addInfiniteBubble(minSpawnDelay, randomSpawnDelay) {
  createBubble();
  timeoutList.push(
    setTimeout(
      () => addInfiniteBubble(minSpawnDelay, randomSpawnDelay),
      minSpawnDelay + Math.floor(Math.random() * randomSpawnDelay)
    )
  );
}

function addInfiniteBubbles(amount, minSpawnDelay, randomSpawnDelay) {
  for (let i = 0; i < amount; i++) {
    addInfiniteBubble(minSpawnDelay, randomSpawnDelay);
  }
}

function stopBubbles() {
  timeoutList.forEach((timeout) => clearTimeout(timeout));
}

window.onload = function () {
  addInfiniteBubble(0,200);
};
