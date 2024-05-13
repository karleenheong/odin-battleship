import runGame from "./app";
import Gameboard from "./gameboard";
import { acceptCoord, randomCoord } from "./shipPlacer";

const welcomeContainer = document.querySelector('#welcome');
const welcomeBtn = document.querySelector('#welcomeBtn');
const shipPlacingScreen = document.querySelector('#shipPlacingScreen');
const startChooseBtn = document.querySelector('#startChoose');
const startRandomBtn = document.querySelector('#startRandom');
const shipSelectionScreen = document.querySelector('#shipSelectionScreen');
const yesBtn = document.querySelector('#yes');
const noBtn = document.querySelector('#no');
const beginBtn = document.querySelector('#begin');
const container = document.querySelector('#container');
const instructions = document.querySelector('#instructions');

let gameboard = null;
let head = null;
let counter = 0;

shipPlacingScreen.style.display = 'none';
shipSelectionScreen.style.display = 'none';
container.style.display = 'none';
instructions.style.display = 'none';

function setupScreen() {
  welcomeContainer.style.display = 'none';
  shipPlacingScreen.style.display = 'flex';
}

function startGameChoose() {
  shipPlacingScreen.style.display = 'none';
  shipSelectionScreen.style.display = 'flex';
  gameboard = new Gameboard();
  head = randomCoord(gameboard);
}

function startGameWithBoard() {
  shipSelectionScreen.style.display = 'none';
  container.style.display = 'flex';
  instructions.style.display = 'block';
  if(counter >= 9) {
    runGame(gameboard);
  } else {
    runGame();
  }
}

function startGameRandom() {
  shipPlacingScreen.style.display = 'none';
  container.style.display = 'flex';
  instructions.style.display = 'block';
  runGame();
}

welcomeBtn.addEventListener('click', setupScreen);
startChooseBtn.addEventListener('click', startGameChoose)
startRandomBtn.addEventListener('click', startGameRandom);
beginBtn.addEventListener('click', startGameWithBoard);
yesBtn.addEventListener('click', () => {
  if(counter < 10) {
    acceptCoord(gameboard, head);
    counter += 1;
  }
});
noBtn.addEventListener('click', () => {
  head = randomCoord(gameboard);
});







