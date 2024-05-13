/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ runGame),
/* harmony export */   triggerCompTurn: () => (/* binding */ triggerCompTurn)
/* harmony export */ });
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* eslint-disable no-plusplus */


// eslint-disable-next-line import/no-cycle

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
  while (!valid) {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
    const coords = [x, y];

    // check if coords are in missed shots or successful hits
    for (let i = 0; i < leftPlayer.getGameboard().getMissedShots().length; i++) {
      if (coords.toString() === leftPlayer.getGameboard().getMissedShots()[i]) {
        aMissedShot = true;
      }
    }
    for (let i = 0; i < leftPlayer.getGameboard().getSuccessfulHits().length; i++) {
      if (coords.toString() === leftPlayer.getGameboard().getSuccessfulHits()[i]) {
        aSuccessfulHit = true;
      }
    }
    if (!aMissedShot && !aSuccessfulHit) {
      valid = true;
    }
  }
  return [x, y];
}
function computerThinks() {
  const coords = generateValidCoords();
  const squareId = `0${coords[0]}${coords[1]}`;
  (0,_dom__WEBPACK_IMPORTED_MODULE_2__.processClick)(squareId, leftPlayer, coords[0], coords[1]);
  (0,_dom__WEBPACK_IMPORTED_MODULE_2__.displayPlayerTurn)(leftPlayer);
  (0,_dom__WEBPACK_IMPORTED_MODULE_2__.activateButtons)(rightPlayer);
}
function triggerCompTurn() {
  (0,_dom__WEBPACK_IMPORTED_MODULE_2__.displayPlayerTurn)(rightPlayer);
  (0,_dom__WEBPACK_IMPORTED_MODULE_2__.deactivateButtons)(rightPlayer);
  setTimeout(computerThinks, 500);
}
function runGame(player) {
  if (player !== null) {
    leftPlayer = player;
  } else {
    leftPlayer = new _player__WEBPACK_IMPORTED_MODULE_1__["default"](0, 'human');
  }
  rightPlayer = new _player__WEBPACK_IMPORTED_MODULE_1__["default"](1, 'comp');
  (0,_dom__WEBPACK_IMPORTED_MODULE_2__.displayBoard)(leftPlayer);
  (0,_dom__WEBPACK_IMPORTED_MODULE_2__.displayBoard)(rightPlayer);
  (0,_dom__WEBPACK_IMPORTED_MODULE_2__.hideBoard)(rightPlayer);
  const firstTurn = determineFirstTurn();
  if (firstTurn === 0) {
    leftPlayerTurn = true;
  } else {
    leftPlayerTurn = false;
  }
  if (leftPlayerTurn) {
    (0,_dom__WEBPACK_IMPORTED_MODULE_2__.displayPlayerTurn)(leftPlayer);
    (0,_dom__WEBPACK_IMPORTED_MODULE_2__.activateButtons)(rightPlayer);
  } else {
    (0,_dom__WEBPACK_IMPORTED_MODULE_2__.displayPlayerTurn)(rightPlayer);
    (0,_dom__WEBPACK_IMPORTED_MODULE_2__.deactivateButtons)(rightPlayer);
    triggerCompTurn();
  }
}

/***/ }),

/***/ "./src/coordGen.js":
/*!*************************!*\
  !*** ./src/coordGen.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ generateCoords)
/* harmony export */ });
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function surroundedByEmptySquares(x, y, board) {
  const surrounds = [];
  surrounds.push([x, y + 1]); // n
  surrounds.push([x + 1, y + 1]); // ne
  surrounds.push([x + 1, y]); // e
  surrounds.push([x + 1, y - 1]); // se
  surrounds.push([x, y - 1]); // s
  surrounds.push([x - 1, y - 1]); // sw
  surrounds.push([x - 1, y]); // w
  surrounds.push([x - 1, y + 1]); // nw

  for (let i = 0; i < surrounds.length; i++) {
    // if square on board, check if has ship
    if (surrounds[i][0] >= 0 && surrounds[i][0] <= 9 && surrounds[i][1] >= 0 && surrounds[i][1] <= 9 && board[surrounds[i][0]][surrounds[i][1]] >= 0) {
      return false;
    }
  }
  return true;
}
function generateHeadCoord(board) {
  let validHead = false;
  let x = Math.floor(Math.random() * 10);
  let y = Math.floor(Math.random() * 10);

  // make sure the head coord is free
  while (!validHead) {
    if (board[x][y] === -1 && surroundedByEmptySquares(x, y, board)) {
      validHead = true;
    } else {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    }
  }
  // console.log(`${x},${y}`);
  return [x, y];
}
function generateCoords(shipLength, board) {
  let validPathFound = false;
  while (!validPathFound) {
    const head = generateHeadCoord(board);
    let x = head[0];
    let y = head[1];
    if (shipLength === 1) {
      validPathFound = true;
      return [[x, y]];
    }

    // find the coords for all 4 sides
    const paths = [];

    // east path
    let currentPath = [[x, y]];
    for (let i = 0; i < shipLength - 1; i++) {
      currentPath.push([x += 1, y]);
    }
    paths.push(currentPath);

    // south path
    currentPath = [[x, y]];
    for (let i = 0; i < shipLength - 1; i++) {
      currentPath.push([x, y -= 1]);
    }
    paths.push(currentPath);

    // west path
    currentPath = [[x, y]];
    for (let i = 0; i < shipLength - 1; i++) {
      currentPath.push([x -= 1, y]);
    }
    paths.push(currentPath);

    // north path
    currentPath = [[x, y]];
    for (let i = 0; i < shipLength - 1; i++) {
      currentPath.push([x, y += 1]);
    }
    paths.push(currentPath);

    // shuffle paths array
    const shuffledPaths = shuffleArray(paths);

    // find a valid path
    let validCoords = [];
    for (let i = 0; i < shuffledPaths.length; i++) {
      currentPath = shuffledPaths[i];

      // check each coord for validity
      for (let j = 0; j < currentPath.length; j++) {
        if (currentPath[j][0] <= 9 && currentPath[j][0] >= 0 && currentPath[j][1] <= 9 && currentPath[j][1] >= 0 && board[currentPath[j][0]][currentPath[j][1]] === -1 && surroundedByEmptySquares(currentPath[j][0], currentPath[j][1], board)) {
          validCoords.push(1);
        } else {
          validCoords.push(0);
        }
      }
      let sum = 0;
      for (let k = 0; k < validCoords.length; k++) {
        sum += validCoords[k];
      }
      if (sum === validCoords.length) {
        validPathFound = true;
        return currentPath;
      }
      validCoords = [];
    }
  }
  return null;
}

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   activateButtons: () => (/* binding */ activateButtons),
/* harmony export */   deactivateButtons: () => (/* binding */ deactivateButtons),
/* harmony export */   displayBoard: () => (/* binding */ displayBoard),
/* harmony export */   displayPlayerTurn: () => (/* binding */ displayPlayerTurn),
/* harmony export */   hideBoard: () => (/* binding */ hideBoard),
/* harmony export */   processClick: () => (/* binding */ processClick),
/* harmony export */   showBoard: () => (/* binding */ showBoard)
/* harmony export */ });
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./src/app.js");
/* eslint-disable no-plusplus */
// eslint-disable-next-line import/no-cycle

const container = document.querySelector('#container');
const instructions = document.querySelector('#instructions');
const leftPlayerButtons = [];
const rightPlayerButtons = [];
let gameEnded = false;
function displayPlayerTurn(currentPlayer) {
  if (currentPlayer.getId() === 0) {
    instructions.textContent = "Player One's Turn";
  } else {
    instructions.textContent = "Player Two's Turn";
  }
}
function displayResultsText(player) {
  if (player.getId() === 0) {
    instructions.textContent = 'Player Two Wins!';
  } else {
    instructions.textContent = 'Player One Wins!';
  }
}
function removeActiveButton(player, button) {
  if (player.getId() === 0) {
    let index;
    for (let i = 0; i < leftPlayerButtons.length; i++) {
      if (button === leftPlayerButtons[i]) {
        index = i;
      }
    }
    leftPlayerButtons.splice(index, 1);
  } else {
    let index;
    for (let i = 0; i < rightPlayerButtons.length; i++) {
      if (button === rightPlayerButtons[i]) {
        index = i;
      }
    }
    rightPlayerButtons.splice(index, 1);
  }
}
function checkAllShipsSunk(player) {
  if (player.getGameboard().allShipsSunk()) {
    gameEnded = true;
    displayResultsText(player);
    container.className = 'unclickable';
  }
}
function processClick(squareId, player, x, y) {
  const square = document.getElementById(squareId);
  player.getGameboard().receiveAttack([x, y]);

  // check if click hits anything
  if (player.getGameboard().getBoard()[x][y] >= 0) {
    square.className = 'shipDead';
  } else {
    square.className = 'missedShot';
  }
  square.disabled = true;
  square.classList.remove('hide');
  removeActiveButton(player, square);
  checkAllShipsSunk(player);
  if (player.getId() === 1 && !gameEnded) {
    (0,_app__WEBPACK_IMPORTED_MODULE_0__.triggerCompTurn)();
  }
}
function renderBoard(player) {
  const boardContainer = document.createElement('div');
  boardContainer.className = 'boardContainer';
  container.appendChild(boardContainer);
  for (let j = 9; j >= 0; j--) {
    for (let i = 0; i < 10; i++) {
      const square = document.createElement('button');
      square.id = `${player.getId()}${i}${j}`;
      const coordsTxt = document.createElement('p');
      coordsTxt.className = 'coordsText';
      if (player.getId() === 0) {
        leftPlayerButtons.push(square);
      } else {
        rightPlayerButtons.push(square);
      }

      // check if square is ocean, ship or dead ship
      if (player.getGameboard().getBoard()[i][j] === -1) {
        square.className = 'ocean';
      } else if (player.getGameboard().getBoard()[i][j] >= 0) {
        square.className = 'ship';
      }
      coordsTxt.textContent = `(${i},${j})`;
      // square.appendChild(coordsTxt);

      square.addEventListener('click', () => {
        processClick(square.id, player, i, j);
      });
      boardContainer.appendChild(square);
    }
  }
}
function activateButtons(player) {
  if (player.getId() === 0) {
    for (let i = 0; i < leftPlayerButtons.length; i++) {
      leftPlayerButtons[i].disabled = false;
    }
  } else {
    for (let i = 0; i < rightPlayerButtons.length; i++) {
      rightPlayerButtons[i].disabled = false;
    }
  }
}
function deactivateButtons(player) {
  if (player.getId() === 0) {
    for (let i = 0; i < leftPlayerButtons.length; i++) {
      leftPlayerButtons[i].disabled = true;
    }
  } else {
    for (let i = 0; i < rightPlayerButtons.length; i++) {
      rightPlayerButtons[i].disabled = true;
    }
  }
}
function hideBoard(player) {
  if (player.getId() === 0) {
    for (let i = 0; i < leftPlayerButtons.length; i++) {
      leftPlayerButtons[i].classList.add('hide');
    }
  } else {
    for (let i = 0; i < rightPlayerButtons.length; i++) {
      rightPlayerButtons[i].classList.add('hide');
    }
  }
}
function showBoard(player) {
  if (player.getId() === 0) {
    for (let i = 0; i < leftPlayerButtons.length; i++) {
      leftPlayerButtons[i].classList.remove('hide');
    }
  } else {
    for (let i = 0; i < rightPlayerButtons.length; i++) {
      rightPlayerButtons[i].classList.remove('hide');
    }
  }
}
function displayBoard(player) {
  renderBoard(player);
  deactivateButtons(player);
}

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _coordGen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./coordGen */ "./src/coordGen.js");
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable no-lonely-if */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */


