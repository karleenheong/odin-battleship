/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable no-lonely-if */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
import Ship from "./ship";
import generateCoords from "./coordGen";

export default class Gameboard {
  constructor() {
    this.board = new Array(10);
    this.missedShots = [];
    this.ships = [];
    this.successfulHits = [];

    for(let i=0; i<this.board.length; i++) {
      this.board[i] = new Array(10);
    }

    this.resetBoard();
    this.createShips();
    this.placeShips();
  }

  resetBoard() {
    for(let i=0; i<10; i++) {
      for(let j=0; j<10; j++) {
        this.board[i][j] = -1;
      }
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

  placeShips() {
    for(let i=0; i<this.ships.length; i++) {
      const coords = generateCoords(this.ships[i].getLength(), this.board);
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

  getMissedShots() {
    return this.missedShots;
  }

  getSuccessfulHits() {
    return this.successfulHits;
  }
}