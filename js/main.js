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
const settingCurrentLevel = (level)=>{
  currentLevel = level;
  currentLevel.startLevel();
}
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
//level 1 ---------------------------------------------------------
const level1 = createLevel({
  matrix,
  pattern: [0, 1, 2, 3],
  colors: {
    first: [153, 179, 250],
    second: [11, 34, 98]
  },
  size: 3,
  time: 20,
  timerDisplay: timerText,
  finishLevelFunc: () => {
    console.log('level 1 done');
    //setting current level
    settingCurrentLevel(level2); 
  },
  lostByTimeFunc: () => {
    console.log('lost by time');
    handleLoose(); 
  }
});
// level 2 ---------------------------------------------------------
const level2 = createLevel({
  matrix,
  pattern: [3, 2, 1, 0],
  colors: {
    first: [153, 179, 250],
    second: [11, 34, 98]
  },
  size: 4,
  time: 25,
  timerDisplay: timerText,
  finishLevelFunc: () => {
    console.log('level 2 done');
    settingCurrentLevel(level3); 
    //result.error = +level1.variables.error + level2.variables.error;
    //console.log(result.error + 'total errors');
  },
  lostByTimeFunc: () => {
    console.log('lost by time');
    handleLoose(); 
  }
});
//level 3 ---------------------------------------------------------
const level3 = createLevel({
  matrix,
  pattern: [4,5,9,1],
  colors: {
    first: [153, 179, 250],
    second: [11, 34, 98]
  },
  size: 5,
  time: 30,
  timerDisplay: timerText,
  finishLevelFunc: () => {
    console.log('level 3 done');
    handleWin(); 
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
});
firstScreenBtn.addEventListener('click', () => {
  firstScreen.classList.add('hidden');
  mainScreen.classList.remove('hidden');
  currentLevel.startLevel();
})


