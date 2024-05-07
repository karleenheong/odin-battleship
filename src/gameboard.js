/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
import Ship from "./ship";

export default class Gameboard {
  constructor() {
    this.board = new Array(10);
    this.missedShots = [];
    this.ships = [];

    for(let i=0; i<this.board.length; i++) {
      this.board[i] = new Array(10);
    }

    for(let i=0; i<10; i++) {
      for(let j=0; j<10; j++) {
        this.board[i][j] = -1;
      }
    }

    this.createShips();
    this.placeShips();
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

  generateHeadCoord() {
    let validHead = false;
    let x = Math.floor(Math.random() * 10)
    let y = Math.floor(Math.random() * 10);

    // make sure the head coord is free
    while(!validHead) {
      if(this.board[x][y] >= 0) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
      } else {
        validHead = true;
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

      // find a valid path
      let validCoords = [];
      for(let i=0; i<paths.length; i++) {
        currentPath = paths[i];

        // check each coord for validity
        for(let j=0; j<currentPath.length; j++) {
          if(currentPath[j][0] <= 9 && currentPath[j][0] >= 0 && currentPath[j][1] <= 9 && currentPath[j][1] >= 0 && this.board[currentPath[j][0]][currentPath[j][1]] === -1) {
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
    }
  }

  allShipsSunk() {
    if(this.ships.length === 0) {
      return true;
    }
    return false;
  }

  getBoard() {
    return this.board;
  }

  getMissedShots() {
    return this.missedShots;
  }
}