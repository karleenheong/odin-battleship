/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import Gameboard from "./gameboard";

test('gameboard should create 10 ships', () => {
  const gameboard = new Gameboard();
  expect(gameboard.getShips()).toHaveLength(10)
});

// test('gameboard should set coords of first ship of length 1 at (5,5)', () => {
//   const gameboard = new Gameboard();
//   const firstShip = gameboard.getShips()[0];
//   expect(firstShip.getCoords()).toEqual([[5, 5]])
// });

// test('gameboard should report ship 0 on its own board at (5,5)', () => {
//   const gameboard = new Gameboard();
//   expect(gameboard.getBoard()[5][5]).toBe(0);
// });

// test('gameboard should generate random coords for first ship within bounds of the board and place it', () => {
//   const gameboard = new Gameboard();
//   let shipFound = false;
//   for(let i=0; i<10; i++) {
//     for(let j=0; j<10; j++) {
//       if(gameboard.getBoard()[i][j] === 0) {
//         shipFound = true;
//       }
//     }
//   }
//   expect(shipFound).toBeTruthy();
// });

test('gameboard should generate random coords for last ship of length 4 within bounds of the board and place it', () => {
  const gameboard = new Gameboard();
  let shipParts = 0;
  for(let i=0; i<10; i++) {
    for(let j=0; j<10; j++) {
      if(gameboard.getBoard()[i][j] === 9) {
        shipParts += 1;
      }
    }
  }
  expect(shipParts).toBe(4);
});