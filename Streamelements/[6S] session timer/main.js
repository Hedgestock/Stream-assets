function updateTimer(timer, time = 1200000) {

  if (time < 0) {
    return;
  }

  const minutes = Math.floor(time / 60000);
  const seconds = (time - minutes * 60000) / 1000;
  timer.innerText = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  setTimeout(() => updateTimer(timer, time - 1000), 1000);
}

window.addEventListener("onWidgetLoad", function (obj) {
  updateTimer(document.getElementById("time"), parseInt("{time}"));
});