/* eslint-disable no-plusplus */

const container = document.querySelector('#container');

function processClick(squareId, player, x, y) {
  const square = document.getElementById(squareId);
  player.getGameboard().receiveAttack([x, y]);
  // check if click hits anything
  if(player.getGameboard().getBoard()[x][y] >= 0) {
    square.className = 'shipDead';
  } else {
    square.className = 'missedShot';
  }
}

function renderBoard(player) {
  const boardContainer = document.createElement('div');
  boardContainer.className = 'boardContainer';
  container.appendChild(boardContainer);

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

      // if computer gameboard, add event listeners
      if(player.getType() === 'comp' && square.className !== 'shipDead') {
        square.addEventListener('click', () => {
          processClick(square.id, player, i, j);
        });
      }
      
      boardContainer.appendChild(square);
    }
  }
}

export function displayBoard(player) {
  renderBoard(player);
}