let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let turn0 = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turn0 = true;
  enabledBoxes();
  msgContainer.classList.add("hide");


}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = "O";
      turn0 = false;

    }
    else {
      box.innerText = "X";
      turn0 = true;
    }
    box.disabled = true;

    checkWinner();
  });

})

const disabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }

}
const enabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText="";
  }

}

const showWinner = (winner) => {

  msg.innerText = `Congratulation , Winner is ${winner}`;

  msgContainer.classList.remove("hide");
  disabledBoxes();


}


const checkWinner = () => {
  let isDraw = true; // Assume it's a draw unless proven otherwise

  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val); // Declare the winner
        return; // Exit the function since we have a winner
      }
    }
  }

  // Check if all boxes are filled
  boxes.forEach((box) => {
    if (box.innerText === "") {
      isDraw = false; // If there's an empty box, it's not a draw
    }
  });

  if (isDraw) {
    showDraw(); // Call a function to display the draw message
  }
};

const showDraw = () => {
  msg.innerText = `It's a Draw!`;
  msgContainer.classList.remove("hide");
  disabledBoxes(); // Disable further moves
};


newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);