/* eslint-disable no-plusplus */
import './style.css';
import Player from './player';
import { displayBoard, enableBoard, disableBoard, displayPlayerTurn, processClick } from './dom';

let leftPlayer = null;
let rightPlayer = null;
let leftPlayerTurn;

function determineFirstTurn() {
  return Math.floor(Math.random() * 2);
}

function generateValidCoords() {
  let valid = false;
  let aMissedShot = false;
  let aSuccessfulHit = false;
  let x;
  let y;

  while(!valid) {
    x = Math.floor(Math.random() * 10)
    y = Math.floor(Math.random() * 10);

    const coords = [x, y];

    // check if coords are in missed shots or successful hits
    for(let i=0; i<leftPlayer.getGameboard().getMissedShots().length; i++) {
      if(coords.toString() === leftPlayer.getGameboard().getMissedShots()[i]) {
        aMissedShot = true;
      }
    }

    for(let i=0; i<leftPlayer.getGameboard().getSuccessfulHits().length; i++) {
      if(coords.toString() === leftPlayer.getGameboard().getSuccessfulHits()[i]) {
        aSuccessfulHit = true;
      }
    }

    if(!aMissedShot && !aSuccessfulHit) {
      valid = true;
    }
  }
  return [x, y];
}

export function triggerCompTurn() {
  displayPlayerTurn(rightPlayer);
  // enableBoard(leftPlayer);
  // disableBoard(rightPlayer);
  const coords = generateValidCoords();
  const squareId = `0${coords[0]}${coords[1]}`;
  processClick(squareId, leftPlayer, coords[0], coords[1]);
  displayPlayerTurn(leftPlayer);
}

export default function runGame() {
  leftPlayer = new Player(0, 'human');
  rightPlayer = new Player(1, 'comp');

  displayBoard(leftPlayer);
  displayBoard(rightPlayer);

  const firstTurn = determineFirstTurn();

  if(firstTurn === 0) {
    leftPlayerTurn = true;
  } else {
    leftPlayerTurn = false;
  }

  if(leftPlayerTurn) {
    console.log('player turn');
    displayPlayerTurn(leftPlayer);
    // enableBoard(rightPlayer);
    // disableBoard(leftPlayer);
  } else {
    console.log('comp turn');
    triggerCompTurn();
  }
}

  

