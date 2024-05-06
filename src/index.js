import './style.css';
import Gameboard from "./gameboard";

function component() {
  const element = document.createElement('div');

  element.textContent = 'HELLO BITCH';
  element.classList.add('hello');

  return element;
}

document.body.appendChild(component());

const gameboard = new Gameboard();
// const ships = gameboard.getShips();
// // console.log(ships);
