const texts = {
  "thank-you": [
    "The stream is over, thanks for watching and remember to follow if you want to be notified of further livestreams!",
    "La diffusion est terminée, merci d'avoir regardé et n'oublie pas de follow si tu veux être notifié de mes prochains lives !",
  ],
  quote: [
    "Thanking chat for participating",
    "Erasing dumb deaths",
    "Fetching subpar commentary",
    "Unlearning French",
    "Recording insane G@4m3r moments",
    "Saving progress",
    "looking at achievements",
    "Charging controller",
    "Scattering viewers",
  ],
};

let timeoutLists = {
  "thank-you": [],
  quote: [],
};


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
  const quote = document.getElementById("quote");
  const thanks = document.getElementById("thank-you");

  randomizeText(thanks, "thank-you", { min: 10000, span: 1000 });
  randomizeText(quote, "quote", {
    min: 5000,
    span: 200,
  });
};
