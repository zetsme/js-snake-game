import { isOpposite, moveDown, moveLeft, moveRight, moveUp, toKey } from './utils.js';

export class Snake {
  constructor(gameboardDomMap, stopGame) {
    this.stopGame = stopGame;
    this.currentDirection = moveRight;
    this.directionsQueue = [];
    this.gameboardDomMap = gameboardDomMap;
    this.snake = this.createInitialSnake();
    this.initializeKeySets();
    this.foodKey = this.spawnFood();
    this.getBoardDimensions();
  }
  getBoardDimensions() {
    const { rows, cols } = [...this.gameboardDomMap.keys()].reduce(
      (acc, cur) => {
        const [row, col] = cur.split('_');
        acc.rows = Number(row) > acc.rows ? Number(row) : acc.rows;
        acc.cols = Number(col) > acc.cols ? Number(col) : acc.cols;
        return acc;
      },
      { rows: 0, cols: 0 }
    );
    this.rows = rows + 1;
    this.cols = cols + 1;
  }
  createInitialSnake() {
    return [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ];
  }
  initializeKeySets() {
    this.snakeKeys = new Set();
    this.vacantKeys = new Set(this.gameboardDomMap.keys());
    for (const part of this.snake) {
      const key = toKey(part);
      this.vacantKeys.delete(key);
      this.snakeKeys.add(key);
    }
  }
  drawSnake() {
    const tail = Array.from(this.snakeKeys)[0];
    const head = Array.from(this.snakeKeys)[this.snakeKeys.size - 1];
    this.gameboardDomMap.forEach((value, key) => {
      value.classList.remove(...value.classList);
      switch (key) {
        case head:
          value.classList.add('head');
          break;
        case tail:
          value.classList.add('tail');
          break;
        case this.foodKey:
          value.classList.add('food');
          break;
        default:
          if (this.snakeKeys.has(key)) {
            value.classList.add('body');
          }
      }
    });
  }

  checkValidHead(nextHead) {
    const [top, left] = nextHead;
    if (top < 0 || left < 0) {
      return false;
    }
    if (top >= this.rows || left >= this.cols) {
      return false;
    }
    if (this.snakeKeys.has(toKey(nextHead))) {
      console.log('Eat yourself');
      return false;
    }
    return true;
  }

  step() {
    let head = this.snake[this.snake.length - 1];
    let nextDirection = this.currentDirection;
    while (this.directionsQueue.length > 0) {
      let candidate = this.directionsQueue.shift();
      if (!isOpposite(candidate, this.currentDirection) && candidate !== this.currentDirection) {
        nextDirection = candidate;
        break;
      }
    }
    this.currentDirection = nextDirection;
    let nextHead = this.currentDirection(head);
    if (!this.checkValidHead(nextHead)) {
      this.stopGame(false);
      return;
    }
    this.pushHead(nextHead);
    if (toKey(nextHead) === this.foodKey) {
      const nextFoodKey = this.spawnFood();
      if (nextFoodKey === null) {
        this.stopGame(true);
        return;
      }
      this.foodKey = nextFoodKey;
    } else {
      this.popTail();
    }
    this.drawSnake();
  }
  pushHead(nextHead) {
    this.snake.push(nextHead);
    const key = toKey(nextHead);
    this.vacantKeys.delete(key);
    this.snakeKeys.add(key);
  }
  popTail() {
    const tail = this.snake.shift();
    const key = toKey(tail);
    this.vacantKeys.add(key);
    this.snakeKeys.delete(key);
  }

  spawnFood() {
    if (this.vacantKeys.size === 0) {
      return null;
    }
    const randomKey = Math.floor(Math.random() * this.vacantKeys.size);
    return Array.from(this.vacantKeys)[randomKey];
  }
  moveRight = () => this.directionsQueue.push(moveRight);
  moveLeft = () => this.directionsQueue.push(moveLeft);
  moveUp = () => this.directionsQueue.push(moveUp);
  moveDown = () => this.directionsQueue.push(moveDown);
}