class Gameboard {
  constructor() {
    this.board = new Array(10);
    this.missedShots = [];
    this.ships = [];
    this.successfulHits = [];
    for (let i = 0; i < this.board.length; i++) {
      this.board[i] = new Array(10);
    }
    this.resetBoard();
    this.createShips();
    this.placeShips();
  }
  resetBoard() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.board[i][j] = -1;
      }
    }
  }
  createShips() {
    // ships needed - 4x1, 3x2, 2x3, 1x4
    let newShip = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](4);
    this.ships.push(newShip);
    for (let i = 0; i < 2; i++) {
      newShip = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](3);
      this.ships.push(newShip);
    }
    for (let i = 0; i < 3; i++) {
      newShip = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](2);
      this.ships.push(newShip);
    }
    for (let i = 0; i < 4; i++) {
      newShip = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](1);
      this.ships.push(newShip);
    }
  }
  getShips() {
    return this.ships;
  }
  placeShips() {
    for (let i = 0; i < this.ships.length; i++) {
      const coords = (0,_coordGen__WEBPACK_IMPORTED_MODULE_1__["default"])(this.ships[i].getLength(), this.board);
      this.ships[i].setCoords(coords);
      for (let j = 0; j < coords.length; j++) {
        this.board[coords[j][0]][coords[j][1]] = i;
      }
    }
  }
  receiveAttack(coords) {
    if (this.board[coords[0]][coords[1]] === -1) {
      // record missed shot
      this.missedShots.push(coords);
    } else {
      // send hit to ship
      this.ships[this.board[coords[0]][coords[1]]].hit();
      this.successfulHits.push(coords);
    }
  }
  allShipsSunk() {
    let sum = 0;
    for (let i = 0; i < this.ships.length; i++) {
      if (this.ships[i].isSunk()) {
        sum += 1;
      }
    }
    if (sum === 10) {
      return true;
    }
    return false;
  }
  getBoard() {
    return this.board;
  }
  getMissedShots() {
    return this.missedShots;
  }
  getSuccessfulHits() {
    return this.successfulHits;
  }
}

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");

class Player {
  constructor(id, type) {
    this.id = id;
    this.type = type;
    this.gameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }
  getGameboard() {
    return this.gameboard;
  }
  getType() {
    return this.type;
  }
  getId() {
    return this.id;
  }
}

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.coords = [];
  }
  hit() {
    this.hits += 1;
  }
  isSunk() {
    if (this.hits >= this.length) {
      return true;
    }
    return false;
  }
  setCoords(coords) {
    this.coords = coords;
  }
  getCoords() {
    return this.coords;
  }
  getLength() {
    return this.length;
  }
  getHits() {
    return this.hits;
  }
}

/***/ }),

/***/ "./src/shipPlacer.js":
/*!***************************!*\
  !*** ./src/shipPlacer.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   acceptCoord: () => (/* binding */ acceptCoord),
/* harmony export */   getCounter: () => (/* binding */ getCounter),
/* harmony export */   randomCoord: () => (/* binding */ randomCoord)
/* harmony export */ });
/* harmony import */ var _coordGen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./coordGen */ "./src/coordGen.js");
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */

const question = document.querySelector('#question');
const choice = document.querySelector('#choice');
let counter = 0;
function acceptCoord(gameboard, coords) {
  if (counter < 10) {
    gameboard.getShips()[counter].setCoords(coords);
    for (let i = 0; i < coords.length; i++) {
      gameboard.getBoard()[coords[i][0]][coords[i][1]] = counter;
    }
    counter += 1;
  }
}
function randomCoord(gameboard) {
  let coords = null;
  if (counter === 0) {
    coords = (0,_coordGen__WEBPACK_IMPORTED_MODULE_0__["default"])(4, gameboard.getBoard());
  } else if (counter === 1 || counter === 2) {
    coords = (0,_coordGen__WEBPACK_IMPORTED_MODULE_0__["default"])(3, gameboard.getBoard());
  } else if (counter === 3 || counter === 4 || counter === 5) {
    coords = (0,_coordGen__WEBPACK_IMPORTED_MODULE_0__["default"])(2, gameboard.getBoard());
  } else {
    coords = (0,_coordGen__WEBPACK_IMPORTED_MODULE_0__["default"])(1, gameboard.getBoard());
  }
  while (choice.firstChild) {
    choice.removeChild(choice.firstChild);
  }
  question.textContent = 'Place ship at coordinates?';
  for (let i = 0; i < coords.length; i++) {
    const text = document.createElement('p');
    text.textContent = `(${coords[i]})`;
    choice.appendChild(text);
  }
  return coords;
}
function getCounter() {
  return counter;
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-align: center;
  font-family: Verdana, Tahoma, sans-serif;
}

body {
  background-color: darkslateblue;
}

#playArea {
  display: flex;
  flex-direction: column;
}

#container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 90vh;
  justify-content: center;
  align-items: center;
  background-color: darkslateblue;
}

#welcome,
#shipPlacingScreen,
#shipSelectionScreen {
  padding: 30px 50px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  height: 100vh;
  color: white;
  font-size: 1rem;
  background-color: darkslateblue;
  align-items: center;
}

#welcomeBtn,
#startChoose,
#startRandom,
#yes,
#no,
#begin {
  padding: 20px 30px;
  background-color: dodgerblue;
  border-radius: 10px;
  color: white;
  font-size: 1.3rem;
}

#yes:disabled,
#no:disabled {
  background-color: lightgray;
}

p {
  line-height: 200%;
}

ul {
  list-style-type: none;
  line-height: 200%;
}

#instructions {
  font-size: 2rem;
  height: 10vh;
  background-color: darkslateblue;
  color: white;
}

button {
  outline: none;
  border: none;
}

.unclickable { 
  pointer-events: none; 
} 

.boardContainer {
  margin: 20px;
  background-color: whitesmoke;
  height: 350px;
  width: 350px;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  flex-shrink: 0;
}

.ocean,
.ship,
.shipDead {
  height: 95%;
  width: 95%;
}

.ocean {
  background-color: lightskyblue;
}

.ship {
  background-color: orange;
}

.hide {
  background-color: dodgerblue;
}

.shipDead {
  background-color: red;
}

.missedShot {
  background-color: grey;
}

.coordsText {
  font-size: 1rem;
}

.ocean:hover,
.ship:hover {
  cursor: pointer;
  background-color: aliceblue;
}

/* div {
  border: 2px solid green;
} */

