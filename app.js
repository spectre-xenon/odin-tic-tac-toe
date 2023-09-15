const player = (theName, theSign) => {
  let name = theName;
  let sign = theSign;

  const setName = (newName) => {
    name = newName;
  };

  const setSign = (newSign) => {
    sign = newSign;
  };

  const getSign = () => {
    return sign;
  };

  return { setName, setSign, getSign };
};

const game = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  let gameWon = false;
  let player1Turn = true;

  // Cache DOM
  const one = document.getElementById("one");
  const two = document.getElementById("two");
  const three = document.getElementById("three");
  const four = document.getElementById("four");
  const five = document.getElementById("five");
  const six = document.getElementById("six");
  const seven = document.getElementById("seven");
  const eight = document.getElementById("eight");
  const nine = document.getElementById("nine");
  const wonText = document.getElementById("wonText");

  const init = () => {
    bindEvents();
  };

  const bindEvents = () => {
    one.addEventListener("click", playTurn);
    two.addEventListener("click", playTurn);
    three.addEventListener("click", playTurn);
    four.addEventListener("click", playTurn);
    five.addEventListener("click", playTurn);
    six.addEventListener("click", playTurn);
    seven.addEventListener("click", playTurn);
    eight.addEventListener("click", playTurn);
    nine.addEventListener("click", playTurn);
  };

  const removeEvents = () => {
    one.removeEventListener("click", playTurn);
    two.removeEventListener("click", playTurn);
    three.removeEventListener("click", playTurn);
    four.removeEventListener("click", playTurn);
    five.removeEventListener("click", playTurn);
    six.removeEventListener("click", playTurn);
    seven.removeEventListener("click", playTurn);
    eight.removeEventListener("click", playTurn);
    nine.removeEventListener("click", playTurn);
  };

  const playTurn = (event) => {
    let element = event.target;
    let index = getIndex(element);

    if (player1Turn) {
      sign = gameHandler.playerOne.getSign();
      player1Turn = false;
    } else if (!gameHandler.getCheckboxState()) {
      sign = gameHandler.playerTwo.getSign();
      player1Turn = true;
    }

    if (element.innerText === "") {
      addToBoard(sign, index);
      element.appendChild(renderSign(sign));
      checkBoard(sign);
      if (gameHandler.getCheckboxState()) {
        getBotChoice(element);
        checkBoard(getBotSign());
      }
    }
  };

  const getIndex = (element) => {
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

  const addToBoard = (sign, index) => {
    board[index] = sign;
  };

  const renderSign = (sign) => {
    const span = document.createElement("span");
    span.classList.add("material-symbols-rounded");
    if (sign === "x") {
      span.innerText = "close";
    } else {
      span.innerText = "circle";
    }

    return span;
  };

  const checkBoard = (sign) => {
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
        removeEvents();
        wonText.innerText = `${sign} wins!`;
        gameWon = true;
      }
    });

    if (getEmptySpaces() === 0 && !gameWon) {
      removeEvents();
      console.log("it's a draw!");
    }
  };

  const printBoard = () => {
    console.log(board);
  };

  const resetBoard = () => {
    one.innerText = "";
    two.innerText = "";
    three.innerText = "";
    four.innerText = "";
    five.innerText = "";
    six.innerText = "";
    seven.innerText = "";
    eight.innerText = "";
    nine.innerText = "";
    wonText.innerText = "";

    for (let index = 0; index < board.length; index++) {
      board[index] = "";
    }

    gameWon = false;

    bindEvents();
  };

  const getBotSign = () => {
    return gameHandler.playerTwo.getSign();
  };

  const getBotChoice = (element) => {
    if (getEmptySpaces() === 0 || gameWon) return;

    let space;
    let botSign = getBotSign();
    let isEmpty = false;

    while (!isEmpty) {
      if (gameHandler.getbotDeff() === "impossible") {
        // TODO Implement Impossible AI here
        space = Math.floor(Math.random() * 8);
      } else {
        space = Math.floor(Math.random() * 8);
      }

      if (board[space] === "") {
        isEmpty = true;
      }
    }

    addToBoard(botSign, space);
    if (space === 0) one.appendChild(renderSign(botSign));
    else if (space === 1) two.appendChild(renderSign(botSign));
    else if (space === 2) three.appendChild(renderSign(botSign));
    else if (space === 3) four.appendChild(renderSign(botSign));
    else if (space === 4) five.appendChild(renderSign(botSign));
    else if (space === 5) six.appendChild(renderSign(botSign));
    else if (space === 6) seven.appendChild(renderSign(botSign));
    else if (space === 7) eight.appendChild(renderSign(botSign));
    else nine.appendChild(renderSign(botSign));
  };

  const getEmptySpaces = () => {
    let emptySpaces = 0;
    for (let index = 0; index < board.length; index++) {
      if (board[index] === "") {
        emptySpaces++;
      }
    }
    return emptySpaces;
  };

  init();
  return { printBoard, resetBoard };
})();

