// Events will be sent when someone followers
// Please use event listeners to run functions.
function progressWidth(obj) {
  return (obj.detail.amount.current / obj.detail.amount.target) * 25;
}

function setCurrent(obj) {
  $("#goal-current").text(`current: ${obj.detail.amount.current}`);
}

document.addEventListener("goalLoad", function (obj) {
  // obj.detail will contain information about the current goal
  // this will fire only once when the widget loads
  // console.log("goalLoad", obj.detail);
  $("#goal-title").html(obj.detail.title);
  $("#goal-total").text(`goal: ${obj.detail.amount.target}`);
  setCurrent(obj);
  $("#goal-progress").css("width", `${progressWidth(obj)}%`);
  // $("#goal-end-date").text(obj.detail.to_go.ends_at);
});



document.addEventListener("goalEvent", function (obj) {
  // obj.detail will contain information about the goal

  // console.log("goalEvent", obj.detail);
  setCurrent(obj);
  $("#goal-progress").css("width", `${progressWidth(obj)}%`);
  console.log($("#goal-progress > svg")[0]);
  console.log($("#goal-progress"));
  console.log($("#goal-progress > svg"));

  $("#goal-progress").removeClass("animated");
  $("#goal-progress > svg").removeClass("animated");
  setTimeout(() => $("#goal-progress").addClass("animated"), 50);
  setTimeout(() => $("#goal-progress > svg").addClass("animated"), 50);
});
