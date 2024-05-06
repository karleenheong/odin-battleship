/* eslint-disable no-undef */
import Gameboard from "./gameboard";

test('gameboard should create 10 ships', () => {
  const gameboard = new Gameboard();
  expect(gameboard.getShips()).toHaveLength(10)
});