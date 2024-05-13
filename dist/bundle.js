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
  coords = (0,_shipPlacer__WEBPACK_IMPORTED_MODULE_2__.randomCoord)(player.getGameboard());
}
function startGameWithBoard() {
  shipSelectionScreen.style.display = 'none';
  container.style.display = 'flex';
  instructions.style.display = 'block';
  if ((0,_shipPlacer__WEBPACK_IMPORTED_MODULE_2__.getCounter)() < 10) {
    player = null;
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFPLEVBQUVnRCxlQUFlLENBQUM7QUFDekROLFFBQVEsQ0FBQzFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRStDLGtCQUFrQixDQUFDO0FBQ3REUCxNQUFNLENBQUN4QyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtFQUNyQzRCLHdEQUFXLENBQUM3RSxNQUFNLENBQUNSLFlBQVksQ0FBQyxDQUFDLEVBQUVELE1BQU0sQ0FBQztFQUMxQzJHLFlBQVksQ0FBQyxDQUFDO0FBQ2hCLENBQUMsQ0FBQztBQUNGUixLQUFLLENBQUN6QyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtFQUNwQzFELE1BQU0sR0FBR3VGLHdEQUFXLENBQUM5RSxNQUFNLENBQUNSLFlBQVksQ0FBQyxDQUFDLENBQUM7QUFDN0MsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9hcHAuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2Nvb3JkR2VuLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9zaGlwUGxhY2VyLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJztcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tY3ljbGVcbmltcG9ydCB7IGRpc3BsYXlCb2FyZCwgZGlzcGxheVBsYXllclR1cm4sIHByb2Nlc3NDbGljaywgYWN0aXZhdGVCdXR0b25zLCBkZWFjdGl2YXRlQnV0dG9ucywgaGlkZUJvYXJkIH0gZnJvbSAnLi9kb20nO1xuXG5sZXQgbGVmdFBsYXllciA9IG51bGw7XG5sZXQgcmlnaHRQbGF5ZXIgPSBudWxsO1xubGV0IGxlZnRQbGF5ZXJUdXJuO1xuXG5mdW5jdGlvbiBkZXRlcm1pbmVGaXJzdFR1cm4oKSB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVWYWxpZENvb3JkcygpIHtcbiAgbGV0IHZhbGlkID0gZmFsc2U7XG4gIGxldCBhTWlzc2VkU2hvdCA9IGZhbHNlO1xuICBsZXQgYVN1Y2Nlc3NmdWxIaXQgPSBmYWxzZTtcbiAgbGV0IHg7XG4gIGxldCB5O1xuXG4gIHdoaWxlKCF2YWxpZCkge1xuICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcbiAgICB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuXG4gICAgY29uc3QgY29vcmRzID0gW3gsIHldO1xuXG4gICAgLy8gY2hlY2sgaWYgY29vcmRzIGFyZSBpbiBtaXNzZWQgc2hvdHMgb3Igc3VjY2Vzc2Z1bCBoaXRzXG4gICAgZm9yKGxldCBpPTA7IGk8bGVmdFBsYXllci5nZXRHYW1lYm9hcmQoKS5nZXRNaXNzZWRTaG90cygpLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZihjb29yZHMudG9TdHJpbmcoKSA9PT0gbGVmdFBsYXllci5nZXRHYW1lYm9hcmQoKS5nZXRNaXNzZWRTaG90cygpW2ldKSB7XG4gICAgICAgIGFNaXNzZWRTaG90ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IobGV0IGk9MDsgaTxsZWZ0UGxheWVyLmdldEdhbWVib2FyZCgpLmdldFN1Y2Nlc3NmdWxIaXRzKCkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKGNvb3Jkcy50b1N0cmluZygpID09PSBsZWZ0UGxheWVyLmdldEdhbWVib2FyZCgpLmdldFN1Y2Nlc3NmdWxIaXRzKClbaV0pIHtcbiAgICAgICAgYVN1Y2Nlc3NmdWxIaXQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKCFhTWlzc2VkU2hvdCAmJiAhYVN1Y2Nlc3NmdWxIaXQpIHtcbiAgICAgIHZhbGlkID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFt4LCB5XTtcbn1cblxuZnVuY3Rpb24gY29tcHV0ZXJUaGlua3MoKSB7XG4gIGNvbnN0IGNvb3JkcyA9IGdlbmVyYXRlVmFsaWRDb29yZHMoKTtcbiAgY29uc3Qgc3F1YXJlSWQgPSBgMCR7Y29vcmRzWzBdfSR7Y29vcmRzWzFdfWA7XG4gIHByb2Nlc3NDbGljayhzcXVhcmVJZCwgbGVmdFBsYXllciwgY29vcmRzWzBdLCBjb29yZHNbMV0pO1xuICBkaXNwbGF5UGxheWVyVHVybihsZWZ0UGxheWVyKTtcbiAgYWN0aXZhdGVCdXR0b25zKHJpZ2h0UGxheWVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRyaWdnZXJDb21wVHVybigpIHtcbiAgZGlzcGxheVBsYXllclR1cm4ocmlnaHRQbGF5ZXIpO1xuICBkZWFjdGl2YXRlQnV0dG9ucyhyaWdodFBsYXllcik7XG4gIHNldFRpbWVvdXQoY29tcHV0ZXJUaGlua3MsIDUwMCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJ1bkdhbWUocGxheWVyKSB7XG4gIGlmKHBsYXllciAhPT0gbnVsbCkge1xuICAgIGxlZnRQbGF5ZXIgPSBwbGF5ZXI7XG4gIH0gZWxzZSB7XG4gICAgbGVmdFBsYXllciA9IG5ldyBQbGF5ZXIoMCwgJ2h1bWFuJyk7XG4gIH1cbiAgcmlnaHRQbGF5ZXIgPSBuZXcgUGxheWVyKDEsICdjb21wJyk7XG5cbiAgZGlzcGxheUJvYXJkKGxlZnRQbGF5ZXIpO1xuICBkaXNwbGF5Qm9hcmQocmlnaHRQbGF5ZXIpO1xuICBoaWRlQm9hcmQocmlnaHRQbGF5ZXIpO1xuXG4gIGNvbnN0IGZpcnN0VHVybiA9IGRldGVybWluZUZpcnN0VHVybigpO1xuXG4gIGlmKGZpcnN0VHVybiA9PT0gMCkge1xuICAgIGxlZnRQbGF5ZXJUdXJuID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBsZWZ0UGxheWVyVHVybiA9IGZhbHNlO1xuICB9XG5cbiAgaWYobGVmdFBsYXllclR1cm4pIHtcbiAgICBkaXNwbGF5UGxheWVyVHVybihsZWZ0UGxheWVyKTtcbiAgICBhY3RpdmF0ZUJ1dHRvbnMocmlnaHRQbGF5ZXIpO1xuICB9IGVsc2Uge1xuICAgIGRpc3BsYXlQbGF5ZXJUdXJuKHJpZ2h0UGxheWVyKTtcbiAgICBkZWFjdGl2YXRlQnV0dG9ucyhyaWdodFBsYXllcik7XG4gICAgdHJpZ2dlckNvbXBUdXJuKCk7XG4gIH1cbn1cblxuICBcblxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG5cbmZ1bmN0aW9uIHNodWZmbGVBcnJheShhcnJheSkgeyBcbiAgZm9yIChsZXQgaSA9IGFycmF5Lmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHsgXG4gICAgY29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpOyBcbiAgICBbYXJyYXlbaV0sIGFycmF5W2pdXSA9IFthcnJheVtqXSwgYXJyYXlbaV1dOyBcbiAgfSBcbiAgcmV0dXJuIGFycmF5OyBcbn0gXG5cbmZ1bmN0aW9uIHN1cnJvdW5kZWRCeUVtcHR5U3F1YXJlcyh4LCB5LCBib2FyZCkge1xuICBjb25zdCBzdXJyb3VuZHMgPSBbXTtcbiAgc3Vycm91bmRzLnB1c2goW3gsIHkgKyAxXSk7IC8vIG5cbiAgc3Vycm91bmRzLnB1c2goW3ggKyAxLCB5ICsgMV0pOyAvLyBuZVxuICBzdXJyb3VuZHMucHVzaChbeCArIDEsIHldKTsgLy8gZVxuICBzdXJyb3VuZHMucHVzaChbeCArIDEsIHkgLSAxXSk7IC8vIHNlXG4gIHN1cnJvdW5kcy5wdXNoKFt4LCB5IC0gMV0pOyAvLyBzXG4gIHN1cnJvdW5kcy5wdXNoKFt4IC0gMSwgeSAtIDFdKTsgLy8gc3dcbiAgc3Vycm91bmRzLnB1c2goW3ggLSAxLCB5XSk7IC8vIHdcbiAgc3Vycm91bmRzLnB1c2goW3ggLSAxLCB5ICsgMV0pIC8vIG53XG4gIFxuICBmb3IobGV0IGk9MDsgaTxzdXJyb3VuZHMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBpZiBzcXVhcmUgb24gYm9hcmQsIGNoZWNrIGlmIGhhcyBzaGlwXG4gICAgaWYoc3Vycm91bmRzW2ldWzBdID49IDAgJiYgc3Vycm91bmRzW2ldWzBdIDw9IDkgJiYgc3Vycm91bmRzW2ldWzFdID49IDAgJiYgc3Vycm91bmRzW2ldWzFdIDw9IDkgJiYgYm9hcmRbc3Vycm91bmRzW2ldWzBdXVtzdXJyb3VuZHNbaV1bMV1dID49IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlSGVhZENvb3JkKGJvYXJkKSB7XG4gIGxldCB2YWxpZEhlYWQgPSBmYWxzZTtcbiAgbGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMClcbiAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gIFxuICAvLyBtYWtlIHN1cmUgdGhlIGhlYWQgY29vcmQgaXMgZnJlZVxuICB3aGlsZSghdmFsaWRIZWFkKSB7XG4gICAgaWYoYm9hcmRbeF1beV0gPT09IC0xICYmIHN1cnJvdW5kZWRCeUVtcHR5U3F1YXJlcyh4LCB5LCBib2FyZCkpIHtcbiAgICAgIHZhbGlkSGVhZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIH1cbiAgfVxuICAvLyBjb25zb2xlLmxvZyhgJHt4fSwke3l9YCk7XG4gIHJldHVybiBbeCwgeV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdlbmVyYXRlQ29vcmRzKHNoaXBMZW5ndGgsIGJvYXJkKSB7XG4gIGxldCB2YWxpZFBhdGhGb3VuZCA9IGZhbHNlO1xuICB3aGlsZSghdmFsaWRQYXRoRm91bmQpIHtcbiAgICBjb25zdCBoZWFkID0gZ2VuZXJhdGVIZWFkQ29vcmQoYm9hcmQpO1xuICAgIGxldCB4ID0gaGVhZFswXTtcbiAgICBsZXQgeSA9IGhlYWRbMV07XG5cbiAgICBpZihzaGlwTGVuZ3RoID09PSAxKSB7XG4gICAgICB2YWxpZFBhdGhGb3VuZCA9IHRydWU7XG4gICAgICByZXR1cm4gW1t4LCB5XV07XG4gICAgfVxuXG4gICAgLy8gZmluZCB0aGUgY29vcmRzIGZvciBhbGwgNCBzaWRlc1xuICAgIGNvbnN0IHBhdGhzID0gW107XG5cbiAgICAvLyBlYXN0IHBhdGhcbiAgICBsZXQgY3VycmVudFBhdGggPSBbW3gsIHldXTtcbiAgICBmb3IobGV0IGk9MDsgaTxzaGlwTGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICBjdXJyZW50UGF0aC5wdXNoKFt4ICs9IDEsIHldKTtcbiAgICB9XG4gICAgcGF0aHMucHVzaChjdXJyZW50UGF0aCk7XG5cbiAgICAvLyBzb3V0aCBwYXRoXG4gICAgY3VycmVudFBhdGggPSBbW3gsIHldXTtcbiAgICBmb3IobGV0IGk9MDsgaTxzaGlwTGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICBjdXJyZW50UGF0aC5wdXNoKFt4LCB5IC09IDFdKTtcbiAgICB9XG4gICAgcGF0aHMucHVzaChjdXJyZW50UGF0aCk7XG5cbiAgICAvLyB3ZXN0IHBhdGhcbiAgICBjdXJyZW50UGF0aCA9IFtbeCwgeV1dO1xuICAgIGZvcihsZXQgaT0wOyBpPHNoaXBMZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIGN1cnJlbnRQYXRoLnB1c2goW3ggLT0gMSwgeV0pO1xuICAgIH1cbiAgICBwYXRocy5wdXNoKGN1cnJlbnRQYXRoKTtcblxuICAgIC8vIG5vcnRoIHBhdGhcbiAgICBjdXJyZW50UGF0aCA9IFtbeCwgeV1dO1xuICAgIGZvcihsZXQgaT0wOyBpPHNoaXBMZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIGN1cnJlbnRQYXRoLnB1c2goW3gsIHkgKz0gMV0pO1xuICAgIH1cbiAgICBwYXRocy5wdXNoKGN1cnJlbnRQYXRoKTtcblxuICAgIC8vIHNodWZmbGUgcGF0aHMgYXJyYXlcbiAgICBjb25zdCBzaHVmZmxlZFBhdGhzID0gc2h1ZmZsZUFycmF5KHBhdGhzKTtcblxuICAgIC8vIGZpbmQgYSB2YWxpZCBwYXRoXG4gICAgbGV0IHZhbGlkQ29vcmRzID0gW107XG4gICAgZm9yKGxldCBpPTA7IGk8c2h1ZmZsZWRQYXRocy5sZW5ndGg7IGkrKykge1xuICAgICAgY3VycmVudFBhdGggPSBzaHVmZmxlZFBhdGhzW2ldO1xuXG4gICAgICAvLyBjaGVjayBlYWNoIGNvb3JkIGZvciB2YWxpZGl0eVxuICAgICAgZm9yKGxldCBqPTA7IGo8Y3VycmVudFBhdGgubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYoY3VycmVudFBhdGhbal1bMF0gPD0gOSAmJiBjdXJyZW50UGF0aFtqXVswXSA+PSAwICYmIGN1cnJlbnRQYXRoW2pdWzFdIDw9IDkgJiYgY3VycmVudFBhdGhbal1bMV0gPj0gMCAmJiBib2FyZFtjdXJyZW50UGF0aFtqXVswXV1bY3VycmVudFBhdGhbal1bMV1dID09PSAtMSAmJiBzdXJyb3VuZGVkQnlFbXB0eVNxdWFyZXMoY3VycmVudFBhdGhbal1bMF0sIGN1cnJlbnRQYXRoW2pdWzFdLCBib2FyZCkpIHtcbiAgICAgICAgICB2YWxpZENvb3Jkcy5wdXNoKDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbGlkQ29vcmRzLnB1c2goMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxldCBzdW0gPSAwO1xuICAgICAgZm9yKGxldCBrPTA7IGs8dmFsaWRDb29yZHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgc3VtICs9IHZhbGlkQ29vcmRzW2tdO1xuICAgICAgfVxuXG4gICAgICBpZihzdW0gPT09IHZhbGlkQ29vcmRzLmxlbmd0aCkge1xuICAgICAgICB2YWxpZFBhdGhGb3VuZCA9IHRydWU7XG4gICAgICAgIHJldHVybiBjdXJyZW50UGF0aDtcbiAgICAgIH1cbiAgICAgIHZhbGlkQ29vcmRzID0gW107XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufSIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLWN5Y2xlXG5pbXBvcnQgeyB0cmlnZ2VyQ29tcFR1cm4gfSBmcm9tIFwiLi9hcHBcIjtcblxuY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRhaW5lcicpO1xuY29uc3QgaW5zdHJ1Y3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2luc3RydWN0aW9ucycpO1xuY29uc3QgbGVmdFBsYXllckJ1dHRvbnMgPSBbXTtcbmNvbnN0IHJpZ2h0UGxheWVyQnV0dG9ucyA9IFtdO1xubGV0IGdhbWVFbmRlZCA9IGZhbHNlO1xuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheVBsYXllclR1cm4oY3VycmVudFBsYXllcikge1xuICBpZihjdXJyZW50UGxheWVyLmdldElkKCkgPT09IDApIHtcbiAgICBpbnN0cnVjdGlvbnMudGV4dENvbnRlbnQgPSBcIlBsYXllciBPbmUncyBUdXJuXCI7XG4gIH0gZWxzZSB7XG4gICAgaW5zdHJ1Y3Rpb25zLnRleHRDb250ZW50ID0gXCJQbGF5ZXIgVHdvJ3MgVHVyblwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlSZXN1bHRzVGV4dChwbGF5ZXIpIHtcbiAgaWYocGxheWVyLmdldElkKCkgPT09IDApIHtcbiAgICBpbnN0cnVjdGlvbnMudGV4dENvbnRlbnQgPSAnUGxheWVyIFR3byBXaW5zISc7XG4gIH0gZWxzZSB7XG4gICAgaW5zdHJ1Y3Rpb25zLnRleHRDb250ZW50ID0gJ1BsYXllciBPbmUgV2lucyEnXG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlQWN0aXZlQnV0dG9uKHBsYXllciwgYnV0dG9uKSB7XG4gIGlmKHBsYXllci5nZXRJZCgpID09PSAwKSB7XG4gICAgbGV0IGluZGV4O1xuICAgIGZvcihsZXQgaT0wOyBpPGxlZnRQbGF5ZXJCdXR0b25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZihidXR0b24gPT09IGxlZnRQbGF5ZXJCdXR0b25zW2ldKSB7XG4gICAgICAgIGluZGV4ID0gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGVmdFBsYXllckJ1dHRvbnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfSBlbHNlIHtcbiAgICBsZXQgaW5kZXg7XG4gICAgZm9yKGxldCBpPTA7IGk8cmlnaHRQbGF5ZXJCdXR0b25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZihidXR0b24gPT09IHJpZ2h0UGxheWVyQnV0dG9uc1tpXSkge1xuICAgICAgICBpbmRleCA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIHJpZ2h0UGxheWVyQnV0dG9ucy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNoZWNrQWxsU2hpcHNTdW5rKHBsYXllcikge1xuICBpZihwbGF5ZXIuZ2V0R2FtZWJvYXJkKCkuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICBnYW1lRW5kZWQgPSB0cnVlO1xuICAgIGRpc3BsYXlSZXN1bHRzVGV4dChwbGF5ZXIpO1xuICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSAndW5jbGlja2FibGUnO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzQ2xpY2soc3F1YXJlSWQsIHBsYXllciwgeCwgeSkge1xuICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzcXVhcmVJZCk7XG4gIHBsYXllci5nZXRHYW1lYm9hcmQoKS5yZWNlaXZlQXR0YWNrKFt4LCB5XSk7XG5cbiAgLy8gY2hlY2sgaWYgY2xpY2sgaGl0cyBhbnl0aGluZ1xuICBpZihwbGF5ZXIuZ2V0R2FtZWJvYXJkKCkuZ2V0Qm9hcmQoKVt4XVt5XSA+PSAwKSB7XG4gICAgc3F1YXJlLmNsYXNzTmFtZSA9ICdzaGlwRGVhZCc7XG4gIH0gZWxzZSB7XG4gICAgc3F1YXJlLmNsYXNzTmFtZSA9ICdtaXNzZWRTaG90JztcbiAgfVxuXG4gIHNxdWFyZS5kaXNhYmxlZCA9IHRydWU7XG4gIHNxdWFyZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gIHJlbW92ZUFjdGl2ZUJ1dHRvbihwbGF5ZXIsIHNxdWFyZSk7XG4gIGNoZWNrQWxsU2hpcHNTdW5rKHBsYXllcik7XG5cbiAgaWYocGxheWVyLmdldElkKCkgPT09IDEgJiYgIWdhbWVFbmRlZCkge1xuICAgIHRyaWdnZXJDb21wVHVybigpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlckJvYXJkKHBsYXllcikge1xuICBjb25zdCBib2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBib2FyZENvbnRhaW5lci5jbGFzc05hbWUgPSAnYm9hcmRDb250YWluZXInO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmRDb250YWluZXIpO1xuXG4gIGZvcihsZXQgaj05OyBqPj0wOyBqLS0pIHtcbiAgICBmb3IobGV0IGk9MDsgaTwxMDsgaSsrKSB7XG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgIHNxdWFyZS5pZCA9IGAke3BsYXllci5nZXRJZCgpfSR7aX0ke2p9YDtcbiAgICAgIGNvbnN0IGNvb3Jkc1R4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIGNvb3Jkc1R4dC5jbGFzc05hbWUgPSAnY29vcmRzVGV4dCc7XG5cbiAgICAgIGlmKHBsYXllci5nZXRJZCgpID09PSAwKSB7XG4gICAgICAgIGxlZnRQbGF5ZXJCdXR0b25zLnB1c2goc3F1YXJlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJpZ2h0UGxheWVyQnV0dG9ucy5wdXNoKHNxdWFyZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIGlmIHNxdWFyZSBpcyBvY2Vhbiwgc2hpcCBvciBkZWFkIHNoaXBcbiAgICAgIGlmKHBsYXllci5nZXRHYW1lYm9hcmQoKS5nZXRCb2FyZCgpW2ldW2pdID09PSAtMSkge1xuICAgICAgICBzcXVhcmUuY2xhc3NOYW1lID0gJ29jZWFuJztcbiAgICAgIH0gZWxzZSBpZihwbGF5ZXIuZ2V0R2FtZWJvYXJkKCkuZ2V0Qm9hcmQoKVtpXVtqXSA+PSAwKSB7XG4gICAgICAgICAgc3F1YXJlLmNsYXNzTmFtZSA9ICdzaGlwJztcbiAgICAgICAgfVxuICAgICAgY29vcmRzVHh0LnRleHRDb250ZW50ID0gYCgke2l9LCR7an0pYDtcbiAgICAgIC8vIHNxdWFyZS5hcHBlbmRDaGlsZChjb29yZHNUeHQpO1xuXG4gICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHByb2Nlc3NDbGljayhzcXVhcmUuaWQsIHBsYXllciwgaSwgaik7XG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFjdGl2YXRlQnV0dG9ucyhwbGF5ZXIpIHtcbiAgaWYocGxheWVyLmdldElkKCkgPT09IDApIHtcbiAgICBmb3IobGV0IGk9MDsgaTxsZWZ0UGxheWVyQnV0dG9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgbGVmdFBsYXllckJ1dHRvbnNbaV0uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9yKGxldCBpPTA7IGk8cmlnaHRQbGF5ZXJCdXR0b25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICByaWdodFBsYXllckJ1dHRvbnNbaV0uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlYWN0aXZhdGVCdXR0b25zKHBsYXllcikge1xuICBpZihwbGF5ZXIuZ2V0SWQoKSA9PT0gMCkge1xuICAgIGZvcihsZXQgaT0wOyBpPGxlZnRQbGF5ZXJCdXR0b25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZWZ0UGxheWVyQnV0dG9uc1tpXS5kaXNhYmxlZCA9IHRydWU7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvcihsZXQgaT0wOyBpPHJpZ2h0UGxheWVyQnV0dG9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgcmlnaHRQbGF5ZXJCdXR0b25zW2ldLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVCb2FyZChwbGF5ZXIpIHtcbiAgaWYocGxheWVyLmdldElkKCkgPT09IDApIHtcbiAgICBmb3IobGV0IGk9MDsgaTxsZWZ0UGxheWVyQnV0dG9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgbGVmdFBsYXllckJ1dHRvbnNbaV0uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmb3IobGV0IGk9MDsgaTxyaWdodFBsYXllckJ1dHRvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJpZ2h0UGxheWVyQnV0dG9uc1tpXS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93Qm9hcmQocGxheWVyKSB7XG4gIGlmKHBsYXllci5nZXRJZCgpID09PSAwKSB7XG4gICAgZm9yKGxldCBpPTA7IGk8bGVmdFBsYXllckJ1dHRvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxlZnRQbGF5ZXJCdXR0b25zW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9yKGxldCBpPTA7IGk8cmlnaHRQbGF5ZXJCdXR0b25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICByaWdodFBsYXllckJ1dHRvbnNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheUJvYXJkKHBsYXllcikge1xuICByZW5kZXJCb2FyZChwbGF5ZXIpO1xuICBkZWFjdGl2YXRlQnV0dG9ucyhwbGF5ZXIpO1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgY2xhc3MtbWV0aG9kcy11c2UtdGhpcyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLWxvbmVseS1pZiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1zeW50YXggKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5pbXBvcnQgZ2VuZXJhdGVDb29yZHMgZnJvbSBcIi4vY29vcmRHZW5cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ib2FyZCA9IG5ldyBBcnJheSgxMCk7XG4gICAgdGhpcy5taXNzZWRTaG90cyA9IFtdO1xuICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgICB0aGlzLnN1Y2Nlc3NmdWxIaXRzID0gW107XG5cbiAgICBmb3IobGV0IGk9MDsgaTx0aGlzLmJvYXJkLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmJvYXJkW2ldID0gbmV3IEFycmF5KDEwKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlc2V0Qm9hcmQoKTtcbiAgICB0aGlzLmNyZWF0ZVNoaXBzKCk7XG4gICAgdGhpcy5wbGFjZVNoaXBzKCk7XG4gIH1cblxuICByZXNldEJvYXJkKCkge1xuICAgIGZvcihsZXQgaT0wOyBpPDEwOyBpKyspIHtcbiAgICAgIGZvcihsZXQgaj0wOyBqPDEwOyBqKyspIHtcbiAgICAgICAgdGhpcy5ib2FyZFtpXVtqXSA9IC0xO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZVNoaXBzKCkge1xuICAgIC8vIHNoaXBzIG5lZWRlZCAtIDR4MSwgM3gyLCAyeDMsIDF4NFxuICAgIGxldCBuZXdTaGlwID0gbmV3IFNoaXAoNCk7XG4gICAgdGhpcy5zaGlwcy5wdXNoKG5ld1NoaXApO1xuXG4gICAgZm9yKGxldCBpPTA7IGk8MjsgaSsrKSB7XG4gICAgICBuZXdTaGlwID0gbmV3IFNoaXAoMyk7XG4gICAgICB0aGlzLnNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgfVxuXG4gICAgZm9yKGxldCBpPTA7IGk8MzsgaSsrKSB7XG4gICAgICBuZXdTaGlwID0gbmV3IFNoaXAoMik7XG4gICAgICB0aGlzLnNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgfVxuXG4gICAgZm9yKGxldCBpPTA7IGk8NDsgaSsrKSB7XG4gICAgICBuZXdTaGlwID0gbmV3IFNoaXAoMSk7XG4gICAgICB0aGlzLnNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0U2hpcHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2hpcHM7XG4gIH1cblxuICBwbGFjZVNoaXBzKCkge1xuICAgIGZvcihsZXQgaT0wOyBpPHRoaXMuc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNvb3JkcyA9IGdlbmVyYXRlQ29vcmRzKHRoaXMuc2hpcHNbaV0uZ2V0TGVuZ3RoKCksIHRoaXMuYm9hcmQpO1xuICAgICAgdGhpcy5zaGlwc1tpXS5zZXRDb29yZHMoY29vcmRzKTtcbiAgICAgIGZvcihsZXQgaj0wOyBqPGNvb3Jkcy5sZW5ndGg7IGorKykge1xuICAgICAgICB0aGlzLmJvYXJkW2Nvb3Jkc1tqXVswXV1bY29vcmRzW2pdWzFdXSA9IGk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhjb29yZHMpIHtcbiAgICBpZih0aGlzLmJvYXJkW2Nvb3Jkc1swXV1bY29vcmRzWzFdXSA9PT0gLTEpIHtcbiAgICAgIC8vIHJlY29yZCBtaXNzZWQgc2hvdFxuICAgICAgdGhpcy5taXNzZWRTaG90cy5wdXNoKGNvb3Jkcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHNlbmQgaGl0IHRvIHNoaXBcbiAgICAgIHRoaXMuc2hpcHNbdGhpcy5ib2FyZFtjb29yZHNbMF1dW2Nvb3Jkc1sxXV1dLmhpdCgpO1xuICAgICAgdGhpcy5zdWNjZXNzZnVsSGl0cy5wdXNoKGNvb3Jkcyk7XG4gICAgfVxuICB9XG5cbiAgYWxsU2hpcHNTdW5rKCkge1xuICAgIGxldCBzdW0gPSAwO1xuICAgIGZvcihsZXQgaT0wOyBpPHRoaXMuc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKHRoaXMuc2hpcHNbaV0uaXNTdW5rKCkpIHtcbiAgICAgICAgc3VtICs9IDE7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKHN1bSA9PT0gMTApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRCb2FyZCgpIHtcbiAgICByZXR1cm4gdGhpcy5ib2FyZDtcbiAgfVxuXG4gIGdldE1pc3NlZFNob3RzKCkge1xuICAgIHJldHVybiB0aGlzLm1pc3NlZFNob3RzO1xuICB9XG5cbiAgZ2V0U3VjY2Vzc2Z1bEhpdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3VjY2Vzc2Z1bEhpdHM7XG4gIH1cbn0iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihpZCwgdHlwZSkge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMuZ2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuICB9XG5cbiAgZ2V0R2FtZWJvYXJkKCkge1xuICAgIHJldHVybiB0aGlzLmdhbWVib2FyZDtcbiAgfVxuXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgfVxuXG4gIGdldElkKCkge1xuICAgIHJldHVybiB0aGlzLmlkO1xuICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCkge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMuaGl0cyA9IDA7XG4gICAgdGhpcy5jb29yZHMgPSBbXTtcbiAgfVxuXG4gIGhpdCgpIHtcbiAgICB0aGlzLmhpdHMgKz0gMTtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICBpZih0aGlzLmhpdHMgPj0gdGhpcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzZXRDb29yZHMoY29vcmRzKSB7XG4gICAgdGhpcy5jb29yZHMgPSBjb29yZHM7XG4gIH1cblxuICBnZXRDb29yZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29vcmRzO1xuICB9XG5cbiAgZ2V0TGVuZ3RoKCkge1xuICAgIHJldHVybiB0aGlzLmxlbmd0aDtcbiAgfVxuXG4gIGdldEhpdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGl0cztcbiAgfVxufSIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuaW1wb3J0IGdlbmVyYXRlQ29vcmRzIGZyb20gXCIuL2Nvb3JkR2VuXCI7XG5cbmNvbnN0IHF1ZXN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3F1ZXN0aW9uJyk7XG5jb25zdCBjaG9pY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hvaWNlJyk7XG5cbmxldCBjb3VudGVyID0gMDtcblxuZXhwb3J0IGZ1bmN0aW9uIGFjY2VwdENvb3JkKGdhbWVib2FyZCwgY29vcmRzKSB7XG4gIGlmKGNvdW50ZXIgPCAxMCkge1xuICAgIGdhbWVib2FyZC5nZXRTaGlwcygpW2NvdW50ZXJdLnNldENvb3Jkcyhjb29yZHMpO1xuICAgIGZvcihsZXQgaT0wOyBpPGNvb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgIGdhbWVib2FyZC5nZXRCb2FyZCgpW2Nvb3Jkc1tpXVswXV1bY29vcmRzW2ldWzFdXSA9IGNvdW50ZXI7XG4gIH1cbiAgICBjb3VudGVyICs9IDE7XG4gIH0gXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByYW5kb21Db29yZChnYW1lYm9hcmQpIHtcbiAgbGV0IGNvb3JkcyA9IG51bGw7XG4gIGlmKGNvdW50ZXIgPT09IDApIHtcbiAgICBjb29yZHMgPSBnZW5lcmF0ZUNvb3Jkcyg0LCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKSk7XG4gIH0gZWxzZSBpZihjb3VudGVyID09PSAxIHx8IGNvdW50ZXIgPT09IDIpIHtcbiAgICBjb29yZHMgPSBnZW5lcmF0ZUNvb3JkcygzLCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKSk7XG4gIH0gZWxzZSBpZihjb3VudGVyID09PSAzIHx8IGNvdW50ZXIgPT09IDQgfHwgY291bnRlciA9PT0gNSkge1xuICAgIGNvb3JkcyA9IGdlbmVyYXRlQ29vcmRzKDIsIGdhbWVib2FyZC5nZXRCb2FyZCgpKTtcbiAgfSBlbHNlIHtcbiAgICBjb29yZHMgPSBnZW5lcmF0ZUNvb3JkcygxLCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKSk7XG4gIH1cblxuICB3aGlsZShjaG9pY2UuZmlyc3RDaGlsZCl7XG4gICAgY2hvaWNlLnJlbW92ZUNoaWxkKGNob2ljZS5maXJzdENoaWxkKTtcbiAgfVxuXG4gIHF1ZXN0aW9uLnRleHRDb250ZW50ID0gJ1BsYWNlIHNoaXAgYXQgY29vcmRpbmF0ZXM/JztcbiAgZm9yKGxldCBpPTA7IGk8Y29vcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICB0ZXh0LnRleHRDb250ZW50ID0gYCgke2Nvb3Jkc1tpXX0pYDtcbiAgICBjaG9pY2UuYXBwZW5kQ2hpbGQodGV4dCk7XG4gIH1cbiAgXG4gIHJldHVybiBjb29yZHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb3VudGVyKCkge1xuICByZXR1cm4gY291bnRlcjtcbn0iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgKiB7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LWZhbWlseTogVmVyZGFuYSwgVGFob21hLCBzYW5zLXNlcmlmO1xufVxuXG5ib2R5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogZGFya3NsYXRlYmx1ZTtcbn1cblxuI3BsYXlBcmVhIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuI2NvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogOTB2aDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJhY2tncm91bmQtY29sb3I6IGRhcmtzbGF0ZWJsdWU7XG59XG5cbiN3ZWxjb21lLFxuI3NoaXBQbGFjaW5nU2NyZWVuLFxuI3NoaXBTZWxlY3Rpb25TY3JlZW4ge1xuICBwYWRkaW5nOiAzMHB4IDUwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMzBweDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwdmg7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBkYXJrc2xhdGVibHVlO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4jd2VsY29tZUJ0bixcbiNzdGFydENob29zZSxcbiNzdGFydFJhbmRvbSxcbiN5ZXMsXG4jbm8sXG4jYmVnaW4ge1xuICBwYWRkaW5nOiAyMHB4IDMwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6IGRvZGdlcmJsdWU7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC1zaXplOiAxLjNyZW07XG59XG5cbiN5ZXM6ZGlzYWJsZWQsXG4jbm86ZGlzYWJsZWQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyYXk7XG59XG5cbnAge1xuICBsaW5lLWhlaWdodDogMjAwJTtcbn1cblxudWwge1xuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG4gIGxpbmUtaGVpZ2h0OiAyMDAlO1xufVxuXG4jaW5zdHJ1Y3Rpb25zIHtcbiAgZm9udC1zaXplOiAycmVtO1xuICBoZWlnaHQ6IDEwdmg7XG4gIGJhY2tncm91bmQtY29sb3I6IGRhcmtzbGF0ZWJsdWU7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuYnV0dG9uIHtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm9yZGVyOiBub25lO1xufVxuXG4udW5jbGlja2FibGUgeyBcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7IFxufSBcblxuLmJvYXJkQ29udGFpbmVyIHtcbiAgbWFyZ2luOiAyMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZXNtb2tlO1xuICBoZWlnaHQ6IDM1MHB4O1xuICB3aWR0aDogMzUwcHg7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMWZyKTtcbiAgZmxleC1zaHJpbms6IDA7XG59XG5cbi5vY2Vhbixcbi5zaGlwLFxuLnNoaXBEZWFkIHtcbiAgaGVpZ2h0OiA5NSU7XG4gIHdpZHRoOiA5NSU7XG59XG5cbi5vY2VhbiB7XG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0c2t5Ymx1ZTtcbn1cblxuLnNoaXAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBvcmFuZ2U7XG59XG5cbi5oaWRlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogZG9kZ2VyYmx1ZTtcbn1cblxuLnNoaXBEZWFkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xufVxuXG4ubWlzc2VkU2hvdCB7XG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XG59XG5cbi5jb29yZHNUZXh0IHtcbiAgZm9udC1zaXplOiAxcmVtO1xufVxuXG4ub2NlYW46aG92ZXIsXG4uc2hpcDpob3ZlciB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgYmFja2dyb3VuZC1jb2xvcjogYWxpY2VibHVlO1xufVxuXG4vKiBkaXYge1xuICBib3JkZXI6IDJweCBzb2xpZCBncmVlbjtcbn0gKi9cblxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3MDBweCkge1xuICAjcGxheUFyZWEge1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHN0cmV0Y2g7XG4gIH1cbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxTQUFTO0VBQ1QsVUFBVTtFQUNWLHNCQUFzQjtFQUN0QixrQkFBa0I7RUFDbEIsd0NBQXdDO0FBQzFDOztBQUVBO0VBQ0UsK0JBQStCO0FBQ2pDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsZUFBZTtFQUNmLFdBQVc7RUFDWCxZQUFZO0VBQ1osdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQiwrQkFBK0I7QUFDakM7O0FBRUE7OztFQUdFLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLFNBQVM7RUFDVCxXQUFXO0VBQ1gsYUFBYTtFQUNiLFlBQVk7RUFDWixlQUFlO0VBQ2YsK0JBQStCO0VBQy9CLG1CQUFtQjtBQUNyQjs7QUFFQTs7Ozs7O0VBTUUsa0JBQWtCO0VBQ2xCLDRCQUE0QjtFQUM1QixtQkFBbUI7RUFDbkIsWUFBWTtFQUNaLGlCQUFpQjtBQUNuQjs7QUFFQTs7RUFFRSwyQkFBMkI7QUFDN0I7O0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsZUFBZTtFQUNmLFlBQVk7RUFDWiwrQkFBK0I7RUFDL0IsWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFlBQVk7QUFDZDs7QUFFQTtFQUNFLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLFlBQVk7RUFDWiw0QkFBNEI7RUFDNUIsYUFBYTtFQUNiLFlBQVk7RUFDWixhQUFhO0VBQ2Isc0NBQXNDO0VBQ3RDLG1DQUFtQztFQUNuQyxjQUFjO0FBQ2hCOztBQUVBOzs7RUFHRSxXQUFXO0VBQ1gsVUFBVTtBQUNaOztBQUVBO0VBQ0UsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0Usd0JBQXdCO0FBQzFCOztBQUVBO0VBQ0UsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTs7RUFFRSxlQUFlO0VBQ2YsMkJBQTJCO0FBQzdCOztBQUVBOztHQUVHOztBQUVIO0VBQ0U7SUFDRSxtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLHdCQUF3QjtFQUMxQjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LWZhbWlseTogVmVyZGFuYSwgVGFob21hLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGRhcmtzbGF0ZWJsdWU7XFxufVxcblxcbiNwbGF5QXJlYSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuI2NvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiA5MHZoO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZGFya3NsYXRlYmx1ZTtcXG59XFxuXFxuI3dlbGNvbWUsXFxuI3NoaXBQbGFjaW5nU2NyZWVuLFxcbiNzaGlwU2VsZWN0aW9uU2NyZWVuIHtcXG4gIHBhZGRpbmc6IDMwcHggNTBweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ2FwOiAzMHB4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZGFya3NsYXRlYmx1ZTtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbiN3ZWxjb21lQnRuLFxcbiNzdGFydENob29zZSxcXG4jc3RhcnRSYW5kb20sXFxuI3llcyxcXG4jbm8sXFxuI2JlZ2luIHtcXG4gIHBhZGRpbmc6IDIwcHggMzBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IGRvZGdlcmJsdWU7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgZm9udC1zaXplOiAxLjNyZW07XFxufVxcblxcbiN5ZXM6ZGlzYWJsZWQsXFxuI25vOmRpc2FibGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JheTtcXG59XFxuXFxucCB7XFxuICBsaW5lLWhlaWdodDogMjAwJTtcXG59XFxuXFxudWwge1xcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xcbiAgbGluZS1oZWlnaHQ6IDIwMCU7XFxufVxcblxcbiNpbnN0cnVjdGlvbnMge1xcbiAgZm9udC1zaXplOiAycmVtO1xcbiAgaGVpZ2h0OiAxMHZoO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZGFya3NsYXRlYmx1ZTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuYnV0dG9uIHtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICBib3JkZXI6IG5vbmU7XFxufVxcblxcbi51bmNsaWNrYWJsZSB7IFxcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7IFxcbn0gXFxuXFxuLmJvYXJkQ29udGFpbmVyIHtcXG4gIG1hcmdpbjogMjBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlc21va2U7XFxuICBoZWlnaHQ6IDM1MHB4O1xcbiAgd2lkdGg6IDM1MHB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxuICBmbGV4LXNocmluazogMDtcXG59XFxuXFxuLm9jZWFuLFxcbi5zaGlwLFxcbi5zaGlwRGVhZCB7XFxuICBoZWlnaHQ6IDk1JTtcXG4gIHdpZHRoOiA5NSU7XFxufVxcblxcbi5vY2VhbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodHNreWJsdWU7XFxufVxcblxcbi5zaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IG9yYW5nZTtcXG59XFxuXFxuLmhpZGUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZG9kZ2VyYmx1ZTtcXG59XFxuXFxuLnNoaXBEZWFkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG59XFxuXFxuLm1pc3NlZFNob3Qge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXG59XFxuXFxuLmNvb3Jkc1RleHQge1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbn1cXG5cXG4ub2NlYW46aG92ZXIsXFxuLnNoaXA6aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYWxpY2VibHVlO1xcbn1cXG5cXG4vKiBkaXYge1xcbiAgYm9yZGVyOiAycHggc29saWQgZ3JlZW47XFxufSAqL1xcblxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzAwcHgpIHtcXG4gICNwbGF5QXJlYSB7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogc3RyZXRjaDtcXG4gIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IHJ1bkdhbWUgZnJvbSBcIi4vYXBwXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgYWNjZXB0Q29vcmQsIHJhbmRvbUNvb3JkLCBnZXRDb3VudGVyIH0gZnJvbSBcIi4vc2hpcFBsYWNlclwiO1xuXG5jb25zdCB3ZWxjb21lQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dlbGNvbWUnKTtcbmNvbnN0IHdlbGNvbWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd2VsY29tZUJ0bicpO1xuY29uc3Qgc2hpcFBsYWNpbmdTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2hpcFBsYWNpbmdTY3JlZW4nKTtcbmNvbnN0IHN0YXJ0Q2hvb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N0YXJ0Q2hvb3NlJyk7XG5jb25zdCBzdGFydFJhbmRvbUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdGFydFJhbmRvbScpO1xuY29uc3Qgc2hpcFNlbGVjdGlvblNjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaGlwU2VsZWN0aW9uU2NyZWVuJyk7XG5jb25zdCBjaG9pY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2hvaWNlJyk7XG5jb25zdCB5ZXNCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjeWVzJyk7XG5jb25zdCBub0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNubycpO1xuY29uc3QgYmVnaW5CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmVnaW4nKTtcbmNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250YWluZXInKTtcbmNvbnN0IGluc3RydWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnN0cnVjdGlvbnMnKTtcblxubGV0IHBsYXllciA9IG51bGw7XG5sZXQgY29vcmRzID0gbnVsbDtcblxuc2hpcFBsYWNpbmdTY3JlZW4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbnNoaXBTZWxlY3Rpb25TY3JlZW4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuaW5zdHJ1Y3Rpb25zLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbmZ1bmN0aW9uIHNldHVwU2NyZWVuKCkge1xuICB3ZWxjb21lQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHNoaXBQbGFjaW5nU2NyZWVuLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0R2FtZUNob29zZSgpIHtcbiAgc2hpcFBsYWNpbmdTY3JlZW4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgc2hpcFNlbGVjdGlvblNjcmVlbi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICBwbGF5ZXIgPSBuZXcgUGxheWVyKDAsICdodW1hbicpO1xuICBwbGF5ZXIuZ2V0R2FtZWJvYXJkKCkucmVzZXRCb2FyZCgpO1xuICBjb29yZHMgPSByYW5kb21Db29yZChwbGF5ZXIuZ2V0R2FtZWJvYXJkKCkpO1xufVxuXG5mdW5jdGlvbiBzdGFydEdhbWVXaXRoQm9hcmQoKSB7XG4gIHNoaXBTZWxlY3Rpb25TY3JlZW4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gIGluc3RydWN0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgaWYoZ2V0Q291bnRlcigpIDwgMTApIHtcbiAgICBwbGF5ZXIgPSBudWxsO1xuICB9XG4gIHJ1bkdhbWUocGxheWVyKTtcbn1cblxuZnVuY3Rpb24gc3RhcnRHYW1lUmFuZG9tKCkge1xuICBzaGlwUGxhY2luZ1NjcmVlbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBjb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgaW5zdHJ1Y3Rpb25zLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICBydW5HYW1lKHBsYXllcik7XG59XG5cbmZ1bmN0aW9uIGNoZWNrQnV0dG9ucygpIHtcbiAgY29uc3QgY291bnRlciA9IGdldENvdW50ZXIoKTtcbiAgaWYoY291bnRlciA+PSAxMCkge1xuICAgIHdoaWxlKGNob2ljZS5maXJzdENoaWxkKXtcbiAgICAgIGNob2ljZS5yZW1vdmVDaGlsZChjaG9pY2UuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIGNob2ljZS50ZXh0Q29udGVudCA9IFwiRmluaXNoZWQgcGxhY2luZyBzaGlwcy4gTGV0J3MgYmVnaW4hXCI7XG4gICAgeWVzQnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICBub0J0bi5kaXNhYmxlZCA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgY29vcmRzID0gcmFuZG9tQ29vcmQocGxheWVyLmdldEdhbWVib2FyZCgpKTtcbiAgfVxufVxuXG53ZWxjb21lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2V0dXBTY3JlZW4pO1xuc3RhcnRDaG9vc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydEdhbWVDaG9vc2UpXG5zdGFydFJhbmRvbUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJ0R2FtZVJhbmRvbSk7XG5iZWdpbkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJ0R2FtZVdpdGhCb2FyZCk7XG55ZXNCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGFjY2VwdENvb3JkKHBsYXllci5nZXRHYW1lYm9hcmQoKSwgY29vcmRzKTtcbiAgY2hlY2tCdXR0b25zKCk7XG59KTtcbm5vQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBjb29yZHMgPSByYW5kb21Db29yZChwbGF5ZXIuZ2V0R2FtZWJvYXJkKCkpO1xufSk7XG5cblxuXG5cblxuXG5cbiJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiY3NzV2l0aE1hcHBpbmdUb1N0cmluZyIsImxpc3QiLCJ0b1N0cmluZyIsIm1hcCIsIml0ZW0iLCJjb250ZW50IiwibmVlZExheWVyIiwiY29uY2F0IiwibGVuZ3RoIiwiam9pbiIsImkiLCJtb2R1bGVzIiwibWVkaWEiLCJkZWR1cGUiLCJzdXBwb3J0cyIsImxheWVyIiwidW5kZWZpbmVkIiwiYWxyZWFkeUltcG9ydGVkTW9kdWxlcyIsImsiLCJpZCIsIl9rIiwicHVzaCIsImNzc01hcHBpbmciLCJidG9hIiwiYmFzZTY0IiwidW5lc2NhcGUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJKU09OIiwic3RyaW5naWZ5IiwiZGF0YSIsInNvdXJjZU1hcHBpbmciLCJQbGF5ZXIiLCJkaXNwbGF5Qm9hcmQiLCJkaXNwbGF5UGxheWVyVHVybiIsInByb2Nlc3NDbGljayIsImFjdGl2YXRlQnV0dG9ucyIsImRlYWN0aXZhdGVCdXR0b25zIiwiaGlkZUJvYXJkIiwibGVmdFBsYXllciIsInJpZ2h0UGxheWVyIiwibGVmdFBsYXllclR1cm4iLCJkZXRlcm1pbmVGaXJzdFR1cm4iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJnZW5lcmF0ZVZhbGlkQ29vcmRzIiwidmFsaWQiLCJhTWlzc2VkU2hvdCIsImFTdWNjZXNzZnVsSGl0IiwieCIsInkiLCJjb29yZHMiLCJnZXRHYW1lYm9hcmQiLCJnZXRNaXNzZWRTaG90cyIsImdldFN1Y2Nlc3NmdWxIaXRzIiwiY29tcHV0ZXJUaGlua3MiLCJzcXVhcmVJZCIsInRyaWdnZXJDb21wVHVybiIsInNldFRpbWVvdXQiLCJydW5HYW1lIiwicGxheWVyIiwiZmlyc3RUdXJuIiwic2h1ZmZsZUFycmF5IiwiYXJyYXkiLCJqIiwic3Vycm91bmRlZEJ5RW1wdHlTcXVhcmVzIiwiYm9hcmQiLCJzdXJyb3VuZHMiLCJnZW5lcmF0ZUhlYWRDb29yZCIsInZhbGlkSGVhZCIsImdlbmVyYXRlQ29vcmRzIiwic2hpcExlbmd0aCIsInZhbGlkUGF0aEZvdW5kIiwiaGVhZCIsInBhdGhzIiwiY3VycmVudFBhdGgiLCJzaHVmZmxlZFBhdGhzIiwidmFsaWRDb29yZHMiLCJzdW0iLCJjb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJpbnN0cnVjdGlvbnMiLCJsZWZ0UGxheWVyQnV0dG9ucyIsInJpZ2h0UGxheWVyQnV0dG9ucyIsImdhbWVFbmRlZCIsImN1cnJlbnRQbGF5ZXIiLCJnZXRJZCIsInRleHRDb250ZW50IiwiZGlzcGxheVJlc3VsdHNUZXh0IiwicmVtb3ZlQWN0aXZlQnV0dG9uIiwiYnV0dG9uIiwiaW5kZXgiLCJzcGxpY2UiLCJjaGVja0FsbFNoaXBzU3VuayIsImFsbFNoaXBzU3VuayIsImNsYXNzTmFtZSIsInNxdWFyZSIsImdldEVsZW1lbnRCeUlkIiwicmVjZWl2ZUF0dGFjayIsImdldEJvYXJkIiwiZGlzYWJsZWQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJyZW5kZXJCb2FyZCIsImJvYXJkQ29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiY29vcmRzVHh0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImFkZCIsInNob3dCb2FyZCIsIlNoaXAiLCJHYW1lYm9hcmQiLCJjb25zdHJ1Y3RvciIsIkFycmF5IiwibWlzc2VkU2hvdHMiLCJzaGlwcyIsInN1Y2Nlc3NmdWxIaXRzIiwicmVzZXRCb2FyZCIsImNyZWF0ZVNoaXBzIiwicGxhY2VTaGlwcyIsIm5ld1NoaXAiLCJnZXRTaGlwcyIsImdldExlbmd0aCIsInNldENvb3JkcyIsImhpdCIsImlzU3VuayIsInR5cGUiLCJnYW1lYm9hcmQiLCJnZXRUeXBlIiwiaGl0cyIsImdldENvb3JkcyIsImdldEhpdHMiLCJxdWVzdGlvbiIsImNob2ljZSIsImNvdW50ZXIiLCJhY2NlcHRDb29yZCIsInJhbmRvbUNvb3JkIiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwidGV4dCIsImdldENvdW50ZXIiLCJ3ZWxjb21lQ29udGFpbmVyIiwid2VsY29tZUJ0biIsInNoaXBQbGFjaW5nU2NyZWVuIiwic3RhcnRDaG9vc2VCdG4iLCJzdGFydFJhbmRvbUJ0biIsInNoaXBTZWxlY3Rpb25TY3JlZW4iLCJ5ZXNCdG4iLCJub0J0biIsImJlZ2luQnRuIiwic3R5bGUiLCJkaXNwbGF5Iiwic2V0dXBTY3JlZW4iLCJzdGFydEdhbWVDaG9vc2UiLCJzdGFydEdhbWVXaXRoQm9hcmQiLCJzdGFydEdhbWVSYW5kb20iLCJjaGVja0J1dHRvbnMiXSwic291cmNlUm9vdCI6IiJ9