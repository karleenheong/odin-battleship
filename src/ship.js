export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.coords = [];
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    if(this.hits >= this.length) {
      return true;
    }
    return false;
  }

  setCoords(coords) {
    this.coords = coords;
  }

  getCoords() {
    return this.coords;
  }

  getLength() {
    return this.length;
  }

  getHits() {
    return this.hits;
  }
}