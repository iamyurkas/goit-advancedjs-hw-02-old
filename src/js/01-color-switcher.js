const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
  body: document.body,
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

refs.start.addEventListener('click', onStartColor);
refs.stop.addEventListener('click', onStopColor);

refs.start.disabled = false;
refs.stop.disabled = true;

let startColor;

function onStartColor() {
  startColor = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  refs.start.disabled = true;
  refs.stop.disabled = false;
}

function onStopColor() {
  clearInterval(startColor);

  refs.start.disabled = false;
  refs.stop.disabled = true;
}