const gameHandler = (() => {
  const playerOne = player("player1", "x");
  const playerTwo = player("player2", "o");

  // Cache DOM
  const title1 = document.getElementById("player-1-title");
  const title2 = document.getElementById("player-2-title");
  const playerInput1 = document.getElementById("player1");
  const playerInput2 = document.getElementById("player2");
  // const x = document.getElementById("x");
  // const o = document.getElementById("o");
  const botCheckbox = document.getElementById("botCheckbox");
  const botDeff = document.getElementById("botDeff");
  const resetButt = document.getElementById("reset");

  const init = () => {
    bindEvents();
    setInputs();
    getbotDeff();
  };

  const bindEvents = () => {
    playerInput1.addEventListener("input", handleInput);
    playerInput2.addEventListener("input", handleInput);
    // x.addEventListener("click", selectSign);
    // o.addEventListener("click", selectSign);
    botCheckbox.addEventListener("change", setInputs);
    botDeff.addEventListener("change", reset);
    resetButt.addEventListener("click", reset);
  };

  const handleInput = (event) => {
    let input = event.target;
    let inputValue = input.value;

    if (inputValue === "" && input.id === "player1") {
      playerOne.setName("player1");
      title1.innerText = "player1";
    } else if (input.id === "player1") {
      playerOne.setName(inputValue);
      title1.innerText = inputValue;
      return;
    }

    if (inputValue === "" && input.id === "player2") {
      playerTwo.setName("player2");
      title2.innerText = "player2";
    } else if (input.id === "player2") {
      playerTwo.setName(inputValue);
      title2.innerText = inputValue;
    }
  };

  // const selectSign = (event) => {
  //   event.preventDefault();
  //   let butt = event.target;

  //   if (butt.id === "x") {
  //     game.resetBoard();
  //     playerOne.setSign("x");
  //     playerTwo.setSign("o");
  //     playerOne.getSign();
  //   }

  //   if (butt.id === "o") {
  //     game.resetBoard();
  //     playerOne.setSign("o");
  //     playerTwo.setSign("x");
  //     playerOne.getSign();
  //   }
  // };

  const getCheckboxState = () => {
    if (!botCheckbox.checked) {
      return false;
    }
    return true;
  };

  const setInputs = () => {
    if (getCheckboxState()) {
      game.resetBoard();
      playerInput2.setAttribute("disabled", "");
      playerInput2.classList.add("disabled");
      title2.innerText = "Bot";
      // x.removeAttribute("disabled");
      // x.style.pointerEvents = "all";
      // o.removeAttribute("disabled");
      // o.style.pointerEvents = "all";
    } else {
      game.resetBoard();
      playerInput2.removeAttribute("disabled");
      playerInput2.classList.remove("disabled");
      title2.innerText = "Player2";
      // x.setAttribute("disabled", "");
      // x.style.pointerEvents = "none";
      // o.setAttribute("disabled", "");
      // o.style.pointerEvents = "none";
    }
  };

  const getbotDeff = () => {
    if (botDeff.value === "impossible") return "impossible";
    return "normal";
  };

  const reset = (event) => {
    event.preventDefault();
    game.resetBoard();
  };

  init();
  return { playerOne, playerTwo, getCheckboxState, botDeff, getbotDeff };
})();
