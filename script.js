const main = document.querySelector('main');
let boardRows = 20;
let boardColumns = 20;
const SNAKE_LEN = 3;
const snake = [];
let usrInput = "";

let FPS = 5;
let FRAME_DURATION = 1000 / FPS ;
let isRunning = false;
let towards 
const possibleTowards = new Set(["left","right","up","down"])


const isUsrInputValid = (input) => {
  if ((!possibleTowards.has(input)) || (towards == "left" && input == "right") || (towards == "right" && input == "left") || (towards == "up" && input == "down") || (towards == "down" && input == "up")) {
    return false 
  } else {
    return true
  }
}

document.addEventListener("keydown", (event) => {
  usrInput = event.key.slice(5).toLowerCase()
  towards = isUsrInputValid(usrInput) ? usrInput : towards;
})


const createGrid = () => {
  let isInvert = false;
  let html = '';
  for (let row = 0; row < boardRows; row++) {
    html += `<div class="row">`
    for (let column = 0; column < boardColumns; column++) {
      const cellStyle = (isInvert)? 'cell-default' : 'cell-invert';
      html += `<div class="column ${cellStyle}"></div>`;
			isInvert = !isInvert;
    };
    isInvert = !isInvert;
    html += `</div>`;
  };
	main.innerHTML = html;
}

const randomNumIncludeMinMax = (min, max) => {
  return Math.floor(Math.random() * (max-min+1) + min)
}

const applySnakeClass = () => {
  snake.map((position, index) => {
    const cell = document.querySelector(`main > div:nth-child(${position[0]}) > div:nth-child(${position[1]})`)
    if (index == 0) {
      cell.classList.add('snake','snakeHead');
    } else if ((index == snake.length-1) && isRunning) {
      cell.classList.remove('snake');
    }
    else {
      cell.classList.add('snake');
      cell.classList.remove('snakeHead');
    }
  })
}

const generateSnakeAndDirection = () => {
  const minRow = SNAKE_LEN, minColumn = SNAKE_LEN;
  const maxRow = boardRows - SNAKE_LEN + 1;
  const maxColumn = boardColumns - SNAKE_LEN + 1;

  // min and max included
  const startRow = randomNumIncludeMinMax(minRow,maxRow)
  const startColumn = randomNumIncludeMinMax(minColumn,maxColumn)

  snake.push([startRow,startColumn])

  // calculate diection that towards center
  // random whether center is vertical or horizontal
  towards = Math.random() < 0.5
    ? (startColumn < boardColumns / 2 ? "right" : "left")
    : (startRow < boardRows / 2 ? "down" : "up")
  //creating tails position
  for (let i = 1; i < SNAKE_LEN; i++) {
    if (towards == "right") {
      snake.push([startRow, startColumn-i])
    } else if (towards == "left") {
      snake.push([startRow, startColumn+i])
    } else if (towards == "up") {
      snake.push([startRow-i, startColumn])
    } else if (towards == "down") {
      snake.push([startRow+i, startColumn])
    }
    
  }
}

// const changePosition = (currentPostition, direction) => {
//   if      ( direction == "right") {currentPostition[1] += 1}
//   else if ( direction == "left" ) {currentPostition[1] -= 1}
//   else if ( direction == "top"  ) {currentPostition[0] += 1}
//   else if ( direction == "down" ) {currentPostition[0] -= 1}
//   else {
//     console.error("direction is not correct")
//     currentPostition[0] += 1
//   }
//   console.log(currentPostition)
//   return currentPostition
// 

const getNextHead = (arr) => {
  if      ( towards == "right") {arr[1] += 1}
  else if ( towards == "left" ) {arr[1] -= 1}
  else if ( towards == "up"  )  {arr[0] -= 1}
  else if ( towards == "down" ) {arr[0] += 1}
  return arr;
}

const unShiftSnakeNext = () => {
  console.log("BEFORE UNSHIFT: ", JSON.stringify(snake), towards)

  const nextHeadPosition = getNextHead([...snake[0]])
  console.log(nextHeadPosition)
  if (nextHeadPosition[0] < 1 || nextHeadPosition[0] > boardRows || nextHeadPosition[1] < 1 || nextHeadPosition[1] > boardColumns) {
    isRunning = false;
    return;
  }
 console.log("BEW", JSON.stringify(snake))
  snake.unshift(nextHeadPosition);
  console.log("AFTER UNSHIFT: ", JSON.stringify(snake))
}

const init = () => {
  console.log("Before Init: ", JSON.stringify(snake))
  createGrid();
  console.log("After Createa Grid: ", JSON.stringify(snake))
  generateSnakeAndDirection();

  applySnakeClass();
}

const gameLoop = () => {
  console.log("Start the loop",JSON.stringify(snake))
  // Upldate
  
  // // (1) Move head towards the direction
  unShiftSnakeNext();
  if (!isRunning) return

  // // Draw - apply class
  applySnakeClass()
  snake.pop()
  
  // Schedule the next frame
  setTimeout(gameLoop, FRAME_DURATION);
}




init();
isRunning = true;
gameLoop();




