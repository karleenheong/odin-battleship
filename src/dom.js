/* eslint-disable no-plusplus */
// eslint-disable-next-line import/no-cycle
import { triggerCompTurn } from "./app";

const container = document.querySelector('#container');
const instructions = document.querySelector('#instructions');
const leftPlayerButtons = [];
const rightPlayerButtons = [];
let gameEnded = false;

export function displayPlayerTurn(currentPlayer) {
  if(currentPlayer.getId() === 0) {
    instructions.textContent = "Player One's Turn";
  } else {
    instructions.textContent = "Player Two's Turn";
  }
}

function displayResultsText(player) {
  if(player.getId() === 0) {
    instructions.textContent = 'Player Two Wins!';
  } else {
    instructions.textContent = 'Player One Wins!'
  }
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
    gameEnded = true;
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
  square.classList.remove('hide');
  removeActiveButton(player, square);
  checkAllShipsSunk(player);

  if(player.getId() === 1 && !gameEnded) {
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

export function hideBoard(player) {
  if(player.getId() === 0) {
    for(let i=0; i<leftPlayerButtons.length; i++) {
      leftPlayerButtons[i].classList.add('hide');
    }
  } else {
    for(let i=0; i<rightPlayerButtons.length; i++) {
      rightPlayerButtons[i].classList.add('hide');
    }
  }
}

export function showBoard(player) {
  if(player.getId() === 0) {
    for(let i=0; i<leftPlayerButtons.length; i++) {
      leftPlayerButtons[i].classList.remove('hide');
    }
  } else {
    for(let i=0; i<rightPlayerButtons.length; i++) {
      rightPlayerButtons[i].classList.remove('hide');
    }
  }
}

export function displayBoard(player) {
  renderBoard(player);
  deactivateButtons(player);
}
