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

    this.createShips();

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


  // placeShip(ship, x, y) {

  // }

  // receiveAttack() {

  // }

  allShipsSunk() {
    if(this.ships.length === 0) {
      return true;
    }
    return false;
  }
}