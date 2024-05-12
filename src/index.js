import runGame from "./app";

const welcomeContainer = document.querySelector('#welcome');
const welcomeBtn = document.querySelector('#welcomeBtn');
const container = document.querySelector('#container');
const instructions = document.querySelector('#instructions');

container.style.display = 'none';
instructions.style.display = 'none';

function setupScreen() {
  welcomeContainer.style.display = 'none';
  container.style.display = 'flex';
  instructions.style.display = 'block';
  runGame();
}

welcomeBtn.addEventListener('click', setupScreen);







