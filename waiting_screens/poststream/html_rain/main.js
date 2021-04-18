function createDroplet() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("rain_drop");
  svg.setAttribute("preserveAspectRatio", "xMinYMin");
  svg.setAttribute("viewBox", "0 0 5 50");
  svg.setAttribute(
    "style",
    `--x: ${Math.floor(Math.random() * 100)}; --y: ${Math.floor(
      Math.random() * 100
    )}; --o: ${Math.random()}; --a: ${Math.random() + 0.5}; --d: ${
      Math.random() * 2 - 1
    }; --s: ${Math.random()}`
  );

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttributeNS(
    null,
    "d",
    "M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z"
  );

  svg.appendChild(path);
  return svg;
}

function addBubble() {
  let svg = createDroplet();
  document.body.append(svg);
  setTimeout(() => document.body.removeChild(svg), 10000);
}

window.onload = function () {
  // addBubble()
  setInterval(() => addBubble(), 10);
};
