const message = document.querySelectorAll('.message'); 
const matrix = document.querySelector('.matrix');
const cells = matrix.querySelectorAll('.cell');
const button = document.querySelector('button');
const noteTime = 2000 / 2.5;
const timerText = document.querySelector('.time'); 
let freezeClick = false; // just modify that variable to disable all clicks events

const level1 = createLevel({
  matrix,
  pattern: [3,2,8,1,0,4], 
  colors: {first:[153,179, 250],second:[14, 49, 148] }, 
  size: 5, 
  time: 20
}); 
//init level
level1.startLevel(); 
level1.startTimer(timerText);

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
  level1.resetMatrix();
  level1.simonSays(); 
  level1.variables.repetition++; 
  console.log(level1.variables.repetition);
});
