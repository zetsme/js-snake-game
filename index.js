import { GameBoard } from './GameBoard.js';
import { Snake } from './Snake.js';

let interval;
let gameboard;
let snake;

const stopGame = (success) => {
  clearInterval(interval);
  success ? gameboard.won() : gameboard.lost();
};

const startGame = () => {
  gameboard = new GameBoard(50, 30);
  const gameboardDomMap = gameboard.createDomMap();
  snake = new Snake(gameboardDomMap, stopGame);
  snake.drawSnake();
  interval = setInterval(() => snake.step(), 300);
};

startGame();

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowLeft':
      snake.moveLeft();
      break;
    case 'ArrowRight':
      snake.moveRight();
      break;
    case 'ArrowUp':
      snake.moveUp();
      break;
    case 'ArrowDown':
      snake.moveDown();
      break;
    case 'r':
      stopGame(false);
      startGame();
      break;
  }
});
