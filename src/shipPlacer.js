/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import generateCoords from "./coordGen";

const question = document.querySelector('#question');
const choice = document.querySelector('#choice');

let counter = 0;

export function acceptCoord(gameboard, coords) {
  if(counter < 10) {
    gameboard.getShips()[counter].setCoords(coords);
    for(let i=0; i<coords.length; i++) {
    gameboard.getBoard()[coords[i][0]][coords[i][1]] = counter;
  }
    counter += 1;
  } 
}

export function randomCoord(gameboard) {
  let coords = null;
  if(counter === 0) {
    coords = generateCoords(4, gameboard.getBoard());
  } else if(counter === 1 || counter === 2) {
    coords = generateCoords(3, gameboard.getBoard());
  } else if(counter === 3 || counter === 4 || counter === 5) {
    coords = generateCoords(2, gameboard.getBoard());
  } else {
    coords = generateCoords(1, gameboard.getBoard());
  }

  while(choice.firstChild){
    choice.removeChild(choice.firstChild);
  }

  question.textContent = 'Place ship at coordinates?';
  for(let i=0; i<coords.length; i++) {
    const text = document.createElement('p');
    text.textContent = `(${coords[i]})`;
    choice.appendChild(text);
  }
  
  return coords;
}

export function getCounter() {
  return counter;
}