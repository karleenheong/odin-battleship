import Gameboard from "./gameboard";

export default class Player {
  constructor(id, type) {
    this.id = id;
    this.type = type;
    this.gameboard = new Gameboard();
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