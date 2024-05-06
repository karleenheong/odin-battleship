/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import Gameboard from "./gameboard";

let gameboard = null;
let ships = null;

beforeEach(() => {
   gameboard = new Gameboard();
   ships = gameboard.getShips();
});

test('gameboard should create 10 ships', () => {
  expect(ships).toHaveLength(10)
});

test('gameboard should generate random coords for last ship of length 4 within bounds of the board and place it', () => {
  let shipParts = 0;
  for(let i=0; i<10; i++) {
    for(let j=0; j<10; j++) {
      if(gameboard.getBoard()[i][j] === 0) {
        shipParts += 1;
      }
    }
  }
  expect(shipParts).toBe(4);
});

test('gameboard should generate random coords for all 10 ships and place them on board giving a total of parts 20', () => {
  let shipParts = 0;
  for(let i=0; i<10; i++) {
    for(let j=0; j<10; j++) {
      if(gameboard.getBoard()[i][j] >= 0) {
        shipParts += 1;
      }
    }
  }
  expect(shipParts).toBe(20);
});

test('ships 6-9 should have coordinate array equal to length 1', () => {
  let sum = 0;
  for(let i=6; i<10; i++) {
    sum += ships[i].getCoords().length;
  }
  expect(sum).toBe(4);
});

test('ships 3-5 should have coordinate array equal to length 2', () => {
  let sum = 0;
  for(let i=3; i<6; i++) {
    sum += ships[i].getCoords().length;
  }
  expect(sum).toBe(6);
});

test('ships 1-2 should have coordinate array equal to length 3', () => {
  let sum = 0;
  for(let i=1; i<3; i++) {
    sum += ships[i].getCoords().length;
  }
  expect(sum).toBe(6);
});

test('ship 0 should have coordinate array equal to length 4', () => {
  expect(ships[0].getCoords().length).toBe(4);
});