import { toKey } from './utils.js';

const gameboard = document.querySelector('.gameboard');

export class GameBoard {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.gameboard = gameboard;
    this.setGameboardDimensions();
  }

  setGameboardDimensions() {
    this.gameboard.innerHTML = '';
    this.gameboard.style.outlineColor = 'black';
    this.gameboard.style.width = this.rows * 10 + 'px';
    this.gameboard.style.height = this.cols * 10 + 'px';
  }

  createCell() {
    const cell = document.createElement('div');
    cell.style.width = '10px';
    cell.style.height = '10px';
    cell.style.border = '1px solid #aaa';
    gameboard.appendChild(cell);
    return cell;
  }

  createDomMap() {
    const gameboardDomMap = new Map();
    for (let i = 0; i < this.cols; i++) {
      for (let k = 0; k < this.rows; k++) {
        const key = toKey([i, k]);
        const cell = this.createCell();
        gameboardDomMap.set(key, cell);
      }
    }
    return gameboardDomMap;
  }
  lost() {
    this.gameboard.style.outlineColor = 'red';
  }
  won() {
    this.gameboard.style.outlineColor = 'green';
  }
}
