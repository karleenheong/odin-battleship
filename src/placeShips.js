/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import Gameboard from "./gameboard";

const placementArea = document.querySelector('#placementArea');
const placementInstructions = document.querySelector('#placementInstructions');

const squares = [];
let lastShipPlaced = -1;
let allShipsPlaced = false;

const gameboard = new Gameboard(true);
const ships = gameboard.getShips();

function getSquareCoords(square) {
  const arr = square.id.split('');
  return [+arr[0], +[arr[1]]]
}

function shuffleArray(array) { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    // eslint-disable-next-line no-param-reassign
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
} 

function surroundedByEmptySquares(x, y) {
  const surrounds = [];
  surrounds.push([x, y + 1]); // n
  surrounds.push([x + 1, y + 1]); // ne
  surrounds.push([x + 1, y]); // e
  surrounds.push([x + 1, y - 1]); // se
  surrounds.push([x, y - 1]); // s
  surrounds.push([x - 1, y - 1]); // sw
  surrounds.push([x - 1, y]); // w
  surrounds.push([x - 1, y + 1]) // nw
  
  for(let i=0; i<surrounds.length; i++) {
    // if square on board, check if has ship
    if(surrounds[i][0] >= 0 && surrounds[i][0] <= 9 && surrounds[i][1] >= 0 && surrounds[i][1] <= 9 && gameboard.getBoard()[surrounds[i][0]][surrounds[i][1]] >= 0) {
      return false;
    }
  }
  return true;
}

function setSurroundingSquares(x, y) {
  const surrounds = [];
  surrounds.push([x, y + 1]); // n
  surrounds.push([x + 1, y + 1]); // ne
  surrounds.push([x + 1, y]); // e
  surrounds.push([x + 1, y - 1]); // se
  surrounds.push([x, y - 1]); // s
  surrounds.push([x - 1, y - 1]); // sw
  surrounds.push([x - 1, y]); // w
  surrounds.push([x - 1, y + 1]) // nw
  
  for(let i=0; i<surrounds.length; i++) {
    if(surrounds[i][0] >= 0 && surrounds[i][0] <= 9 && surrounds[i][1] >= 0 && surrounds[i][1] <= 9 && gameboard.getBoard()[surrounds[i][0]][surrounds[i][1]] >= 0) {
      const squareId = `${x}${y}`;
      for(let j=0; j<squares.length; j++) {
        if(squares[i].id === squareId) {
          squares[i].className = 'ocean';
        }
      }
    }
  }
}

function checkValidPath(square, shipLength) {
  const coords = getSquareCoords(square);
  let x = coords[0];
  let y = coords[1];

  if(shipLength === 1) {
    return true;
  }

   // find the coords for all 4 sides
   const paths = [];

   // east path
   let currentPath = [[x, y]];
   for(let i=0; i<shipLength - 1; i++) {
     currentPath.push([x += 1, y]);
   }
   paths.push(currentPath);

   // south path
   currentPath = [[x, y]];
   for(let i=0; i<shipLength - 1; i++) {
     currentPath.push([x, y -= 1]);
   }
   paths.push(currentPath);

   // west path
   currentPath = [[x, y]];
   for(let i=0; i<shipLength - 1; i++) {
     currentPath.push([x -= 1, y]);
   }
   paths.push(currentPath);

   // north path
   currentPath = [[x, y]];
   for(let i=0; i<shipLength - 1; i++) {
     currentPath.push([x, y += 1]);
   }
   paths.push(currentPath);

   // shuffle paths array
   const shuffledPaths = shuffleArray(paths);

   // find a valid path
   let validCoords = [];
   for(let i=0; i<shuffledPaths.length; i++) {
     currentPath = shuffledPaths[i];

     // check each coord for validity
     for(let j=0; j<currentPath.length; j++) {
       if(currentPath[j][0] <= 9 && currentPath[j][0] >= 0 && currentPath[j][1] <= 9 && currentPath[j][1] >= 0 && gameboard.getBoard()[currentPath[j][0]][currentPath[j][1]] === -1 && surroundedByEmptySquares(currentPath[j][0], currentPath[j][1])) {
         validCoords.push(1);
       } else {
         validCoords.push(0);
       }
     }
     let sum = 0;
     for(let k=0; k<validCoords.length; k++) {
       sum += validCoords[k];
     }

     if(sum === validCoords.length) {
       return true;
     }
     validCoords = [];
   }
   return false;
}

