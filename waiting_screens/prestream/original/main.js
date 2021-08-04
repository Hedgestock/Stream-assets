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

let timeoutLists = {
  "starting-soon": [],
  quote: [],
  loading: [],
};

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

  updateTimer(timer, 300000);
  randomizeText(starting, "starting-soon", { min: 10000, span: 1000 });
  randomizeText(quote, "quote", {
    min: 5000,
    span: 200,
  });
};
