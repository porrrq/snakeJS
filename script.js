const main = document.querySelector('main');
let boardRows = 30;
let boardColumns = 30;
const SNAKE_LEN = 10;
const snake = [];
let usrInput = "";

let FPS = 20;
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
      snake.push([startRow+i, startColumn])
    } else if (towards == "down") {
      snake.push([startRow-i, startColumn])
    } 
  }
  console.log(towards)
}


const getNextHead = (arr) => {
  if      ( towards == "right") {arr[1] += 1}
  else if ( towards == "left" ) {arr[1] -= 1}
  else if ( towards == "up"  )  {arr[0] -= 1}
  else if ( towards == "down" ) {arr[0] += 1}
  return arr;
}

const unShiftSnakeNext = () => {
  const nextHeadPosition = getNextHead([...snake[0]])
  const alreadyHas = snake.some(position => JSON.stringify(position) === JSON.stringify(nextHeadPosition))
  console.log(nextHeadPosition)
  console.log(alreadyHas)
  if (nextHeadPosition[0] < 1 || nextHeadPosition[0] > boardRows || nextHeadPosition[1] < 1 || nextHeadPosition[1] > boardColumns || alreadyHas) {
    isRunning = false;
    return;
  }

  snake.unshift(nextHeadPosition);
  const hasDuplicates = new Set(snake).size !== snake.length;
  console.log(hasDuplicates)
}

const init = () => {
  createGrid();
  generateSnakeAndDirection();
  applySnakeClass();
}

const gameLoop = () => {
  console.log("Start the loop",JSON.stringify(snake))
  // Upldate
  towards = isUsrInputValid(usrInput) ? usrInput : towards;
  console.log(towards)

  // // (1) Move head towards the direction
  unShiftSnakeNext();
  if (!isRunning) {
    snake.map((position, index) => {
    const cell = document.querySelector(`main > div:nth-child(${position[0]}) > div:nth-child(${position[1]})`)
    cell.classList.toggle("dead")
  })
    return
    
  }
  // // Draw - apply class
  applySnakeClass()
  snake.pop()
  
  // Schedule the next frame
  setTimeout(gameLoop, FRAME_DURATION);
}




init();
isRunning = true;
gameLoop();




