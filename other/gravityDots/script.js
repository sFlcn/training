import { generateDotsArray, dist, angle } from './dots.js';

const canvas = document.querySelector('#canvas');
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');
const logButton = document.querySelector('#log');
const xDimElement = document.querySelector('#xDim');
const yDimElement = document.querySelector('#yDim');
const radiusElement = document.querySelector('#radius');
const gravityElement = document.querySelector('#gravity');
const mCenerElement = document.querySelector('#mCener');
const ctx = canvas.getContext('2d');

let isAnimatingNow = true;
let dotsArray;

function drawDots() {
  ctx.fillStyle = 'rgba(25, 25, 25, 0.33)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < dotsArray.length; i++) {
    for (let j = i+1; j < dotsArray.length; j++) {
      const d = dist(dotsArray[i], dotsArray[j]);
      if (d > 100) {
        const f = gravityElement.value /d;
        dotsArray[i].recalc(f, angle(dotsArray[i], dotsArray[j]));
        dotsArray[j].recalc(f, angle(dotsArray[j], dotsArray[i]));
      }
    }
  }
  for (const dot of dotsArray) {
    dot.x += dot.f * Math.cos(dot.a);
    dot.y += dot.f * Math.sin(dot.a);
    dot.draw();
  }
  if (isAnimatingNow) {
    setTimeout(() => { window.requestAnimationFrame(drawDots) }, 10);
  }
}

function getDotsArray() {
  return generateDotsArray({
    groupDimension: {x: +xDimElement.value, y: +yDimElement.value},
    radius: radiusElement.value,
    isGraviCener: mCenerElement.checked,
    groupWidth: canvas.width - canvas.width / 4,
    groupHeight: canvas.height - canvas.height / 4,
  }, ctx);
}

startButton.addEventListener('click', () => {
  if (!dotsArray) { dotsArray = getDotsArray() }
  isAnimatingNow = true;
  drawDots();
});

stopButton.addEventListener('click', () => {
  isAnimatingNow = false;
});

resetButton.addEventListener('click', () => {
  dotsArray = getDotsArray();
});

logButton.addEventListener('click', () => {
  console.log(dotsArray);
});
