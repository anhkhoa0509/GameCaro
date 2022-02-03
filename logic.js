function getNumber(currentNumber) {
  localStorage.setItem("number", currentNumber);
  localStorage.setItem("play", "X");
  window.location.href = "play.html";
}
function addInterface() {
  let bodyRender = document.querySelector("#bodyRender");
  let number = localStorage.getItem("number");
  if (number == 3) {
    bodyRender.innerHTML += (`
    <div class = "bodyRender">
  <p class="nofi">Người chơi 1 di chuyển</p>
  <div class="board board-3" id="board">
      <div class="cell" data-cell></div>
      <div class="cell" data-cell></div>
      <div class="cell" data-cell></div>
      <div class="cell" data-cell></div>
      <div class="cell" data-cell></div>
      <div class="cell" data-cell></div>
      <div class="cell" data-cell></div>
      <div class="cell" data-cell></div>
      <div class="cell" data-cell></div>
  </div>
  <div class="star">
      <p>Place 3 In A Row</p>
  </div>
  </div>
  `);
  }
  if(number == 5){
      bodyRender.innerHTML += `
      <p class="nofi">Người chơi 1 di chuyển</p>
      <div class="board board-5" id="board">
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
          <div class="cell" data-cell></div>
      </div>
      <div class="star">
          <p>Place 4 In A Row</p>
      </div>
      `
  }
  if(number == 7){
    bodyRender.innerHTML += `
    <p class="nofi">Người chơi 1 di chuyển</p>
    <div class="board board-7" id="board">
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
        <div class="cell" data-cell></div>
    </div>
    <div class="star">
        <p>Place 4 In A Row</p>
    </div>
    `
  }
  startGame()
  var audio = new Audio('./Assets/Audio/autido.mp3');
  audio.play();
}

function getMove(e) {
  let play = localStorage.getItem("play");
  let currentClass = document.getElementById(`${e}`);
  console.log(currentClass);
  if (play == "X") {
    localStorage.setItem("play", "O");
    currentClass.innerHTML = `<i class="fas fa-times "></i>`;
  }
  if (play == "O") {
    localStorage.setItem("play", "X");
    currentClass.innerHTML = `<i class="far fa-circle "></i>`;
  }

  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

// Logic

const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let cellElements = document.querySelectorAll("[data-cell]");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
let circleTurn;



restartButton.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  cellElements = document.querySelectorAll("[data-cell]");
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  console.log('chay cai nay',board)
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
    console.log('co chay cai nayyy')
  console.log(e, e.target);
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
const board = document.getElementById("board");
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
