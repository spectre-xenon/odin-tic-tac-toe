(function game() {
  this.board = ["", "", "", "", "", "", "", "", ""];

  this.init = () => {
    bindEvents();
  };

  this.bindEvents = () => {
    const one = document
      .getElementById("one")
      .addEventListener("click", handleClick);
    const two = document
      .getElementById("two")
      .addEventListener("click", handleClick);
    const three = document
      .getElementById("three")
      .addEventListener("click", handleClick);
    const four = document
      .getElementById("four")
      .addEventListener("click", handleClick);
    const five = document
      .getElementById("five")
      .addEventListener("click", handleClick);
    const six = document
      .getElementById("six")
      .addEventListener("click", handleClick);
    const seven = document
      .getElementById("seven")
      .addEventListener("click", handleClick);
    const eight = document
      .getElementById("eight")
      .addEventListener("click", handleClick);
    const nine = document
      .getElementById("nine")
      .addEventListener("click", handleClick);
  };

  this.handleClick = (event) => {
    let element = event.target;
    let index = getIndex(element);

    if (element.innerText === "") {
      addToBoard("close", index);
      element.appendChild(createSign("close"));
    }

    checkBoard("close");
  };

  this.createSign = (sign) => {
    const span = document.createElement("span");
    span.classList.add("material-symbols-rounded");
    span.innerText = sign;
    return span;
  };

  this.addToBoard = (sign, index) => {
    if (sign === "close") board[index] = "x";
    if (sign === "circle") board[index] = "o";
  };

  this.getIndex = (element) => {
    let index = 0;
    if (element.id === "one") index = 0;
    if (element.id === "two") index = 1;
    if (element.id === "three") index = 2;
    if (element.id === "four") index = 3;
    if (element.id === "five") index = 4;
    if (element.id === "six") index = 5;
    if (element.id === "seven") index = 6;
    if (element.id === "eight") index = 7;
    if (element.id === "nine") index = 8;
    return index;
  };

  this.checkBoard = (sign) => {
    let winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    winCombinations.forEach((combination) => {
      let index1 = combination[0];
      let index2 = combination[1];
      let index3 = combination[2];

      if (
        board[index1] === sign &&
        board[index2] === sign &&
        board[index3] === sign
      ) {
        console.log(`${sign} wins!`);
      }
    });
  };

  this.printBoard = () => {
    console.log(board);
  };

  init();
  return { printBoard };
})();

// let firstX = 0;
// let secondX = 0;
// let thirdX = 0;

// if (sign === "close") {
//   firstX = board.indexOf("x");
//   secondX = board.indexOf("x", 1);
//   thirdX = board.indexOf("x", 2);
//   console.log(firstX);
//   console.log(secondX);
//   console.log(thirdX);
// }

// if (
//   (Math.abs(firstX - secondX) === 1 &&
//     Math.abs(secondX - Math.abs(thirdX)) === 1) ||
//   (Math.abs(firstX - secondX) === 4 &&
//     Math.abs(secondX - Math.abs(thirdX)) === 4) ||
//   (Math.abs(firstX - secondX) === 3 &&
//     Math.abs(secondX - Math.abs(thirdX)) === 3)
// ) {
//   console.log("X wins!");
// }
