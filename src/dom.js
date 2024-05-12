import { triggerCompTurn } from "./app";

/* eslint-disable no-plusplus */

const container = document.querySelector('#container');
const instructions = document.querySelector('#instructions');
let leftPlayerBoard = null;
let rightPlayerBoard = null;
let playerHasClicked = false;

export function displayPlayerTurn(currentPlayer) {
  instructions.textContent = '';
  if(currentPlayer.getId() === 0) {
    instructions.textContent = "Left Player's turn";
  } else {
    instructions.textContent = "Right Player's turn";
  }
}

export function displayResultsText(player) {
  const resultText = document.createElement('div');
  resultText.className = 'resultText';
  if(player.getId() === 0) {
    resultText.textContent = 'Right Player wins!';
  } else {
    resultText.textContent = 'Left Player wins!'
  }
  container.appendChild(resultText);
  leftPlayerBoard.disabled = true;
  rightPlayerBoard.disabled = true;
}

function checkAllShipsSunk(player) {
  if(player.getGameboard().allShipsSunk()) {
    displayResultsText(player);
  }
}

export function processClick(squareId, player, x, y) {
  const square = document.getElementById(squareId);
  player.getGameboard().receiveAttack([x, y]);

  // check if click hits anything
  if(player.getGameboard().getBoard()[x][y] >= 0) {
    square.className = 'shipDead';
  } else {
    square.className = 'missedShot';
  }

  square.disabled = true;
  checkAllShipsSunk(player);

  if(player.getId() === 1) {
    triggerCompTurn();
  }
}

function renderBoard(player) {
  const boardContainer = document.createElement('div');
  boardContainer.className = 'boardContainer';
  container.appendChild(boardContainer);

  if(player.getId() === 0) {
    leftPlayerBoard = boardContainer;
  } else {
    rightPlayerBoard = boardContainer;
  }

  for(let i=9; i>=0; i--) {
    for(let j=0; j<10; j++) {
      const square = document.createElement('div');
      square.id = `${player.getId()}${i}${j}`;
      const coordsTxt = document.createElement('p');
      coordsTxt.className = 'coordsText';

      // check if square is ocean, ship or dead ship
      if(player.getGameboard().getBoard()[i][j] === -1) {
        square.className = 'ocean';
      } else if(player.getGameboard().getBoard()[i][j] >= 0) {
        square.className = 'ship';
      } else {
        square.className = 'shipDead';
      }
      coordsTxt.textContent = `(${i},${j})`;
      square.appendChild(coordsTxt);

      square.addEventListener('click', () => {
        processClick(square.id, player, i, j);
      });
      
      boardContainer.appendChild(square);
    }
  }
}

export function displayBoard(player) {
  renderBoard(player);
}

export function enableBoard(player) {
  if(player.getId() === 0) {
    leftPlayerBoard.disabled = false;
  } else {
    rightPlayerBoard.disabled = false;
  }
}

export function disableBoard(player) {
  if(player.getId() === 0) {
    leftPlayerBoard.disabled = true;
  } else {
    rightPlayerBoard.disabled = true;
  }
}

export function getPlayerHasClicked() {
  return playerHasClicked;
}

export function setPlayerHasClicked(value) {
  playerHasClicked = value;
}