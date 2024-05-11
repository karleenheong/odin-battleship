/* eslint-disable no-plusplus */
import './style.css';
import Player from './player';
import { displayBoard, enableBoard, disableBoard, displayPlayerTurn, displayResultsText, processClick, getPlayerHasClicked, setPlayerHasClicked } from './dom';

let leftPlayer = null;
let rightPlayer = null;
let gameEnded = false;
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

function checkAllShipsSunk(player) {
  if(player.getGameboard().allShipsSunk()) {
    displayResultsText(player);
    gameEnded = true;
  }
}

function triggerCompTurn() {
  displayPlayerTurn(rightPlayer);
  enableBoard(leftPlayer);
  disableBoard(rightPlayer);
  const coords = generateValidCoords();
  const squareId = `0${coords[0]}${coords[1]}}`;

  processClick(+squareId, leftPlayer, coords[0], coords[1]);

  checkAllShipsSunk(leftPlayer);
  leftPlayerTurn = true;
}

function triggerPlayerTurn() {
  displayPlayerTurn(leftPlayer);
  enableBoard(rightPlayer);
  disableBoard(leftPlayer);

  while(!getPlayerHasClicked()) {
    if(getPlayerHasClicked()) {
      checkAllShipsSunk(rightPlayer);
      leftPlayerTurn = false;
    }
  }
  setPlayerHasClicked(false);
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

  while(!gameEnded) {
    if(leftPlayerTurn) {
      triggerPlayerTurn();
    } else {
      triggerCompTurn();
    }
  }
}

  

