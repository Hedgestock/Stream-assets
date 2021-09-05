let current = 1;

window.addEventListener("onWidgetLoad", function (obj) {
  document.getElementById("goal-total").innerText = "{goal}";
  document.getElementById("goal-title").innerText = "{goalTitle}";

  if ("{goalType}" == "follow") {
    current = obj.detail.session.data["follower-total"].count;
  }
  if ("{goalType}" == "sub") {
    current = obj.detail.session.data["subscriber-points"].amount;
  }

  document.getElementById("goal-current").innerText = current;

  document.getElementById("last-follow").innerText =
    obj.detail.recents.filter(a => a.type === "follower").sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]["name"];
});

window.addEventListener("onEventReceived", function (obj) {
  if (!obj.detail.event) return;

  const event = obj.detail.event;

  if (obj.detail.listener === "follower-latest") {
    console.log("EVENT", event)
    document.getElementById("last-follow").innerText = event["name"];
  }

  if ("{goalType}" == "follow" && obj.detail.listener != "follower-latest") return;
  if ("{goalType}" == "sub" && obj.detail.listener != "subscriber-latest") return;

  current += 1;
  document.getElementById("goal-current").innerText = current;

  // const emphasis = document.getElementById("emphasis");
  // emphasis.classList.remove("animated");
  // setTimeout(() => emphasis.classList.add("animated"), 50);
});

