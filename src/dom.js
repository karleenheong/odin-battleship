/* eslint-disable no-plusplus */
// eslint-disable-next-line import/no-cycle
import { triggerCompTurn } from "./app";

const container = document.querySelector('#container');
const instructions = document.querySelector('#instructions');
const leftPlayerButtons = [];
const rightPlayerButtons = [];

export function displayPlayerTurn(currentPlayer) {
  instructions.textContent = '';
  if(currentPlayer.getId() === 0) {
    instructions.textContent = "Left Player's turn";
  } else {
    instructions.textContent = "Right Player's turn";
  }
}

function displayResultsText(player) {
  const resultText = document.createElement('div');
  resultText.className = 'resultText';
  if(player.getId() === 0) {
    resultText.textContent = 'Right Player wins!';
  } else {
    resultText.textContent = 'Left Player wins!'
  }
  container.appendChild(resultText);
}

function removeActiveButton(player, button) {
  if(player.getId() === 0) {
    let index;
    for(let i=0; i<leftPlayerButtons.length; i++) {
      if(button === leftPlayerButtons[i]) {
        index = i;
      }
    }
    leftPlayerButtons.splice(index, 1);
  } else {
    let index;
    for(let i=0; i<rightPlayerButtons.length; i++) {
      if(button === rightPlayerButtons[i]) {
        index = i;
      }
    }
    rightPlayerButtons.splice(index, 1);
  }
}

function checkAllShipsSunk(player) {
  if(player.getGameboard().allShipsSunk()) {
    displayResultsText(player);
    container.className = 'unclickable';
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
  removeActiveButton(player, square);
  checkAllShipsSunk(player);

  if(player.getId() === 1) {
    triggerCompTurn();
  }
}

function renderBoard(player) {
  const boardContainer = document.createElement('div');
  boardContainer.className = 'boardContainer';
  container.appendChild(boardContainer);

  for(let i=9; i>=0; i--) {
    for(let j=0; j<10; j++) {
      const square = document.createElement('button');
      square.id = `${player.getId()}${i}${j}`;
      const coordsTxt = document.createElement('p');
      coordsTxt.className = 'coordsText';

      if(player.getId() === 0) {
        leftPlayerButtons.push(square);
      } else {
        rightPlayerButtons.push(square);
      }

      // check if square is ocean, ship or dead ship
      if(player.getGameboard().getBoard()[i][j] === -1) {
        square.className = 'ocean';
      } else if(player.getGameboard().getBoard()[i][j] >= 0) {
          square.className = 'ship';
        }
      // coordsTxt.textContent = `(${i},${j})`;
      square.appendChild(coordsTxt);

      square.addEventListener('click', () => {
        processClick(square.id, player, i, j);
      });
      
      boardContainer.appendChild(square);
    }
  }
}

export function activateButtons(player) {
  console.log('active');
  if(player.getId() === 0) {
    for(let i=0; i<leftPlayerButtons.length; i++) {
      leftPlayerButtons[i].disabled = false;
    }
  } else {
    for(let i=0; i<rightPlayerButtons.length; i++) {
      rightPlayerButtons[i].disabled = false;
    }
  }
}

export function deactivateButtons(player) {
  console.log('deactive');
  if(player.getId() === 0) {
    for(let i=0; i<leftPlayerButtons.length; i++) {
      leftPlayerButtons[i].disabled = true;
    }
  } else {
    for(let i=0; i<rightPlayerButtons.length; i++) {
      rightPlayerButtons[i].disabled = true;
    }
  }
}

export function displayBoard(player) {
  renderBoard(player);
  deactivateButtons(player);
}

// TO DO
// 2. hide the gameboard on computer side