@media only screen and (max-width: 700px) {
  #playArea {
    flex-direction: row;
    align-items: center;
    justify-content: stretch;
  }
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,SAAS;EACT,UAAU;EACV,sBAAsB;EACtB,kBAAkB;EAClB,wCAAwC;AAC1C;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,eAAe;EACf,WAAW;EACX,YAAY;EACZ,uBAAuB;EACvB,mBAAmB;EACnB,+BAA+B;AACjC;;AAEA;;;EAGE,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,SAAS;EACT,WAAW;EACX,aAAa;EACb,YAAY;EACZ,eAAe;EACf,+BAA+B;EAC/B,mBAAmB;AACrB;;AAEA;;;;;;EAME,kBAAkB;EAClB,4BAA4B;EAC5B,mBAAmB;EACnB,YAAY;EACZ,iBAAiB;AACnB;;AAEA;;EAEE,2BAA2B;AAC7B;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,qBAAqB;EACrB,iBAAiB;AACnB;;AAEA;EACE,eAAe;EACf,YAAY;EACZ,+BAA+B;EAC/B,YAAY;AACd;;AAEA;EACE,aAAa;EACb,YAAY;AACd;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,YAAY;EACZ,4BAA4B;EAC5B,aAAa;EACb,YAAY;EACZ,aAAa;EACb,sCAAsC;EACtC,mCAAmC;EACnC,cAAc;AAChB;;AAEA;;;EAGE,WAAW;EACX,UAAU;AACZ;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,eAAe;AACjB;;AAEA;;EAEE,eAAe;EACf,2BAA2B;AAC7B;;AAEA;;GAEG;;AAEH;EACE;IACE,mBAAmB;IACnB,mBAAmB;IACnB,wBAAwB;EAC1B;AACF","sourcesContent":["* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  text-align: center;\n  font-family: Verdana, Tahoma, sans-serif;\n}\n\nbody {\n  background-color: darkslateblue;\n}\n\n#playArea {\n  display: flex;\n  flex-direction: column;\n}\n\n#container {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  width: 100%;\n  height: 90vh;\n  justify-content: center;\n  align-items: center;\n  background-color: darkslateblue;\n}\n\n#welcome,\n#shipPlacingScreen,\n#shipSelectionScreen {\n  padding: 30px 50px;\n  display: flex;\n  flex-direction: column;\n  gap: 30px;\n  width: 100%;\n  height: 100vh;\n  color: white;\n  font-size: 1rem;\n  background-color: darkslateblue;\n  align-items: center;\n}\n\n#welcomeBtn,\n#startChoose,\n#startRandom,\n#yes,\n#no,\n#begin {\n  padding: 20px 30px;\n  background-color: dodgerblue;\n  border-radius: 10px;\n  color: white;\n  font-size: 1.3rem;\n}\n\n#yes:disabled,\n#no:disabled {\n  background-color: lightgray;\n}\n\np {\n  line-height: 200%;\n}\n\nul {\n  list-style-type: none;\n  line-height: 200%;\n}\n\n#instructions {\n  font-size: 2rem;\n  height: 10vh;\n  background-color: darkslateblue;\n  color: white;\n}\n\nbutton {\n  outline: none;\n  border: none;\n}\n\n.unclickable { \n  pointer-events: none; \n} \n\n.boardContainer {\n  margin: 20px;\n  background-color: whitesmoke;\n  height: 350px;\n  width: 350px;\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-template-rows: repeat(10, 1fr);\n  flex-shrink: 0;\n}\n\n.ocean,\n.ship,\n.shipDead {\n  height: 95%;\n  width: 95%;\n}\n\n.ocean {\n  background-color: lightskyblue;\n}\n\n.ship {\n  background-color: orange;\n}\n\n.hide {\n  background-color: dodgerblue;\n}\n\n.shipDead {\n  background-color: red;\n}\n\n.missedShot {\n  background-color: grey;\n}\n\n.coordsText {\n  font-size: 1rem;\n}\n\n.ocean:hover,\n.ship:hover {\n  cursor: pointer;\n  background-color: aliceblue;\n}\n\n/* div {\n  border: 2px solid green;\n} */\n\n@media only screen and (max-width: 700px) {\n  #playArea {\n    flex-direction: row;\n    align-items: center;\n    justify-content: stretch;\n  }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./src/app.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _shipPlacer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shipPlacer */ "./src/shipPlacer.js");



