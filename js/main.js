const message = document.querySelectorAll('.message');
const matrix = document.querySelector('.matrix');
const cells = matrix.querySelectorAll('.cell');
const button = document.querySelector('button');
const noteTime = 2000 / 2.5;
const timerText = document.querySelector('.time');
let freezeClick = false; 
const result = {
  error: 0, 
  repetition:0,
}; 
const level1 = createLevel({
  matrix,
  pattern: [0, 1, 2, 3],
  colors: {
    first: [153, 179, 250],
    second: [11, 34, 98]
  },
  size: 5,
  time: 20,
  timerDisplay: timerText,
  finishLevelFunc: () => {
    console.log('esta es una pruebaaa');
    //setting current level
    currentLevel = level2;
    currentLevel.startLevel();
  },
  lostByTimeFunc: () => {
    console.log('lost by time');

  }
});
const level2 = createLevel({
  matrix,
  pattern: [3, 2, 1, 0],
  colors: {
    first: [153, 179, 250],
    second: [11, 34, 98]
  },
  size: 2,
  time: 10,
  timerDisplay: timerText,
  finishLevelFunc: () => {
    console.log('esta es una pruebaaa');
    result.error =+ level1.variables.error + level2.variables.error; 
    console.log(result.error);
  },
  lostByTimeFunc: () => {
    console.log('lost by time');
  }
});
//init level
let currentLevel = level1;
currentLevel.startLevel();


//Event listeners >>>>>>>>>>>>>>>>>>>>>>>>>>>>
//document click behaviour
document.addEventListener("click", e => {
  //console.log(timerText.innerHTML); >>>>>>>>>>>>>>>>>>>>>>>>
  if (freezeClick) {
    e.stopPropagation();
    e.preventDefault();
  }
}, true);
//start simon pattern performance 
button.addEventListener('click', () => {
  freezeClick = true;
  currentLevel.simonSays();
  currentLevel.variables.repetition++;
  console.log(currentLevel.variables.repetition);
});