//Screen stuff variables
const firstScreenBtn = document.querySelector('.screen__btn');
const firstScreen = document.querySelector('.screen');
const mainScreen = document.querySelector('.game');
const winScreen = document.querySelector('.win');
const restartPattern = document.querySelector('.restart-btn'); 
const looseScreen = document.querySelector('.loose');
const levelMsgs = document.querySelector('.level-msgs');
const instructionsScreen = document.querySelector('.instructions');
const vidInstructions = document.querySelector('.instructions__vid');
const instructionsBtn = document.querySelector('.instructions__btn');
const pressStartMsg = document.querySelector('.innit-message-start'); 
const restartLevel = document.querySelector('.loose__restart'); 
levelMsgs.innerText = 'level 1';
//main variables
const matrix = document.querySelector('.matrix');
const cells = matrix.querySelectorAll('.cell');
const button = document.querySelector('.game__start-btn');
const noteTime = 2000 / 2.5;
const timerText = document.querySelector('.time');
let freezeClick = false;
restartPattern.classList.add('hidden'); 
let currentLevel; //represents the game current displayed
levelTime = {
  value: 0
}
const result = {
  error: 0,
  repetition: 0,
  passed: [],
  usedTime: [],
  gameResetTimes:0
};
const settingCurrentLevel = (level) => {
  currentLevel = level;
  currentLevel.startLevel();
}
//win and loose general functions
const handleLoose = () => {
  restartPattern.classList.add('hidden'); 
  console.log(result);
  mainScreen.classList.add('hidden');
  looseScreen.classList.remove('hidden');
  button.classList.remove('hidden'); 
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
  pattern: [5,2,8,1,3,7], //5 / 4 
  colors: {
    first: [153, 179, 250],
    second: [11, 34, 98]
  },
  size: 3,
  time: 40,
  timerDisplay: timerText,
  finishLevelFunc: () => {
    button.classList.remove('hidden'); 
    result.usedTime.push(timerText.innerText);
    result.passed.push(true);
    //setting current level
    settingCurrentLevel(level2);
    levelMsgs.innerText = 'level 2';
    console.log(levelTime);
    restartPattern.classList.add('hidden'); 
  },
  lostFunc: handleLoose
  ,
  levelTime,
  allowedErrors:3,
});
// level 2 ---------------------------------------------------------
const level2 = createLevel({
  matrix,
  pattern: [14,8,3,9,1], //  6 / 7
  colors: {
    first: [153, 179, 250],
    second: [11, 34, 98]
  },
  size: 4,
  time: 45,
  timerDisplay: timerText,
  finishLevelFunc: () => {
    button.classList.remove('hidden'); 
    restartPattern.classList.add('hidden'); 
    result.usedTime.push(timerText.innerText);
    result.passed.push(true);
    settingCurrentLevel(level3);
    levelMsgs.innerText = 'level 3';

  },
  lostFunc: handleLoose,
  levelTime,
  allowedErrors:2,
});
//level 3 ---------------------------------------------------------
const level3 = createLevel({
  matrix,
  pattern: [20,10,1,15,12,5,24,22], // 8 / 9 / 10
  colors: {
    first: [153, 179, 250],
    second: [11, 34, 98]
  },
  size: 5,
  time: 50,
  timerDisplay: timerText,
  finishLevelFunc: () => {
    result.usedTime.push(timerText.innerText);
    result.error = level1.variables.error + level2.variables.error + level3.variables.error;
    result.repetition = level1.variables.repetition + level2.variables.repetition + level3.variables.repetition - 3;
    result.gameResetTimes = level1.variables.gameResetTimes + level2.variables.gameResetTimes + level3.variables.gameResetTimes;
    result.passed.push(true);
    handleWin();
  },
  lostFunc: handleLoose,
  levelTime,
  allowedErrors:2,
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
const deployPattern = () => {
  freezeClick = true;
  currentLevel.simonSays();
  currentLevel.variables.repetition++;
  pressStartMsg.classList.add('hidden'); 
}; 

button.addEventListener('click', () => {
  restartPattern.classList.remove('hidden'); 
  deployPattern(); 
  button.classList.add('hidden'); 
});
restartPattern.addEventListener('click', deployPattern); 
firstScreenBtn.addEventListener('click', () => {
  firstScreen.classList.add('hidden');
  instructionsScreen.classList.remove('hidden');
  vidInstructions.play();
}); 
instructionsBtn.addEventListener('click', () => {
  instructionsScreen.classList.add('hidden');
  mainScreen.classList.remove('hidden');
  currentLevel.startLevel();
}); 
restartLevel.addEventListener('click',()=>{
  mainScreen.classList.remove('hidden');
  looseScreen.classList.add('hidden');
  currentLevel.startTimer(); 
  currentLevel.variables.pattern.forEach((sound,i) => { 
    currentLevel.variables.pattern[i]= parseInt(Math.random()*Math.pow(currentLevel.variables.size,2)); 
    console.log(currentLevel.variables.pattern);
  });
  pressStartMsg.classList.remove('hidden'); 
  currentLevel.variables.wasStarted = false

}); 
