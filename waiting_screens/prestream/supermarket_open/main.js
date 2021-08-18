let current = 0;

function updateTimer(timer, time = 300000) {
  if (time < 0) {
    document.getElementById("open").innerText = "Magasin ouvert !";
    document.querySelector(".door.left").classList.add("animated");
    document.querySelector(".door.right").classList.add("animated");
    document.getElementById("closed-sign").classList.add("animated");
    setTimeout(() => {
      document.getElementById("open-sign").style.display = "block";
      document.getElementById("closed-sign").style.display = "none";
      setTimeout(() => {
        document.getElementById("open-sign").classList.remove("animated");
      }, 999);
    }, 1000);
    return;
  }

  const minutes = Math.floor(time / 60000);
  const seconds = (time - minutes * 60000) / 1000;
  timer.innerText = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  setTimeout(() => updateTimer(timer, time - 1000), 1000);
}

window.onload = function () {
  updateTimer(document.getElementById("timer"));
};

window.addEventListener("onWidgetLoad", function (obj) {
  document.getElementById("goal-total").innerText = "{goal}";

  current = obj.detail.session.data["follower-total"].count;
  document.getElementById("goal-current").innerText = current;
  document.getElementById("ad").innerText = "{title}";

  document.getElementById("last-follow").innerText =
    obj.detail.recents.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]["name"];
});

window.addEventListener("onEventReceived", function (obj) {
  if (!obj.detail.event) return;
  if (obj.detail.listener != "follower-latest") return;

  const event = obj.detail.event;
  current += 1;
  document.getElementById("goal-current").innerText = current;

  document.getElementById("last-follow").innerText = event["name"];

  const emphasis = document.getElementById("emphasis");
  emphasis.classList.remove("animated");
  setTimeout(() => emphasis.classList.add("animated"), 50);
});
