/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable no-lonely-if */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
import Ship from "./ship";

export default class Gameboard {
  constructor(userCoords) {
    this.board = new Array(10);
    this.missedShots = [];
    this.ships = [];
    this.successfulHits = [];

    for(let i=0; i<this.board.length; i++) {
      this.board[i] = new Array(10);
    }

    for(let i=0; i<10; i++) {
      for(let j=0; j<10; j++) {
        this.board[i][j] = -1;
      }
    }

    this.createShips();
    if(!userCoords) {
      this.placeShips();
    }
  }

  createShips() {
    // ships needed - 4x1, 3x2, 2x3, 1x4
    let newShip = new Ship(4);
    this.ships.push(newShip);

    for(let i=0; i<2; i++) {
      newShip = new Ship(3);
      this.ships.push(newShip);
    }

    for(let i=0; i<3; i++) {
      newShip = new Ship(2);
      this.ships.push(newShip);
    }

    for(let i=0; i<4; i++) {
      newShip = new Ship(1);
      this.ships.push(newShip);
    }
  }

  getShips() {
    return this.ships;
  }

  shuffleArray(array) { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  } 

  surroundedByEmptySquares(x, y) {
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
      if(surrounds[i][0] >= 0 && surrounds[i][0] <= 9 && surrounds[i][1] >= 0 && surrounds[i][1] <= 9 && this.board[surrounds[i][0]][surrounds[i][1]] >= 0) {
        return false;
      }
    }
    return true;
  }

  generateHeadCoord() {
    let validHead = false;
    let x = Math.floor(Math.random() * 10)
    let y = Math.floor(Math.random() * 10);

    // make sure the head coord is free
    while(!validHead) {
      if(this.board[x][y] === -1 && this.surroundedByEmptySquares(x, y)) {
        validHead = true;
      } else {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      }
    }
    return [x, y];
  }

  generateCoords(shipLength) {
    let validPathFound = false;
    while(!validPathFound) {
      const head = this.generateHeadCoord();
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
      const shuffledPaths = this.shuffleArray(paths);

      // find a valid path
      let validCoords = [];
      for(let i=0; i<shuffledPaths.length; i++) {
        currentPath = shuffledPaths[i];

        // check each coord for validity
        for(let j=0; j<currentPath.length; j++) {
          if(currentPath[j][0] <= 9 && currentPath[j][0] >= 0 && currentPath[j][1] <= 9 && currentPath[j][1] >= 0 && this.board[currentPath[j][0]][currentPath[j][1]] === -1 && this.surroundedByEmptySquares(currentPath[j][0], currentPath[j][1])) {
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

  placeShips() {
    for(let i=0; i<this.ships.length; i++) {
      const coords = this.generateCoords(this.ships[i].getLength());
      this.ships[i].setCoords(coords);
      for(let j=0; j<coords.length; j++) {
        this.board[coords[j][0]][coords[j][1]] = i;
      }
    }
  }

  receiveAttack(coords) {
    if(this.board[coords[0]][coords[1]] === -1) {
      // record missed shot
      this.missedShots.push(coords);
    } else {
      // send hit to ship
      this.ships[this.board[coords[0]][coords[1]]].hit();
      this.successfulHits.push(coords);
    }
  }

  allShipsSunk() {
    let sum = 0;
    for(let i=0; i<this.ships.length; i++) {
      if(this.ships[i].isSunk()) {
        sum += 1;
      }
    }
    if(sum === 10) {
      return true;
    }
    return false;
  }

  getBoard() {
    return this.board;
  }

  setCoords(coords, shipId) {
    console.log(coords);
    for(let i=0; i<coords.length; i++) {
      this.board[coords[i][0]][coords[i][1]] = shipId;
    }
  }

  getMissedShots() {
    return this.missedShots;
  }

  getSuccessfulHits() {
    return this.successfulHits;
  }
}