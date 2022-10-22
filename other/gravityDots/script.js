import { animatedDots, aniDot, generateDotsCluster } from './dots.js';

const canvas = document.querySelector('#canvas');
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');
const logButton = document.querySelector('#log');
const clusterButton = document.querySelector('#cluster');
const xDimElement = document.querySelector('#xDim');
const yDimElement = document.querySelector('#yDim');
const radiusElement = document.querySelector('#radius');
const gravityElement = document.querySelector('#gravity');
const mCenerElement = document.querySelector('#mCener');
const ctx = canvas.getContext('2d');

const backgroundImage = {
  imageElement: new Image(),
};
backgroundImage.imageElement.src = './images/space-tr.png';
const foregroundImage = {
  imageElement: new Image(),
  imageCoordX: 908,
  imageCoordY: 225,
};
foregroundImage.imageElement.src = './images/planet.png';

const planetDot = new aniDot(
  { x: 940, y: 407, radius: 50, isStationary: true },
  ctx
);

const customDotsArray = [
  new aniDot(
    { x: 1610, y: 62, a: 2.9, f: 3.8, radius: 5, color: 'rgb(366,166,216)' },
    ctx
  ),
  new aniDot(
    { x: 607, y: 1391, a: -2.1, f: 2.2, radius: 5, color: 'rgb(150,150,249)' },
    ctx
  ),
  new aniDot(
    { x: -10, y: -100, a: 0, f: 0, radius: 5, color: 'rgb(50,50,249)' },
    ctx
  ),
];

function getDotsData() {
  let dotsArray =[];
  if (clusterButton && !clusterButton.checked) {
    dotsArray = customDotsArray.slice(0);
  } else {
    dotsArray = generateDotsCluster(
      {
        groupDimension: {x: +xDimElement.value, y: +yDimElement.value},
        radius: radiusElement.value,
        isGraviCener: mCenerElement.checked,
        groupWidth: canvas.width - canvas.width / 4,
        groupHeight: canvas.height - canvas.height / 4,
      },
      ctx
    );
  }
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

stopButton.addEventListener('click', () => { asteroidsScreen.isAnimatingNow = false; });
resetButton.addEventListener('click', () => { asteroidsScreen.dotsArray = getDotsData() });
logButton.addEventListener('click', () => { console.log(asteroidsScreen.dotsArray) });
startButton.addEventListener('click', () => {
  asteroidsScreen.isAnimatingNow = true;
  asteroidsScreen.drawDots();
});
