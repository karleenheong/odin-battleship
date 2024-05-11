import './style.css';
import Player from './player';
import { displayBoard } from './dom';

export default function runGame() {
  const player = new Player(0, 'human');
  const comp = new Player(1, 'comp');

  displayBoard(player);
  displayBoard(comp);
}

