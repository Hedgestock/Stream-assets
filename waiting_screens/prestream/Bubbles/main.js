const texts = {
  "starting-soon": [
    "The stream will begin shortly!",
    "La diffusion démarrera sous peu !",
  ],
  quote: [
    "Generating unfunny quotes",
    "Optimizing dumb deaths",
    "Fetching subpar commentary",
    "Learning French",
    "Preparing insane G@4m3r moments",
    "Searching longest path through the game",
    "Locking achievements",
    "Reconfiguring controller",
    "Gathering viewers",
    "Encouraging chat to interact",
  ],
  late: [
    "The stream has already begun, the broadcaster is simply LATE!!!",
    "La diffusion a déjà commencé, l'animateur est simplement EN RETARD!!!",
  ],
};

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

let timeoutLists = {
  bubbles: [],
  bubbleWaves: [],
  "starting-soon": [],
  quote: [],
  loading: [],
};

function addBubbles(amount) {
  for (let i = 0; i < amount; i++) {
    createBubble();
  }
}

function addBubbleWaves(amount, minSpawnDelay, randomSpawnDelay) {
  addBubbles(amount);
  timeoutLists.bubbleWaves.push(
    setTimeout(
      () => addBubbleWaves(amount, minSpawnDelay, randomSpawnDelay),
      minSpawnDelay + Math.floor(Math.random() * randomSpawnDelay)
    )
  );
}

function addInfiniteBubble(minSpawnDelay, randomSpawnDelay) {
  createBubble();
  timeoutLists.bubbles.push(
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
  timeoutLists.bubbleWaves.forEach((timeout) => clearTimeout(timeout));
  timeoutLists.bubbles.forEach((timeout) => clearTimeout(timeout));
}

function updateTimer(div, time = 300000) {
  if (time < 0) {
    timeoutLists["quote"].forEach((timeout) => clearTimeout(timeout));
    randomizeText(quote, "late");
    return;
  }

  const minutes = Math.floor(time / 60000);
  const seconds = (time - minutes * 60000) / 1000;
  setInnerText(div, `${minutes}:${seconds.toString().padStart(2, "0")}`);

  setTimeout(() => updateTimer(div, time - 1000), 1000);
}

function addLoading(div, loadingSpeed = 1000, iteration = 0) {
  setInnerText(div, ".".repeat((iteration % 3) + 1));

  timeoutLists.loading.push(
    setTimeout(() => addLoading(div, loadingSpeed, iteration + 1), loadingSpeed)
  );
}

function randomizeText(div, textId, rerandomize = null) {
  console.log(`randomizing ${textId}`);
  const text = texts[textId][Math.floor(Math.random() * texts[textId].length)];

  setInnerText(div, text);

  if (rerandomize) {
    const rerandomizeTiming =
      rerandomize.min + Math.floor(Math.random() * rerandomize.span);

    timeoutLists[textId].push(
      setTimeout(() => {
        console.log("remove glitch");
        div.classList.remove("glitch");
      }, rerandomizeTiming / 10)
    );

    timeoutLists[textId].push(
      setTimeout(
        () => div.classList.add("glitch"),
        rerandomizeTiming - rerandomizeTiming / 10
      )
    );

    timeoutLists[textId].push(
      setTimeout(
        () => randomizeText(div, textId, rerandomize),
        rerandomizeTiming
      )
    );
  }
}

function setInnerText(div, text) {
  div.innerText = text;
  div.dataset.text = text;
}

window.onload = function () {
  const timer = document.getElementById("timer");
  const quote = document.getElementById("quote");
  const starting = document.getElementById("starting-soon");

  addInfiniteBubble(0, 200);
  updateTimer(timer, 300000);
  randomizeText(starting, "starting-soon", { min: 10000, span: 1000 });
  randomizeText(quote, "quote", {
    min: 5000,
    span: 200,
  });
};
