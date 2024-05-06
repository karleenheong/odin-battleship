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
    for(let i=0; i<4; i++) {
      const newShip = new Ship(1);
      this.ships.push(newShip);
    }

    for(let i=0; i<3; i++) {
      const newShip = new Ship(2);
      this.ships.push(newShip);
    }

    for(let i=0; i<2; i++) {
      const newShip = new Ship(3);
      this.ships.push(newShip);
    }

    const newShip = new Ship(4);
    this.ships.push(newShip);
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
        return [x, y];
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
      let validPath;
      for(let i=0; i<paths.length; i++) {
        currentPath = paths[i];
        // check each coord for validity
        for(let j=0; j<currentPath.length; j++) {
          validPath = true;
          if(currentPath[j][0] > 9 || currentPath[j][0] < 0 || currentPath[j][1] > 9 || currentPath[j][1] < 0 || this.board[currentPath[j][0]][currentPath[j][1]] >= 0) {
            validPath = false;
            break;
          }
          if(validPath) {
            validPathFound = true;
            return currentPath;
          }
        }
      }
    }
    return null;
  }

  placeShips() {
    const ship = this.getShips()[9];
    const coords = this.generateCoords(ship.getLength());
    ship.setCoords(coords);

    for(let i=0; i<coords.length; i++) {
      this.board[coords[i][0]][coords[i][1]] = 9;
    }
  }

  // receiveAttack() {

  // }

  allShipsSunk() {
    if(this.ships.length === 0) {
      return true;
    }
    return false;
  }

  getBoard() {
    return this.board;
  }
}