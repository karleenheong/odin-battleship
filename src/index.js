import runGame from "./app";
import Player from "./player";
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

let player = null;
let coords = null;

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
  player = new Player(0, 'human');
  player.getGameboard().resetBoard();
  coords = randomCoord(player);
}

function startGameWithBoard() {
  shipSelectionScreen.style.display = 'none';
  container.style.display = 'flex';
  instructions.style.display = 'block';
  runGame(player);
}

function startGameRandom() {
  shipPlacingScreen.style.display = 'none';
  container.style.display = 'flex';
  instructions.style.display = 'block';
  runGame(player);
}

welcomeBtn.addEventListener('click', setupScreen);
startChooseBtn.addEventListener('click', startGameChoose)
startRandomBtn.addEventListener('click', startGameRandom);
beginBtn.addEventListener('click', startGameWithBoard);
yesBtn.addEventListener('click', () => {
  acceptCoord(player.getGameboard(), coords);
});
noBtn.addEventListener('click', () => {
  coords = randomCoord(player.getGameboard());
});







