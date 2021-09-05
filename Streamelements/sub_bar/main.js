let goal = 0;
let current = 0;

window.addEventListener("onWidgetLoad", function (obj) {
  document.getElementById("goal-title").innerText =
    obj.detail.fieldData["title"];

  goal = obj.detail.fieldData["goal"];
  document.getElementById("goal-total").innerText = "goal: {goal}";

  setCurrent(obj.detail.session.data["subscriber-points"].amount);});

window.addEventListener("onEventReceived", function (obj) {
  if (!obj.detail.event) return;
  if (obj.detail.listener != "subscriber-latest") return;

  const event = obj.detail.event;
  setCurrent(current + 1);

  const progress = document.getElementById("goal-progress");
  const img = progress.getElementsByTagName("img")[0];
  progress.classList.remove("animated");
  img.classList.remove("animated");
  setTimeout(() => progress.classList.add("animated"), 50);
  setTimeout(() => img.classList.add("animated"), 50);
});

function progressWidth(current) {
  return (current / goal) * 75;
}

function setCurrent(amount) {
  current = amount;
  document.getElementById("goal-current").innerText = `current: ${amount}`;
  document.getElementById("goal-progress").style.width = `${progressWidth(
    amount
  )}%`;
}
