import { generateHeadCoord } from "./coordGen";

const question = document.querySelector('#question');

export function acceptCoord(gameboard, head) {
  
}

export function randomCoord(gameboard) {
  const head = generateHeadCoord(gameboard);
  question.textContent = `Place ship at coordinate ${head}?`
  return head;
}