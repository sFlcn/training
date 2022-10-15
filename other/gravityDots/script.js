import { animatedDots, generateDot, generateDotsCluster } from './dots.js';

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

const backgroundImage = new Image();
backgroundImage.src = './images/space-tr.png';
const foregroundImage = new Image();
foregroundImage.src = './images/planet.png';

const planetDot = generateDot(
  { x: 940, y: 407, radius: 50, isStationary: true },
  ctx
);

function getDotsData() {
  let dotsArray = generateDotsCluster(
    {
      groupDimension: {x: +xDimElement.value, y: +yDimElement.value},
      radius: radiusElement.value,
      isGraviCener: mCenerElement.checked,
      groupWidth: canvas.width - canvas.width / 4,
      groupHeight: canvas.height - canvas.height / 4,
    },
    ctx
  );
  dotsArray.push(planetDot);
  return dotsArray;
};

const asteroidsScreen = new animatedDots({
  backgroundImage,
  foregroundImage,
  dotsArray: getDotsData(),
  gravityValue: gravityElement.value,
  ctx: ctx,
});

stopButton.addEventListener('click', () => { asteroidsScreen.isAnimatingNow = false });
resetButton.addEventListener('click', () => { asteroidsScreen.dotsArray = getDotsData() });
logButton.addEventListener('click', () => { console.log(asteroidsScreen.dotsArray) });
startButton.addEventListener('click', () => {
  asteroidsScreen.isAnimatingNow = true;
  asteroidsScreen.drawDots();
});
