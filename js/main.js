//Screen stuff variables
const firstScreenBtn = document.querySelector('.screen__btn');
const firstScreen = document.querySelector('.screen');
const mainScreen = document.querySelector('.game');
const winScreen = document.querySelector('.win');
const looseScreen = document.querySelector('.loose');
const levelMsgs = document.querySelector('.level-msgs');
const instructionsScreen = document.querySelector('.instructions'); 
const vidInstructions = document.querySelector('.instructions__vid'); 
const instructionsBtn = document.querySelector('.instructions__btn'); 
levelMsgs.innerText = 'level 1';
//main variables

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
  passed:[],
};
const settingCurrentLevel = (level) => {
  currentLevel = level;
  currentLevel.startLevel();
}
//win and loose general functions
const handleLoose = () => {
  console.log(result);
  mainScreen.classList.add('hidden');
  looseScreen.classList.remove('hidden');
}
const handleWin = () => {
  console.log(result);
  mainScreen.classList.add('hidden');
  winScreen.classList.remove('hidden');
}
//creating the levels
//level 1 ---------------------------------------------------------
const level1 = createLevel({
  matrix,
  pattern: [1, 2, 3],
  colors: {
    first: [153, 179, 250],
    second: [11, 34, 98]
  },
  size: 3,
  time: 15,
  timerDisplay: timerText,
  finishLevelFunc: () => {
    result.passed.push(true); 
    console.log(result);
    //setting current level
    settingCurrentLevel(level2);
    levelMsgs.innerText = 'level 2';
  },
  lostByTimeFunc: () => {
    result.error = level1.variables.error; 
    result.repetition = level1.variables.repetition -1; 
    result.passed.push(false,false,false); 
    console.log(result);
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
    result.passed.push(true); 
    settingCurrentLevel(level3);
    levelMsgs.innerText = 'level 3';

  },
  lostByTimeFunc: () => { 
    result.error = level1.variables.error+level2.variables.error; 
    result.repetition = level1.variables.repetition+level2.variables.repetition -2; 
    result.passed.push(false,false); 
    handleLoose();
  }
});
//level 3 ---------------------------------------------------------
const level3 = createLevel({
  matrix,
  pattern: [4, 5, 9, 1],
  colors: {
    first: [153, 179, 250],
    second: [11, 34, 98]
  },
  size: 5,
  time: 30,
  timerDisplay: timerText,
  finishLevelFunc: () => {
    result.error = level1.variables.error+level2.variables.error+level3.variables.error; 
    result.repetition = level1.variables.repetition+level2.variables.repetition+level3.variables.repetition-3;  
    result.passed.push(true); 
    handleWin();
  },
  lostByTimeFunc: () => {
    result.error = level1.variables.error+level2.variables.error+level3.variables.error;
    result.repetition = level1.variables.repetition+level2.variables.repetition+level3.variables.repetition-3;  
    result.passed.push(false); 
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
  instructionsScreen.classList.remove('hidden'); 
  vidInstructions.play(); 
  //mainScreen.classList.remove('hidden');
  //currentLevel.startLevel();
})
instructionsBtn.addEventListener('click', () => {
  instructionsScreen.classList.add('hidden'); 
  mainScreen.classList.remove('hidden');
  currentLevel.startLevel();
})
