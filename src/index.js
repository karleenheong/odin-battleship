import runGame from "./app";
import { renderGrid, startPlacement } from "./placeShips";

const welcomeContainer = document.querySelector('#welcome');
const welcomeBtn = document.querySelector('#welcomeBtn');
const placeShipsContainer = document.querySelector('#placeShips');
const startGameBtn = document.querySelector('#startGameBtn');
const container = document.querySelector('#container');
const instructions = document.querySelector('#instructions');

let gameboard = null;

placeShipsContainer.style.display = 'none';
container.style.display = 'none';
instructions.style.display = 'none';

function setupScreen() {
  welcomeContainer.style.display = 'none';
  placeShipsContainer.style.display = 'flex';
  renderGrid();
  gameboard = startPlacement();
}

function startGame() {
  placeShipsContainer.style.display = 'none';
  container.style.display = 'flex';
  instructions.style.display = 'block';
  runGame(gameboard);
}

welcomeBtn.addEventListener('click', setupScreen);
startGameBtn.addEventListener('click', startGame);







