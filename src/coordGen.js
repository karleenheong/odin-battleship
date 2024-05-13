/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */

function shuffleArray(array) { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
} 

function surroundedByEmptySquares(x, y, board) {
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
    if(surrounds[i][0] >= 0 && surrounds[i][0] <= 9 && surrounds[i][1] >= 0 && surrounds[i][1] <= 9 && board[surrounds[i][0]][surrounds[i][1]] >= 0) {
      return false;
    }
  }
  return true;
}

function generateHeadCoord(board) {
  let validHead = false;
  let x = Math.floor(Math.random() * 10)
  let y = Math.floor(Math.random() * 10);
  
  // make sure the head coord is free
  while(!validHead) {
    if(board[x][y] === -1 && surroundedByEmptySquares(x, y, board)) {
      validHead = true;
    } else {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    }
  }
  // console.log(`${x},${y}`);
  return [x, y];
}

export default function generateCoords(shipLength, board) {
  let validPathFound = false;
  while(!validPathFound) {
    const head = generateHeadCoord(board);
    let x = head[0];
    let y = head[1];

    if(shipLength === 1) {
      validPathFound = true;
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
        if(currentPath[j][0] <= 9 && currentPath[j][0] >= 0 && currentPath[j][1] <= 9 && currentPath[j][1] >= 0 && board[currentPath[j][0]][currentPath[j][1]] === -1 && surroundedByEmptySquares(currentPath[j][0], currentPath[j][1], board)) {
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
        validPathFound = true;
        return currentPath;
      }
      validCoords = [];
    }
  }
  return null;
}