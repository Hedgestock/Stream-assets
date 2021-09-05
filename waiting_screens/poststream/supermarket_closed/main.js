let current = 1;

window.addEventListener("onWidgetLoad", function (obj) {
  document.getElementById("goal-total").innerText = "{goal}";

  current = obj.detail.session.data["follower-total"].count;
  document.getElementById("goal-current").innerText = current;

  document.getElementById("last-follow").innerText =
    obj.detail.recents.filter(a => a.type === "follower").sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]["name"];
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