function getValidPath(square, shipLength) {
  const coords = getSquareCoords(square);
  let x = coords[0];
  let y = coords[1];

  if(shipLength === 1) {
    return [[x, y]];
  }

   // find the coords for all 4 sides
   const paths = [];

   // east path
   let currentPath = [[x, y]];
   for(let i=0; i<shipLength - 1; i++) {
     currentPath.push([x += 1, y]);
   }
   paths.push(currentPath);

   // south path
   currentPath = [[x, y]];
   for(let i=0; i<shipLength - 1; i++) {
     currentPath.push([x, y -= 1]);
   }
   paths.push(currentPath);

   // west path
   currentPath = [[x, y]];
   for(let i=0; i<shipLength - 1; i++) {
     currentPath.push([x -= 1, y]);
   }
   paths.push(currentPath);

   // north path
   currentPath = [[x, y]];
   for(let i=0; i<shipLength - 1; i++) {
     currentPath.push([x, y += 1]);
   }
   paths.push(currentPath);

   // shuffle paths array
   const shuffledPaths = shuffleArray(paths);

   // find a valid path
   let validCoords = [];
   for(let i=0; i<shuffledPaths.length; i++) {
     currentPath = shuffledPaths[i];

     // check each coord for validity
     for(let j=0; j<currentPath.length; j++) {
       if(currentPath[j][0] <= 9 && currentPath[j][0] >= 0 && currentPath[j][1] <= 9 && currentPath[j][1] >= 0 && gameboard.getBoard()[currentPath[j][0]][currentPath[j][1]] === -1 && surroundedByEmptySquares(currentPath[j][0], currentPath[j][1])) {
         validCoords.push(1);
       } else {
         validCoords.push(0);
       }
     }
     let sum = 0;
     for(let k=0; k<validCoords.length; k++) {
       sum += validCoords[k];
     }

     if(sum === validCoords.length) {
       return currentPath;
     }
     validCoords = [];
   }
   return null;
}

function placeShip(ship, square, shipId) {
  const coords = getValidPath(square, ship.getLength());
  console.log(coords);
  lastShipPlaced += 1;
  ship.setCoords(coords);
  gameboard.setCoords(coords, shipId);
  square.className = 'ship';
  for(let i=0; i<coords.length; i++) {
    setSurroundingSquares(coords[i][0], coords[i][1]);
  }
  if(shipId === 9) {
    allShipsPlaced = true;
  }
  // if(coords !== null) {
   
  // }
}

function refreshValidSquares(ship, shipId) {
  for(let i=0; i<squares.length; i++) {
    const coords = getSquareCoords(squares[i]);
    if(surroundedByEmptySquares(coords[0], coords[1])) {
      if(checkValidPath(squares[i], ship.getLength())) {
        squares[i].className = 'potential';
        squares[i].addEventListener('click', () => {
          placeShip(ship, squares[i], shipId);
        });
      }
    } else {
      squares[i].className = 'ocean';
    }
  }
}

function placeAllShips() {
  switch(lastShipPlaced) {
    case -1:
      placementInstructions.textContent = 'Place the ship of length 4';
      refreshValidSquares(ships[0], 0);
      break;
    case 0:
      placementInstructions.textContent = 'Place the ship of length 3';
      refreshValidSquares(ships[1], 1);
      break;
    case 1:
      placementInstructions.textContent = 'Place the ship of length 3';
      refreshValidSquares(ships[2], 2);
      break;
    case 2:
      placementInstructions.textContent = 'Place the ship of length 2';
      refreshValidSquares(ships[3], 3);
      break;
    case 3:
      placementInstructions.textContent = 'Place the ship of length 2';
      refreshValidSquares(ships[4], 4);
      break;
    case 4:
      placementInstructions.textContent = 'Place the ship of length 2';
      refreshValidSquares(ships[5], 5);
      break;
    case 5:
      placementInstructions.textContent = 'Place the ship of length 1';
      refreshValidSquares(ships[6], 6);
      break;
    case 6:
      placementInstructions.textContent = 'Place the ship of length 1';
      refreshValidSquares(ships[7], 7);
      break;
    case 7:
      placementInstructions.textContent = 'Place the ship of length 1';
      refreshValidSquares(ships[8], 8);
      break;
    case 8:
      placementInstructions.textContent = 'Place the ship of length 1';
      refreshValidSquares(ships[9], 9);
      break;
    default:
      console.log('error');
  }
}

export function startPlacement() {
  while(!allShipsPlaced) {
    setTimeout(placeAllShips, 5000);
  }
  return gameboard;
}

export function renderGrid() {
  const boardContainer = document.createElement('div');
  boardContainer.className = 'boardContainer';
  placementArea.appendChild(boardContainer);

  for(let i=9; i>=0; i--) {
    for(let j=0; j<10; j++) {
      const square = document.createElement('button');
      square.className = 'undetermined';
      square.id = `${i}${j}`;
      const coordsTxt = document.createElement('p');
      coordsTxt.className = 'coordsText';

      coordsTxt.textContent = `(${i},${j})`;
      // square.appendChild(coordsTxt);
  
      boardContainer.appendChild(square);
      squares.push(square);
    }
  }
}




