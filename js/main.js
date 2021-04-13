//Screen stuff variables
const firstScreenBtn = document.querySelector('.screen__btn');
const firstScreen = document.querySelector('.screen');
const mainScreen = document.querySelector('.game');
const winScreen = document.querySelector('.win');
const looseScreen = document.querySelector('.loose');
//main variables
const message = document.querySelectorAll('.message');
const matrix = document.querySelector('.matrix');
const cells = matrix.querySelectorAll('.cell');
const button = document.querySelector('.game__start-btn');
const noteTime = 2000 / 2.5;
const timerText = document.querySelector('.time');
let freezeClick = false;
let currentLevel; //represents the game current displayed
const result = {
  error: 0,
  repetition: 0,
};
//win and loose general functions
const handleLoose = () => {
  mainScreen.classList.add('hidden');
  looseScreen.classList.remove('hidden');
}
const handleWin = () => {
  mainScreen.classList.add('hidden');
  winScreen.classList.remove('hidden');
}
//creating the levels
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
    handleLoose(); 
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
    handleWin(); 
    //result.error = +level1.variables.error + level2.variables.error;
    //console.log(result.error + 'total errors');
  },
  lostByTimeFunc: () => {
    console.log('lost by time');
    handleLoose(); 
  }
});
//init level >>>>>>>>>>>>>>>>>>>>>>>>>>>>
currentLevel = level1;

//Event listeners >>>>>>>>>>>>>>>>>>>>>>>>>>>>
//document click behaviour
document.addEventListener("click", e => {
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
firstScreenBtn.addEventListener('click', () => {
  firstScreen.classList.add('hidden');
  mainScreen.classList.remove('hidden');
  currentLevel.startLevel();
})


