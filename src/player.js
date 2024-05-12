import Gameboard from "./gameboard";

export default class Player {
  constructor(id, type, gameboard) {
    this.id = id;
    this.type = type;

    if(gameboard === null) {
      this.gameboard = new Gameboard();
    } else {
      this.gameboard = gameboard;
    }
  }

  getGameboard() {
    return this.gameboard;
  }

  getType() {
    return this.type;
  }

  getId() {
    return this.id;
  }
}