const welcomeContainer = document.querySelector('#welcome');
const welcomeBtn = document.querySelector('#welcomeBtn');
const shipPlacingScreen = document.querySelector('#shipPlacingScreen');
const startChooseBtn = document.querySelector('#startChoose');
const startRandomBtn = document.querySelector('#startRandom');
const shipSelectionScreen = document.querySelector('#shipSelectionScreen');
const choice = document.querySelector('#choice');
const yesBtn = document.querySelector('#yes');
const noBtn = document.querySelector('#no');
const beginBtn = document.querySelector('#begin');
const container = document.querySelector('#container');
const instructions = document.querySelector('#instructions');
let player = null;
let coords = null;
shipPlacingScreen.style.display = 'none';
shipSelectionScreen.style.display = 'none';
container.style.display = 'none';
instructions.style.display = 'none';
function setupScreen() {
  welcomeContainer.style.display = 'none';
  shipPlacingScreen.style.display = 'flex';
}
function startGameChoose() {
  shipPlacingScreen.style.display = 'none';
  shipSelectionScreen.style.display = 'flex';
  player = new _player__WEBPACK_IMPORTED_MODULE_1__["default"](0, 'human');
  player.getGameboard().resetBoard();
  console.log(player);
  coords = (0,_shipPlacer__WEBPACK_IMPORTED_MODULE_2__.randomCoord)(player.getGameboard());
}
function startGameWithBoard() {
  shipSelectionScreen.style.display = 'none';
  container.style.display = 'flex';
  instructions.style.display = 'block';
  (0,_app__WEBPACK_IMPORTED_MODULE_0__["default"])(player);
}
function startGameRandom() {
  shipPlacingScreen.style.display = 'none';
  container.style.display = 'flex';
  instructions.style.display = 'block';
  (0,_app__WEBPACK_IMPORTED_MODULE_0__["default"])(player);
}
function checkButtons() {
  const counter = (0,_shipPlacer__WEBPACK_IMPORTED_MODULE_2__.getCounter)();
  if (counter >= 10) {
    while (choice.firstChild) {
      choice.removeChild(choice.firstChild);
    }
    choice.textContent = "Finished placing ships. Let's begin!";
    yesBtn.disabled = true;
    noBtn.disabled = true;
  } else {
    coords = (0,_shipPlacer__WEBPACK_IMPORTED_MODULE_2__.randomCoord)(player.getGameboard());
  }
}
welcomeBtn.addEventListener('click', setupScreen);
startChooseBtn.addEventListener('click', startGameChoose);
startRandomBtn.addEventListener('click', startGameRandom);
beginBtn.addEventListener('click', startGameWithBoard);
yesBtn.addEventListener('click', () => {
  (0,_shipPlacer__WEBPACK_IMPORTED_MODULE_2__.acceptCoord)(player.getGameboard(), coords);
  checkButtons();
});
noBtn.addEventListener('click', () => {
  coords = (0,_shipPlacer__WEBPACK_IMPORTED_MODULE_2__.randomCoord)(player.getGameboard());
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFRLENBQUMxQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUVpRCxrQkFBa0IsQ0FBQztBQUN0RFQsTUFBTSxDQUFDeEMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU07RUFDckM0Qix3REFBVyxDQUFDN0UsTUFBTSxDQUFDUixZQUFZLENBQUMsQ0FBQyxFQUFFRCxNQUFNLENBQUM7RUFDMUM2RyxZQUFZLENBQUMsQ0FBQztBQUNoQixDQUFDLENBQUM7QUFDRlYsS0FBSyxDQUFDekMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU07RUFDcEMxRCxNQUFNLEdBQUd1Rix3REFBVyxDQUFDOUUsTUFBTSxDQUFDUixZQUFZLENBQUMsQ0FBQyxDQUFDO0FBQzdDLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvYXBwLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9jb29yZEdlbi5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvc2hpcFBsYWNlci5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllcic7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLWN5Y2xlXG5pbXBvcnQgeyBkaXNwbGF5Qm9hcmQsIGRpc3BsYXlQbGF5ZXJUdXJuLCBwcm9jZXNzQ2xpY2ssIGFjdGl2YXRlQnV0dG9ucywgZGVhY3RpdmF0ZUJ1dHRvbnMsIGhpZGVCb2FyZCB9IGZyb20gJy4vZG9tJztcblxubGV0IGxlZnRQbGF5ZXIgPSBudWxsO1xubGV0IHJpZ2h0UGxheWVyID0gbnVsbDtcbmxldCBsZWZ0UGxheWVyVHVybjtcblxuZnVuY3Rpb24gZGV0ZXJtaW5lRmlyc3RUdXJuKCkge1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlVmFsaWRDb29yZHMoKSB7XG4gIGxldCB2YWxpZCA9IGZhbHNlO1xuICBsZXQgYU1pc3NlZFNob3QgPSBmYWxzZTtcbiAgbGV0IGFTdWNjZXNzZnVsSGl0ID0gZmFsc2U7XG4gIGxldCB4O1xuICBsZXQgeTtcblxuICB3aGlsZSghdmFsaWQpIHtcbiAgICB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXG4gICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcblxuICAgIGNvbnN0IGNvb3JkcyA9IFt4LCB5XTtcblxuICAgIC8vIGNoZWNrIGlmIGNvb3JkcyBhcmUgaW4gbWlzc2VkIHNob3RzIG9yIHN1Y2Nlc3NmdWwgaGl0c1xuICAgIGZvcihsZXQgaT0wOyBpPGxlZnRQbGF5ZXIuZ2V0R2FtZWJvYXJkKCkuZ2V0TWlzc2VkU2hvdHMoKS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYoY29vcmRzLnRvU3RyaW5nKCkgPT09IGxlZnRQbGF5ZXIuZ2V0R2FtZWJvYXJkKCkuZ2V0TWlzc2VkU2hvdHMoKVtpXSkge1xuICAgICAgICBhTWlzc2VkU2hvdCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yKGxldCBpPTA7IGk8bGVmdFBsYXllci5nZXRHYW1lYm9hcmQoKS5nZXRTdWNjZXNzZnVsSGl0cygpLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZihjb29yZHMudG9TdHJpbmcoKSA9PT0gbGVmdFBsYXllci5nZXRHYW1lYm9hcmQoKS5nZXRTdWNjZXNzZnVsSGl0cygpW2ldKSB7XG4gICAgICAgIGFTdWNjZXNzZnVsSGl0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZighYU1pc3NlZFNob3QgJiYgIWFTdWNjZXNzZnVsSGl0KSB7XG4gICAgICB2YWxpZCA9IHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBbeCwgeV07XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVyVGhpbmtzKCkge1xuICBjb25zdCBjb29yZHMgPSBnZW5lcmF0ZVZhbGlkQ29vcmRzKCk7XG4gIGNvbnN0IHNxdWFyZUlkID0gYDAke2Nvb3Jkc1swXX0ke2Nvb3Jkc1sxXX1gO1xuICBwcm9jZXNzQ2xpY2soc3F1YXJlSWQsIGxlZnRQbGF5ZXIsIGNvb3Jkc1swXSwgY29vcmRzWzFdKTtcbiAgZGlzcGxheVBsYXllclR1cm4obGVmdFBsYXllcik7XG4gIGFjdGl2YXRlQnV0dG9ucyhyaWdodFBsYXllcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmlnZ2VyQ29tcFR1cm4oKSB7XG4gIGRpc3BsYXlQbGF5ZXJUdXJuKHJpZ2h0UGxheWVyKTtcbiAgZGVhY3RpdmF0ZUJ1dHRvbnMocmlnaHRQbGF5ZXIpO1xuICBzZXRUaW1lb3V0KGNvbXB1dGVyVGhpbmtzLCA1MDApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBydW5HYW1lKHBsYXllcikge1xuICBpZihwbGF5ZXIgIT09IG51bGwpIHtcbiAgICBsZWZ0UGxheWVyID0gcGxheWVyO1xuICB9IGVsc2Uge1xuICAgIGxlZnRQbGF5ZXIgPSBuZXcgUGxheWVyKDAsICdodW1hbicpO1xuICB9XG4gIHJpZ2h0UGxheWVyID0gbmV3IFBsYXllcigxLCAnY29tcCcpO1xuXG4gIGRpc3BsYXlCb2FyZChsZWZ0UGxheWVyKTtcbiAgZGlzcGxheUJvYXJkKHJpZ2h0UGxheWVyKTtcbiAgaGlkZUJvYXJkKHJpZ2h0UGxheWVyKTtcblxuICBjb25zdCBmaXJzdFR1cm4gPSBkZXRlcm1pbmVGaXJzdFR1cm4oKTtcblxuICBpZihmaXJzdFR1cm4gPT09IDApIHtcbiAgICBsZWZ0UGxheWVyVHVybiA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgbGVmdFBsYXllclR1cm4gPSBmYWxzZTtcbiAgfVxuXG4gIGlmKGxlZnRQbGF5ZXJUdXJuKSB7XG4gICAgZGlzcGxheVBsYXllclR1cm4obGVmdFBsYXllcik7XG4gICAgYWN0aXZhdGVCdXR0b25zKHJpZ2h0UGxheWVyKTtcbiAgfSBlbHNlIHtcbiAgICBkaXNwbGF5UGxheWVyVHVybihyaWdodFBsYXllcik7XG4gICAgZGVhY3RpdmF0ZUJ1dHRvbnMocmlnaHRQbGF5ZXIpO1xuICAgIHRyaWdnZXJDb21wVHVybigpO1xuICB9XG59XG5cbiAgXG5cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuXG5mdW5jdGlvbiBzaHVmZmxlQXJyYXkoYXJyYXkpIHsgXG4gIGZvciAobGV0IGkgPSBhcnJheS5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7IFxuICAgIGNvbnN0IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTsgXG4gICAgW2FycmF5W2ldLCBhcnJheVtqXV0gPSBbYXJyYXlbal0sIGFycmF5W2ldXTsgXG4gIH0gXG4gIHJldHVybiBhcnJheTsgXG59IFxuXG5mdW5jdGlvbiBzdXJyb3VuZGVkQnlFbXB0eVNxdWFyZXMoeCwgeSwgYm9hcmQpIHtcbiAgY29uc3Qgc3Vycm91bmRzID0gW107XG4gIHN1cnJvdW5kcy5wdXNoKFt4LCB5ICsgMV0pOyAvLyBuXG4gIHN1cnJvdW5kcy5wdXNoKFt4ICsgMSwgeSArIDFdKTsgLy8gbmVcbiAgc3Vycm91bmRzLnB1c2goW3ggKyAxLCB5XSk7IC8vIGVcbiAgc3Vycm91bmRzLnB1c2goW3ggKyAxLCB5IC0gMV0pOyAvLyBzZVxuICBzdXJyb3VuZHMucHVzaChbeCwgeSAtIDFdKTsgLy8gc1xuICBzdXJyb3VuZHMucHVzaChbeCAtIDEsIHkgLSAxXSk7IC8vIHN3XG4gIHN1cnJvdW5kcy5wdXNoKFt4IC0gMSwgeV0pOyAvLyB3XG4gIHN1cnJvdW5kcy5wdXNoKFt4IC0gMSwgeSArIDFdKSAvLyBud1xuICBcbiAgZm9yKGxldCBpPTA7IGk8c3Vycm91bmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gaWYgc3F1YXJlIG9uIGJvYXJkLCBjaGVjayBpZiBoYXMgc2hpcFxuICAgIGlmKHN1cnJvdW5kc1tpXVswXSA+PSAwICYmIHN1cnJvdW5kc1tpXVswXSA8PSA5ICYmIHN1cnJvdW5kc1tpXVsxXSA+PSAwICYmIHN1cnJvdW5kc1tpXVsxXSA8PSA5ICYmIGJvYXJkW3N1cnJvdW5kc1tpXVswXV1bc3Vycm91bmRzW2ldWzFdXSA+PSAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZUhlYWRDb29yZChib2FyZCkge1xuICBsZXQgdmFsaWRIZWFkID0gZmFsc2U7XG4gIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXG4gIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICBcbiAgLy8gbWFrZSBzdXJlIHRoZSBoZWFkIGNvb3JkIGlzIGZyZWVcbiAgd2hpbGUoIXZhbGlkSGVhZCkge1xuICAgIGlmKGJvYXJkW3hdW3ldID09PSAtMSAmJiBzdXJyb3VuZGVkQnlFbXB0eVNxdWFyZXMoeCwgeSwgYm9hcmQpKSB7XG4gICAgICB2YWxpZEhlYWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICB9XG4gIH1cbiAgLy8gY29uc29sZS5sb2coYCR7eH0sJHt5fWApO1xuICByZXR1cm4gW3gsIHldO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZW5lcmF0ZUNvb3JkcyhzaGlwTGVuZ3RoLCBib2FyZCkge1xuICBsZXQgdmFsaWRQYXRoRm91bmQgPSBmYWxzZTtcbiAgd2hpbGUoIXZhbGlkUGF0aEZvdW5kKSB7XG4gICAgY29uc3QgaGVhZCA9IGdlbmVyYXRlSGVhZENvb3JkKGJvYXJkKTtcbiAgICBsZXQgeCA9IGhlYWRbMF07XG4gICAgbGV0IHkgPSBoZWFkWzFdO1xuXG4gICAgaWYoc2hpcExlbmd0aCA9PT0gMSkge1xuICAgICAgdmFsaWRQYXRoRm91bmQgPSB0cnVlO1xuICAgICAgcmV0dXJuIFtbeCwgeV1dO1xuICAgIH1cblxuICAgIC8vIGZpbmQgdGhlIGNvb3JkcyBmb3IgYWxsIDQgc2lkZXNcbiAgICBjb25zdCBwYXRocyA9IFtdO1xuXG4gICAgLy8gZWFzdCBwYXRoXG4gICAgbGV0IGN1cnJlbnRQYXRoID0gW1t4LCB5XV07XG4gICAgZm9yKGxldCBpPTA7IGk8c2hpcExlbmd0aCAtIDE7IGkrKykge1xuICAgICAgY3VycmVudFBhdGgucHVzaChbeCArPSAxLCB5XSk7XG4gICAgfVxuICAgIHBhdGhzLnB1c2goY3VycmVudFBhdGgpO1xuXG4gICAgLy8gc291dGggcGF0aFxuICAgIGN1cnJlbnRQYXRoID0gW1t4LCB5XV07XG4gICAgZm9yKGxldCBpPTA7IGk8c2hpcExlbmd0aCAtIDE7IGkrKykge1xuICAgICAgY3VycmVudFBhdGgucHVzaChbeCwgeSAtPSAxXSk7XG4gICAgfVxuICAgIHBhdGhzLnB1c2goY3VycmVudFBhdGgpO1xuXG4gICAgLy8gd2VzdCBwYXRoXG4gICAgY3VycmVudFBhdGggPSBbW3gsIHldXTtcbiAgICBmb3IobGV0IGk9MDsgaTxzaGlwTGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICBjdXJyZW50UGF0aC5wdXNoKFt4IC09IDEsIHldKTtcbiAgICB9XG4gICAgcGF0aHMucHVzaChjdXJyZW50UGF0aCk7XG5cbiAgICAvLyBub3J0aCBwYXRoXG4gICAgY3VycmVudFBhdGggPSBbW3gsIHldXTtcbiAgICBmb3IobGV0IGk9MDsgaTxzaGlwTGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICBjdXJyZW50UGF0aC5wdXNoKFt4LCB5ICs9IDFdKTtcbiAgICB9XG4gICAgcGF0aHMucHVzaChjdXJyZW50UGF0aCk7XG5cbiAgICAvLyBzaHVmZmxlIHBhdGhzIGFycmF5XG4gICAgY29uc3Qgc2h1ZmZsZWRQYXRocyA9IHNodWZmbGVBcnJheShwYXRocyk7XG5cbiAgICAvLyBmaW5kIGEgdmFsaWQgcGF0aFxuICAgIGxldCB2YWxpZENvb3JkcyA9IFtdO1xuICAgIGZvcihsZXQgaT0wOyBpPHNodWZmbGVkUGF0aHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGN1cnJlbnRQYXRoID0gc2h1ZmZsZWRQYXRoc1tpXTtcblxuICAgICAgLy8gY2hlY2sgZWFjaCBjb29yZCBmb3IgdmFsaWRpdHlcbiAgICAgIGZvcihsZXQgaj0wOyBqPGN1cnJlbnRQYXRoLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmKGN1cnJlbnRQYXRoW2pdWzBdIDw9IDkgJiYgY3VycmVudFBhdGhbal1bMF0gPj0gMCAmJiBjdXJyZW50UGF0aFtqXVsxXSA8PSA5ICYmIGN1cnJlbnRQYXRoW2pdWzFdID49IDAgJiYgYm9hcmRbY3VycmVudFBhdGhbal1bMF1dW2N1cnJlbnRQYXRoW2pdWzFdXSA9PT0gLTEgJiYgc3Vycm91bmRlZEJ5RW1wdHlTcXVhcmVzKGN1cnJlbnRQYXRoW2pdWzBdLCBjdXJyZW50UGF0aFtqXVsxXSwgYm9hcmQpKSB7XG4gICAgICAgICAgdmFsaWRDb29yZHMucHVzaCgxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWxpZENvb3Jkcy5wdXNoKDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsZXQgc3VtID0gMDtcbiAgICAgIGZvcihsZXQgaz0wOyBrPHZhbGlkQ29vcmRzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHN1bSArPSB2YWxpZENvb3Jkc1trXTtcbiAgICAgIH1cblxuICAgICAgaWYoc3VtID09PSB2YWxpZENvb3Jkcy5sZW5ndGgpIHtcbiAgICAgICAgdmFsaWRQYXRoRm91bmQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gY3VycmVudFBhdGg7XG4gICAgICB9XG4gICAgICB2YWxpZENvb3JkcyA9IFtdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1jeWNsZVxuaW1wb3J0IHsgdHJpZ2dlckNvbXBUdXJuIH0gZnJvbSBcIi4vYXBwXCI7XG5cbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250YWluZXInKTtcbmNvbnN0IGluc3RydWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnN0cnVjdGlvbnMnKTtcbmNvbnN0IGxlZnRQbGF5ZXJCdXR0b25zID0gW107XG5jb25zdCByaWdodFBsYXllckJ1dHRvbnMgPSBbXTtcbmxldCBnYW1lRW5kZWQgPSBmYWxzZTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlQbGF5ZXJUdXJuKGN1cnJlbnRQbGF5ZXIpIHtcbiAgaWYoY3VycmVudFBsYXllci5nZXRJZCgpID09PSAwKSB7XG4gICAgaW5zdHJ1Y3Rpb25zLnRleHRDb250ZW50ID0gXCJQbGF5ZXIgT25lJ3MgVHVyblwiO1xuICB9IGVsc2Uge1xuICAgIGluc3RydWN0aW9ucy50ZXh0Q29udGVudCA9IFwiUGxheWVyIFR3bydzIFR1cm5cIjtcbiAgfVxufVxuXG5mdW5jdGlvbiBkaXNwbGF5UmVzdWx0c1RleHQocGxheWVyKSB7XG4gIGlmKHBsYXllci5nZXRJZCgpID09PSAwKSB7XG4gICAgaW5zdHJ1Y3Rpb25zLnRleHRDb250ZW50ID0gJ1BsYXllciBUd28gV2lucyEnO1xuICB9IGVsc2Uge1xuICAgIGluc3RydWN0aW9ucy50ZXh0Q29udGVudCA9ICdQbGF5ZXIgT25lIFdpbnMhJ1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUFjdGl2ZUJ1dHRvbihwbGF5ZXIsIGJ1dHRvbikge1xuICBpZihwbGF5ZXIuZ2V0SWQoKSA9PT0gMCkge1xuICAgIGxldCBpbmRleDtcbiAgICBmb3IobGV0IGk9MDsgaTxsZWZ0UGxheWVyQnV0dG9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYoYnV0dG9uID09PSBsZWZ0UGxheWVyQnV0dG9uc1tpXSkge1xuICAgICAgICBpbmRleCA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIGxlZnRQbGF5ZXJCdXR0b25zLnNwbGljZShpbmRleCwgMSk7XG4gIH0gZWxzZSB7XG4gICAgbGV0IGluZGV4O1xuICAgIGZvcihsZXQgaT0wOyBpPHJpZ2h0UGxheWVyQnV0dG9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYoYnV0dG9uID09PSByaWdodFBsYXllckJ1dHRvbnNbaV0pIHtcbiAgICAgICAgaW5kZXggPSBpO1xuICAgICAgfVxuICAgIH1cbiAgICByaWdodFBsYXllckJ1dHRvbnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVja0FsbFNoaXBzU3VuayhwbGF5ZXIpIHtcbiAgaWYocGxheWVyLmdldEdhbWVib2FyZCgpLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgZ2FtZUVuZGVkID0gdHJ1ZTtcbiAgICBkaXNwbGF5UmVzdWx0c1RleHQocGxheWVyKTtcbiAgICBjb250YWluZXIuY2xhc3NOYW1lID0gJ3VuY2xpY2thYmxlJztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc0NsaWNrKHNxdWFyZUlkLCBwbGF5ZXIsIHgsIHkpIHtcbiAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc3F1YXJlSWQpO1xuICBwbGF5ZXIuZ2V0R2FtZWJvYXJkKCkucmVjZWl2ZUF0dGFjayhbeCwgeV0pO1xuXG4gIC8vIGNoZWNrIGlmIGNsaWNrIGhpdHMgYW55dGhpbmdcbiAgaWYocGxheWVyLmdldEdhbWVib2FyZCgpLmdldEJvYXJkKClbeF1beV0gPj0gMCkge1xuICAgIHNxdWFyZS5jbGFzc05hbWUgPSAnc2hpcERlYWQnO1xuICB9IGVsc2Uge1xuICAgIHNxdWFyZS5jbGFzc05hbWUgPSAnbWlzc2VkU2hvdCc7XG4gIH1cblxuICBzcXVhcmUuZGlzYWJsZWQgPSB0cnVlO1xuICBzcXVhcmUuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICByZW1vdmVBY3RpdmVCdXR0b24ocGxheWVyLCBzcXVhcmUpO1xuICBjaGVja0FsbFNoaXBzU3VuayhwbGF5ZXIpO1xuXG4gIGlmKHBsYXllci5nZXRJZCgpID09PSAxICYmICFnYW1lRW5kZWQpIHtcbiAgICB0cmlnZ2VyQ29tcFR1cm4oKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW5kZXJCb2FyZChwbGF5ZXIpIHtcbiAgY29uc3QgYm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgYm9hcmRDb250YWluZXIuY2xhc3NOYW1lID0gJ2JvYXJkQ29udGFpbmVyJztcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkQ29udGFpbmVyKTtcblxuICBmb3IobGV0IGo9OTsgaj49MDsgai0tKSB7XG4gICAgZm9yKGxldCBpPTA7IGk8MTA7IGkrKykge1xuICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICBzcXVhcmUuaWQgPSBgJHtwbGF5ZXIuZ2V0SWQoKX0ke2l9JHtqfWA7XG4gICAgICBjb25zdCBjb29yZHNUeHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICBjb29yZHNUeHQuY2xhc3NOYW1lID0gJ2Nvb3Jkc1RleHQnO1xuXG4gICAgICBpZihwbGF5ZXIuZ2V0SWQoKSA9PT0gMCkge1xuICAgICAgICBsZWZ0UGxheWVyQnV0dG9ucy5wdXNoKHNxdWFyZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByaWdodFBsYXllckJ1dHRvbnMucHVzaChzcXVhcmUpO1xuICAgICAgfVxuXG4gICAgICAvLyBjaGVjayBpZiBzcXVhcmUgaXMgb2NlYW4sIHNoaXAgb3IgZGVhZCBzaGlwXG4gICAgICBpZihwbGF5ZXIuZ2V0R2FtZWJvYXJkKCkuZ2V0Qm9hcmQoKVtpXVtqXSA9PT0gLTEpIHtcbiAgICAgICAgc3F1YXJlLmNsYXNzTmFtZSA9ICdvY2Vhbic7XG4gICAgICB9IGVsc2UgaWYocGxheWVyLmdldEdhbWVib2FyZCgpLmdldEJvYXJkKClbaV1bal0gPj0gMCkge1xuICAgICAgICAgIHNxdWFyZS5jbGFzc05hbWUgPSAnc2hpcCc7XG4gICAgICAgIH1cbiAgICAgIGNvb3Jkc1R4dC50ZXh0Q29udGVudCA9IGAoJHtpfSwke2p9KWA7XG4gICAgICAvLyBzcXVhcmUuYXBwZW5kQ2hpbGQoY29vcmRzVHh0KTtcblxuICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBwcm9jZXNzQ2xpY2soc3F1YXJlLmlkLCBwbGF5ZXIsIGksIGopO1xuICAgICAgfSk7XG4gICAgICBcbiAgICAgIGJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHNxdWFyZSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhY3RpdmF0ZUJ1dHRvbnMocGxheWVyKSB7XG4gIGlmKHBsYXllci5nZXRJZCgpID09PSAwKSB7XG4gICAgZm9yKGxldCBpPTA7IGk8bGVmdFBsYXllckJ1dHRvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxlZnRQbGF5ZXJCdXR0b25zW2ldLmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvcihsZXQgaT0wOyBpPHJpZ2h0UGxheWVyQnV0dG9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgcmlnaHRQbGF5ZXJCdXR0b25zW2ldLmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWFjdGl2YXRlQnV0dG9ucyhwbGF5ZXIpIHtcbiAgaWYocGxheWVyLmdldElkKCkgPT09IDApIHtcbiAgICBmb3IobGV0IGk9MDsgaTxsZWZ0UGxheWVyQnV0dG9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgbGVmdFBsYXllckJ1dHRvbnNbaV0uZGlzYWJsZWQgPSB0cnVlO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmb3IobGV0IGk9MDsgaTxyaWdodFBsYXllckJ1dHRvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJpZ2h0UGxheWVyQnV0dG9uc1tpXS5kaXNhYmxlZCA9IHRydWU7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoaWRlQm9hcmQocGxheWVyKSB7XG4gIGlmKHBsYXllci5nZXRJZCgpID09PSAwKSB7XG4gICAgZm9yKGxldCBpPTA7IGk8bGVmdFBsYXllckJ1dHRvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxlZnRQbGF5ZXJCdXR0b25zW2ldLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9yKGxldCBpPTA7IGk8cmlnaHRQbGF5ZXJCdXR0b25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICByaWdodFBsYXllckJ1dHRvbnNbaV0uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0JvYXJkKHBsYXllcikge1xuICBpZihwbGF5ZXIuZ2V0SWQoKSA9PT0gMCkge1xuICAgIGZvcihsZXQgaT0wOyBpPGxlZnRQbGF5ZXJCdXR0b25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZWZ0UGxheWVyQnV0dG9uc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvcihsZXQgaT0wOyBpPHJpZ2h0UGxheWVyQnV0dG9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgcmlnaHRQbGF5ZXJCdXR0b25zW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlCb2FyZChwbGF5ZXIpIHtcbiAgcmVuZGVyQm9hcmQocGxheWVyKTtcbiAgZGVhY3RpdmF0ZUJ1dHRvbnMocGxheWVyKTtcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXMgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1sb25lbHktaWYgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXJlc3RyaWN0ZWQtc3ludGF4ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuaW1wb3J0IGdlbmVyYXRlQ29vcmRzIGZyb20gXCIuL2Nvb3JkR2VuXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVib2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYm9hcmQgPSBuZXcgQXJyYXkoMTApO1xuICAgIHRoaXMubWlzc2VkU2hvdHMgPSBbXTtcbiAgICB0aGlzLnNoaXBzID0gW107XG4gICAgdGhpcy5zdWNjZXNzZnVsSGl0cyA9IFtdO1xuXG4gICAgZm9yKGxldCBpPTA7IGk8dGhpcy5ib2FyZC5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5ib2FyZFtpXSA9IG5ldyBBcnJheSgxMCk7XG4gICAgfVxuXG4gICAgdGhpcy5yZXNldEJvYXJkKCk7XG4gICAgdGhpcy5jcmVhdGVTaGlwcygpO1xuICAgIHRoaXMucGxhY2VTaGlwcygpO1xuICB9XG5cbiAgcmVzZXRCb2FyZCgpIHtcbiAgICBmb3IobGV0IGk9MDsgaTwxMDsgaSsrKSB7XG4gICAgICBmb3IobGV0IGo9MDsgajwxMDsgaisrKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbaV1bal0gPSAtMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjcmVhdGVTaGlwcygpIHtcbiAgICAvLyBzaGlwcyBuZWVkZWQgLSA0eDEsIDN4MiwgMngzLCAxeDRcbiAgICBsZXQgbmV3U2hpcCA9IG5ldyBTaGlwKDQpO1xuICAgIHRoaXMuc2hpcHMucHVzaChuZXdTaGlwKTtcblxuICAgIGZvcihsZXQgaT0wOyBpPDI7IGkrKykge1xuICAgICAgbmV3U2hpcCA9IG5ldyBTaGlwKDMpO1xuICAgICAgdGhpcy5zaGlwcy5wdXNoKG5ld1NoaXApO1xuICAgIH1cblxuICAgIGZvcihsZXQgaT0wOyBpPDM7IGkrKykge1xuICAgICAgbmV3U2hpcCA9IG5ldyBTaGlwKDIpO1xuICAgICAgdGhpcy5zaGlwcy5wdXNoKG5ld1NoaXApO1xuICAgIH1cblxuICAgIGZvcihsZXQgaT0wOyBpPDQ7IGkrKykge1xuICAgICAgbmV3U2hpcCA9IG5ldyBTaGlwKDEpO1xuICAgICAgdGhpcy5zaGlwcy5wdXNoKG5ld1NoaXApO1xuICAgIH1cbiAgfVxuXG4gIGdldFNoaXBzKCkge1xuICAgIHJldHVybiB0aGlzLnNoaXBzO1xuICB9XG5cbiAgcGxhY2VTaGlwcygpIHtcbiAgICBmb3IobGV0IGk9MDsgaTx0aGlzLnNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjb29yZHMgPSBnZW5lcmF0ZUNvb3Jkcyh0aGlzLnNoaXBzW2ldLmdldExlbmd0aCgpLCB0aGlzLmJvYXJkKTtcbiAgICAgIHRoaXMuc2hpcHNbaV0uc2V0Q29vcmRzKGNvb3Jkcyk7XG4gICAgICBmb3IobGV0IGo9MDsgajxjb29yZHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgdGhpcy5ib2FyZFtjb29yZHNbal1bMF1dW2Nvb3Jkc1tqXVsxXV0gPSBpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2soY29vcmRzKSB7XG4gICAgaWYodGhpcy5ib2FyZFtjb29yZHNbMF1dW2Nvb3Jkc1sxXV0gPT09IC0xKSB7XG4gICAgICAvLyByZWNvcmQgbWlzc2VkIHNob3RcbiAgICAgIHRoaXMubWlzc2VkU2hvdHMucHVzaChjb29yZHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzZW5kIGhpdCB0byBzaGlwXG4gICAgICB0aGlzLnNoaXBzW3RoaXMuYm9hcmRbY29vcmRzWzBdXVtjb29yZHNbMV1dXS5oaXQoKTtcbiAgICAgIHRoaXMuc3VjY2Vzc2Z1bEhpdHMucHVzaChjb29yZHMpO1xuICAgIH1cbiAgfVxuXG4gIGFsbFNoaXBzU3VuaygpIHtcbiAgICBsZXQgc3VtID0gMDtcbiAgICBmb3IobGV0IGk9MDsgaTx0aGlzLnNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZih0aGlzLnNoaXBzW2ldLmlzU3VuaygpKSB7XG4gICAgICAgIHN1bSArPSAxO1xuICAgICAgfVxuICAgIH1cbiAgICBpZihzdW0gPT09IDEwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0Qm9hcmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYm9hcmQ7XG4gIH1cblxuICBnZXRNaXNzZWRTaG90cygpIHtcbiAgICByZXR1cm4gdGhpcy5taXNzZWRTaG90cztcbiAgfVxuXG4gIGdldFN1Y2Nlc3NmdWxIaXRzKCkge1xuICAgIHJldHVybiB0aGlzLnN1Y2Nlc3NmdWxIaXRzO1xuICB9XG59IiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IoaWQsIHR5cGUpIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgfVxuXG4gIGdldEdhbWVib2FyZCgpIHtcbiAgICByZXR1cm4gdGhpcy5nYW1lYm9hcmQ7XG4gIH1cblxuICBnZXRUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGU7XG4gIH1cblxuICBnZXRJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5pZDtcbiAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLmhpdHMgPSAwO1xuICAgIHRoaXMuY29vcmRzID0gW107XG4gIH1cblxuICBoaXQoKSB7XG4gICAgdGhpcy5oaXRzICs9IDE7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgaWYodGhpcy5oaXRzID49IHRoaXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc2V0Q29vcmRzKGNvb3Jkcykge1xuICAgIHRoaXMuY29vcmRzID0gY29vcmRzO1xuICB9XG5cbiAgZ2V0Q29vcmRzKCkge1xuICAgIHJldHVybiB0aGlzLmNvb3JkcztcbiAgfVxuXG4gIGdldExlbmd0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5sZW5ndGg7XG4gIH1cblxuICBnZXRIaXRzKCkge1xuICAgIHJldHVybiB0aGlzLmhpdHM7XG4gIH1cbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cbmltcG9ydCBnZW5lcmF0ZUNvb3JkcyBmcm9tIFwiLi9jb29yZEdlblwiO1xuXG5jb25zdCBxdWVzdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNxdWVzdGlvbicpO1xuY29uc3QgY2hvaWNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nob2ljZScpO1xuXG5sZXQgY291bnRlciA9IDA7XG5cbmV4cG9ydCBmdW5jdGlvbiBhY2NlcHRDb29yZChnYW1lYm9hcmQsIGNvb3Jkcykge1xuICBpZihjb3VudGVyIDwgMTApIHtcbiAgICBnYW1lYm9hcmQuZ2V0U2hpcHMoKVtjb3VudGVyXS5zZXRDb29yZHMoY29vcmRzKTtcbiAgICBmb3IobGV0IGk9MDsgaTxjb29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICBnYW1lYm9hcmQuZ2V0Qm9hcmQoKVtjb29yZHNbaV1bMF1dW2Nvb3Jkc1tpXVsxXV0gPSBjb3VudGVyO1xuICB9XG4gICAgY291bnRlciArPSAxO1xuICB9IFxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tQ29vcmQoZ2FtZWJvYXJkKSB7XG4gIGxldCBjb29yZHMgPSBudWxsO1xuICBpZihjb3VudGVyID09PSAwKSB7XG4gICAgY29vcmRzID0gZ2VuZXJhdGVDb29yZHMoNCwgZ2FtZWJvYXJkLmdldEJvYXJkKCkpO1xuICB9IGVsc2UgaWYoY291bnRlciA9PT0gMSB8fCBjb3VudGVyID09PSAyKSB7XG4gICAgY29vcmRzID0gZ2VuZXJhdGVDb29yZHMoMywgZ2FtZWJvYXJkLmdldEJvYXJkKCkpO1xuICB9IGVsc2UgaWYoY291bnRlciA9PT0gMyB8fCBjb3VudGVyID09PSA0IHx8IGNvdW50ZXIgPT09IDUpIHtcbiAgICBjb29yZHMgPSBnZW5lcmF0ZUNvb3JkcygyLCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKSk7XG4gIH0gZWxzZSB7XG4gICAgY29vcmRzID0gZ2VuZXJhdGVDb29yZHMoMSwgZ2FtZWJvYXJkLmdldEJvYXJkKCkpO1xuICB9XG5cbiAgd2hpbGUoY2hvaWNlLmZpcnN0Q2hpbGQpe1xuICAgIGNob2ljZS5yZW1vdmVDaGlsZChjaG9pY2UuZmlyc3RDaGlsZCk7XG4gIH1cblxuICBxdWVzdGlvbi50ZXh0Q29udGVudCA9ICdQbGFjZSBzaGlwIGF0IGNvb3JkaW5hdGVzPyc7XG4gIGZvcihsZXQgaT0wOyBpPGNvb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgdGV4dC50ZXh0Q29udGVudCA9IGAoJHtjb29yZHNbaV19KWA7XG4gICAgY2hvaWNlLmFwcGVuZENoaWxkKHRleHQpO1xuICB9XG4gIFxuICByZXR1cm4gY29vcmRzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q291bnRlcigpIHtcbiAgcmV0dXJuIGNvdW50ZXI7XG59IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYCoge1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1mYW1pbHk6IFZlcmRhbmEsIFRhaG9tYSwgc2Fucy1zZXJpZjtcbn1cblxuYm9keSB7XG4gIGJhY2tncm91bmQtY29sb3I6IGRhcmtzbGF0ZWJsdWU7XG59XG5cbiNwbGF5QXJlYSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbiNjb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDkwdmg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBkYXJrc2xhdGVibHVlO1xufVxuXG4jd2VsY29tZSxcbiNzaGlwUGxhY2luZ1NjcmVlbixcbiNzaGlwU2VsZWN0aW9uU2NyZWVuIHtcbiAgcGFkZGluZzogMzBweCA1MHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDMwcHg7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMHZoO1xuICBjb2xvcjogd2hpdGU7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogZGFya3NsYXRlYmx1ZTtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuI3dlbGNvbWVCdG4sXG4jc3RhcnRDaG9vc2UsXG4jc3RhcnRSYW5kb20sXG4jeWVzLFxuI25vLFxuI2JlZ2luIHtcbiAgcGFkZGluZzogMjBweCAzMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBkb2RnZXJibHVlO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBjb2xvcjogd2hpdGU7XG4gIGZvbnQtc2l6ZTogMS4zcmVtO1xufVxuXG4jeWVzOmRpc2FibGVkLFxuI25vOmRpc2FibGVkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmF5O1xufVxuXG5wIHtcbiAgbGluZS1oZWlnaHQ6IDIwMCU7XG59XG5cbnVsIHtcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xuICBsaW5lLWhlaWdodDogMjAwJTtcbn1cblxuI2luc3RydWN0aW9ucyB7XG4gIGZvbnQtc2l6ZTogMnJlbTtcbiAgaGVpZ2h0OiAxMHZoO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBkYXJrc2xhdGVibHVlO1xuICBjb2xvcjogd2hpdGU7XG59XG5cbmJ1dHRvbiB7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGJvcmRlcjogbm9uZTtcbn1cblxuLnVuY2xpY2thYmxlIHsgXG4gIHBvaW50ZXItZXZlbnRzOiBub25lOyBcbn0gXG5cbi5ib2FyZENvbnRhaW5lciB7XG4gIG1hcmdpbjogMjBweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGVzbW9rZTtcbiAgaGVpZ2h0OiAzNTBweDtcbiAgd2lkdGg6IDM1MHB4O1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG4ub2NlYW4sXG4uc2hpcCxcbi5zaGlwRGVhZCB7XG4gIGhlaWdodDogOTUlO1xuICB3aWR0aDogOTUlO1xufVxuXG4ub2NlYW4ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodHNreWJsdWU7XG59XG5cbi5zaGlwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogb3JhbmdlO1xufVxuXG4uaGlkZSB7XG4gIGJhY2tncm91bmQtY29sb3I6IGRvZGdlcmJsdWU7XG59XG5cbi5zaGlwRGVhZCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbn1cblxuLm1pc3NlZFNob3Qge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xufVxuXG4uY29vcmRzVGV4dCB7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbn1cblxuLm9jZWFuOmhvdmVyLFxuLnNoaXA6aG92ZXIge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJhY2tncm91bmQtY29sb3I6IGFsaWNlYmx1ZTtcbn1cblxuLyogZGl2IHtcbiAgYm9yZGVyOiAycHggc29saWQgZ3JlZW47XG59ICovXG5cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzAwcHgpIHtcbiAgI3BsYXlBcmVhIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBzdHJldGNoO1xuICB9XG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsU0FBUztFQUNULFVBQVU7RUFDVixzQkFBc0I7RUFDdEIsa0JBQWtCO0VBQ2xCLHdDQUF3QztBQUMxQzs7QUFFQTtFQUNFLCtCQUErQjtBQUNqQzs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLGVBQWU7RUFDZixXQUFXO0VBQ1gsWUFBWTtFQUNaLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsK0JBQStCO0FBQ2pDOztBQUVBOzs7RUFHRSxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixTQUFTO0VBQ1QsV0FBVztFQUNYLGFBQWE7RUFDYixZQUFZO0VBQ1osZUFBZTtFQUNmLCtCQUErQjtFQUMvQixtQkFBbUI7QUFDckI7O0FBRUE7Ozs7OztFQU1FLGtCQUFrQjtFQUNsQiw0QkFBNEI7RUFDNUIsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWixpQkFBaUI7QUFDbkI7O0FBRUE7O0VBRUUsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixZQUFZO0VBQ1osK0JBQStCO0VBQy9CLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7RUFDYixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osNEJBQTRCO0VBQzVCLGFBQWE7RUFDYixZQUFZO0VBQ1osYUFBYTtFQUNiLHNDQUFzQztFQUN0QyxtQ0FBbUM7RUFDbkMsY0FBYztBQUNoQjs7QUFFQTs7O0VBR0UsV0FBVztFQUNYLFVBQVU7QUFDWjs7QUFFQTtFQUNFLDhCQUE4QjtBQUNoQzs7QUFFQTtFQUNFLHdCQUF3QjtBQUMxQjs7QUFFQTtFQUNFLDRCQUE0QjtBQUM5Qjs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7O0VBRUUsZUFBZTtFQUNmLDJCQUEyQjtBQUM3Qjs7QUFFQTs7R0FFRzs7QUFFSDtFQUNFO0lBQ0UsbUJBQW1CO0lBQ25CLG1CQUFtQjtJQUNuQix3QkFBd0I7RUFDMUI7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1mYW1pbHk6IFZlcmRhbmEsIFRhaG9tYSwgc2Fucy1zZXJpZjtcXG59XFxuXFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBkYXJrc2xhdGVibHVlO1xcbn1cXG5cXG4jcGxheUFyZWEge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbiNjb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogOTB2aDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IGRhcmtzbGF0ZWJsdWU7XFxufVxcblxcbiN3ZWxjb21lLFxcbiNzaGlwUGxhY2luZ1NjcmVlbixcXG4jc2hpcFNlbGVjdGlvblNjcmVlbiB7XFxuICBwYWRkaW5nOiAzMHB4IDUwcHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogMzBweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGRhcmtzbGF0ZWJsdWU7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4jd2VsY29tZUJ0bixcXG4jc3RhcnRDaG9vc2UsXFxuI3N0YXJ0UmFuZG9tLFxcbiN5ZXMsXFxuI25vLFxcbiNiZWdpbiB7XFxuICBwYWRkaW5nOiAyMHB4IDMwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBkb2RnZXJibHVlO1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGZvbnQtc2l6ZTogMS4zcmVtO1xcbn1cXG5cXG4jeWVzOmRpc2FibGVkLFxcbiNubzpkaXNhYmxlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyYXk7XFxufVxcblxcbnAge1xcbiAgbGluZS1oZWlnaHQ6IDIwMCU7XFxufVxcblxcbnVsIHtcXG4gIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcXG4gIGxpbmUtaGVpZ2h0OiAyMDAlO1xcbn1cXG5cXG4jaW5zdHJ1Y3Rpb25zIHtcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXG4gIGhlaWdodDogMTB2aDtcXG4gIGJhY2tncm91bmQtY29sb3I6IGRhcmtzbGF0ZWJsdWU7XFxuICBjb2xvcjogd2hpdGU7XFxufVxcblxcbmJ1dHRvbiB7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgYm9yZGVyOiBub25lO1xcbn1cXG5cXG4udW5jbGlja2FibGUgeyBcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lOyBcXG59IFxcblxcbi5ib2FyZENvbnRhaW5lciB7XFxuICBtYXJnaW46IDIwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZXNtb2tlO1xcbiAgaGVpZ2h0OiAzNTBweDtcXG4gIHdpZHRoOiAzNTBweDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZmxleC1zaHJpbms6IDA7XFxufVxcblxcbi5vY2VhbixcXG4uc2hpcCxcXG4uc2hpcERlYWQge1xcbiAgaGVpZ2h0OiA5NSU7XFxuICB3aWR0aDogOTUlO1xcbn1cXG5cXG4ub2NlYW4ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRza3libHVlO1xcbn1cXG5cXG4uc2hpcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBvcmFuZ2U7XFxufVxcblxcbi5oaWRlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGRvZGdlcmJsdWU7XFxufVxcblxcbi5zaGlwRGVhZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxufVxcblxcbi5taXNzZWRTaG90IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxufVxcblxcbi5jb29yZHNUZXh0IHtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG59XFxuXFxuLm9jZWFuOmhvdmVyLFxcbi5zaGlwOmhvdmVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IGFsaWNlYmx1ZTtcXG59XFxuXFxuLyogZGl2IHtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIGdyZWVuO1xcbn0gKi9cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDcwMHB4KSB7XFxuICAjcGxheUFyZWEge1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHN0cmV0Y2g7XFxuICB9XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCBydW5HYW1lIGZyb20gXCIuL2FwcFwiO1xuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IGFjY2VwdENvb3JkLCByYW5kb21Db29yZCwgZ2V0Q291bnRlciB9IGZyb20gXCIuL3NoaXBQbGFjZXJcIjtcblxuY29uc3Qgd2VsY29tZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3ZWxjb21lJyk7XG5jb25zdCB3ZWxjb21lQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dlbGNvbWVCdG4nKTtcbmNvbnN0IHNoaXBQbGFjaW5nU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NoaXBQbGFjaW5nU2NyZWVuJyk7XG5jb25zdCBzdGFydENob29zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydENob29zZScpO1xuY29uc3Qgc3RhcnRSYW5kb21CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3RhcnRSYW5kb20nKTtcbmNvbnN0IHNoaXBTZWxlY3Rpb25TY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2hpcFNlbGVjdGlvblNjcmVlbicpO1xuY29uc3QgY2hvaWNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nob2ljZScpO1xuY29uc3QgeWVzQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3llcycpO1xuY29uc3Qgbm9CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbm8nKTtcbmNvbnN0IGJlZ2luQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2JlZ2luJyk7XG5jb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGFpbmVyJyk7XG5jb25zdCBpbnN0cnVjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW5zdHJ1Y3Rpb25zJyk7XG5cbmxldCBwbGF5ZXIgPSBudWxsO1xubGV0IGNvb3JkcyA9IG51bGw7XG5cbnNoaXBQbGFjaW5nU2NyZWVuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5zaGlwU2VsZWN0aW9uU2NyZWVuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbmluc3RydWN0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG5mdW5jdGlvbiBzZXR1cFNjcmVlbigpIHtcbiAgd2VsY29tZUNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBzaGlwUGxhY2luZ1NjcmVlbi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xufVxuXG5mdW5jdGlvbiBzdGFydEdhbWVDaG9vc2UoKSB7XG4gIHNoaXBQbGFjaW5nU2NyZWVuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHNoaXBTZWxlY3Rpb25TY3JlZW4uc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgcGxheWVyID0gbmV3IFBsYXllcigwLCAnaHVtYW4nKTtcbiAgcGxheWVyLmdldEdhbWVib2FyZCgpLnJlc2V0Qm9hcmQoKTtcbiAgY29uc29sZS5sb2cocGxheWVyKTtcbiAgY29vcmRzID0gcmFuZG9tQ29vcmQocGxheWVyLmdldEdhbWVib2FyZCgpKTtcbn1cblxuZnVuY3Rpb24gc3RhcnRHYW1lV2l0aEJvYXJkKCkge1xuICBzaGlwU2VsZWN0aW9uU2NyZWVuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICBpbnN0cnVjdGlvbnMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIHJ1bkdhbWUocGxheWVyKTtcbn1cblxuZnVuY3Rpb24gc3RhcnRHYW1lUmFuZG9tKCkge1xuICBzaGlwUGxhY2luZ1NjcmVlbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBjb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgaW5zdHJ1Y3Rpb25zLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICBydW5HYW1lKHBsYXllcik7XG59XG5cbmZ1bmN0aW9uIGNoZWNrQnV0dG9ucygpIHtcbiAgY29uc3QgY291bnRlciA9IGdldENvdW50ZXIoKTtcbiAgaWYoY291bnRlciA+PSAxMCkge1xuICAgIHdoaWxlKGNob2ljZS5maXJzdENoaWxkKXtcbiAgICAgIGNob2ljZS5yZW1vdmVDaGlsZChjaG9pY2UuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIGNob2ljZS50ZXh0Q29udGVudCA9IFwiRmluaXNoZWQgcGxhY2luZyBzaGlwcy4gTGV0J3MgYmVnaW4hXCI7XG4gICAgeWVzQnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICBub0J0bi5kaXNhYmxlZCA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgY29vcmRzID0gcmFuZG9tQ29vcmQocGxheWVyLmdldEdhbWVib2FyZCgpKTtcbiAgfVxufVxuXG53ZWxjb21lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2V0dXBTY3JlZW4pO1xuc3RhcnRDaG9vc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydEdhbWVDaG9vc2UpXG5zdGFydFJhbmRvbUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJ0R2FtZVJhbmRvbSk7XG5iZWdpbkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJ0R2FtZVdpdGhCb2FyZCk7XG55ZXNCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGFjY2VwdENvb3JkKHBsYXllci5nZXRHYW1lYm9hcmQoKSwgY29vcmRzKTtcbiAgY2hlY2tCdXR0b25zKCk7XG59KTtcbm5vQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBjb29yZHMgPSByYW5kb21Db29yZChwbGF5ZXIuZ2V0R2FtZWJvYXJkKCkpO1xufSk7XG5cblxuXG5cblxuXG5cbiJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiY3NzV2l0aE1hcHBpbmdUb1N0cmluZyIsImxpc3QiLCJ0b1N0cmluZyIsIm1hcCIsIml0ZW0iLCJjb250ZW50IiwibmVlZExheWVyIiwiY29uY2F0IiwibGVuZ3RoIiwiam9pbiIsImkiLCJtb2R1bGVzIiwibWVkaWEiLCJkZWR1cGUiLCJzdXBwb3J0cyIsImxheWVyIiwidW5kZWZpbmVkIiwiYWxyZWFkeUltcG9ydGVkTW9kdWxlcyIsImsiLCJpZCIsIl9rIiwicHVzaCIsImNzc01hcHBpbmciLCJidG9hIiwiYmFzZTY0IiwidW5lc2NhcGUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJKU09OIiwic3RyaW5naWZ5IiwiZGF0YSIsInNvdXJjZU1hcHBpbmciLCJQbGF5ZXIiLCJkaXNwbGF5Qm9hcmQiLCJkaXNwbGF5UGxheWVyVHVybiIsInByb2Nlc3NDbGljayIsImFjdGl2YXRlQnV0dG9ucyIsImRlYWN0aXZhdGVCdXR0b25zIiwiaGlkZUJvYXJkIiwibGVmdFBsYXllciIsInJpZ2h0UGxheWVyIiwibGVmdFBsYXllclR1cm4iLCJkZXRlcm1pbmVGaXJzdFR1cm4iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJnZW5lcmF0ZVZhbGlkQ29vcmRzIiwidmFsaWQiLCJhTWlzc2VkU2hvdCIsImFTdWNjZXNzZnVsSGl0IiwieCIsInkiLCJjb29yZHMiLCJnZXRHYW1lYm9hcmQiLCJnZXRNaXNzZWRTaG90cyIsImdldFN1Y2Nlc3NmdWxIaXRzIiwiY29tcHV0ZXJUaGlua3MiLCJzcXVhcmVJZCIsInRyaWdnZXJDb21wVHVybiIsInNldFRpbWVvdXQiLCJydW5HYW1lIiwicGxheWVyIiwiZmlyc3RUdXJuIiwic2h1ZmZsZUFycmF5IiwiYXJyYXkiLCJqIiwic3Vycm91bmRlZEJ5RW1wdHlTcXVhcmVzIiwiYm9hcmQiLCJzdXJyb3VuZHMiLCJnZW5lcmF0ZUhlYWRDb29yZCIsInZhbGlkSGVhZCIsImdlbmVyYXRlQ29vcmRzIiwic2hpcExlbmd0aCIsInZhbGlkUGF0aEZvdW5kIiwiaGVhZCIsInBhdGhzIiwiY3VycmVudFBhdGgiLCJzaHVmZmxlZFBhdGhzIiwidmFsaWRDb29yZHMiLCJzdW0iLCJjb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJpbnN0cnVjdGlvbnMiLCJsZWZ0UGxheWVyQnV0dG9ucyIsInJpZ2h0UGxheWVyQnV0dG9ucyIsImdhbWVFbmRlZCIsImN1cnJlbnRQbGF5ZXIiLCJnZXRJZCIsInRleHRDb250ZW50IiwiZGlzcGxheVJlc3VsdHNUZXh0IiwicmVtb3ZlQWN0aXZlQnV0dG9uIiwiYnV0dG9uIiwiaW5kZXgiLCJzcGxpY2UiLCJjaGVja0FsbFNoaXBzU3VuayIsImFsbFNoaXBzU3VuayIsImNsYXNzTmFtZSIsInNxdWFyZSIsImdldEVsZW1lbnRCeUlkIiwicmVjZWl2ZUF0dGFjayIsImdldEJvYXJkIiwiZGlzYWJsZWQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJyZW5kZXJCb2FyZCIsImJvYXJkQ29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiY29vcmRzVHh0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImFkZCIsInNob3dCb2FyZCIsIlNoaXAiLCJHYW1lYm9hcmQiLCJjb25zdHJ1Y3RvciIsIkFycmF5IiwibWlzc2VkU2hvdHMiLCJzaGlwcyIsInN1Y2Nlc3NmdWxIaXRzIiwicmVzZXRCb2FyZCIsImNyZWF0ZVNoaXBzIiwicGxhY2VTaGlwcyIsIm5ld1NoaXAiLCJnZXRTaGlwcyIsImdldExlbmd0aCIsInNldENvb3JkcyIsImhpdCIsImlzU3VuayIsInR5cGUiLCJnYW1lYm9hcmQiLCJnZXRUeXBlIiwiaGl0cyIsImdldENvb3JkcyIsImdldEhpdHMiLCJxdWVzdGlvbiIsImNob2ljZSIsImNvdW50ZXIiLCJhY2NlcHRDb29yZCIsInJhbmRvbUNvb3JkIiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwidGV4dCIsImdldENvdW50ZXIiLCJ3ZWxjb21lQ29udGFpbmVyIiwid2VsY29tZUJ0biIsInNoaXBQbGFjaW5nU2NyZWVuIiwic3RhcnRDaG9vc2VCdG4iLCJzdGFydFJhbmRvbUJ0biIsInNoaXBTZWxlY3Rpb25TY3JlZW4iLCJ5ZXNCdG4iLCJub0J0biIsImJlZ2luQnRuIiwic3R5bGUiLCJkaXNwbGF5Iiwic2V0dXBTY3JlZW4iLCJzdGFydEdhbWVDaG9vc2UiLCJjb25zb2xlIiwibG9nIiwic3RhcnRHYW1lV2l0aEJvYXJkIiwic3RhcnRHYW1lUmFuZG9tIiwiY2hlY2tCdXR0b25zIl0sInNvdXJjZVJvb3QiOiIifQ==