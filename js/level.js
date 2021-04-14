const createLevel = ({
  pattern,
  colors,
  size,
  matrix,
  time,
  timerDisplay, 
  finishLevelFunc,
  lostFunc, 
  levelTime, 
  allowedErrors
}) => {
  const variables = {
    passed: false,
    pattern,
    colors,
    size,
    usedTime:0,
    error: 0,
    repetition: 0,
    outOfTime: false, 
    wasStarted: false,
    gameResetTimes: 0,
  }
  let alreadyLoose = false; 
  const changePattern = (newPattern)=>{
    
  }
  const cells = matrix.querySelectorAll('.cell');
  //init size of the cells based on the size given
  const initCellsSize = ()=>{
    cells.forEach(cell => {
      cell.style.height = `${50/size}vmin`;
      cell.style.width = `${50/size}vmin`;
    });
  }
  const setPassed = (value) => {
    variables.passed = value;
  }
  //cells color based on given init colors -> transition method
  const gradientTransition = (r1, g1, b1, r2, g2, b2, steps) => {
    const colors = [];
    for (let index = 1; index < steps + 1; index++) {
      const rm = (r2 - r1) / (steps - 1);
      const gm = (g2 - g1) / (steps - 1);
      const bm = (b2 - b1) / (steps - 1);
      colors.push({
        R: parseInt((rm * index) + rm + r1),
        G: parseInt((gm * index) + gm + g1),
        B: parseInt((bm * index) + bm + b1),
      });
    };
    return colors;
  };
  // note sound based on a given cell position 
  const beep = (index) => {
    var snd = new Audio(
      `./notes/sound${index}.mp3`
    );
    snd.volume = 1;
    snd.play();
  };
  //reset matrix appearance 
  const resetMatrix = () => {
    cells.forEach((obj, index) => {
      const cellsColor = gradientTransition(...variables.colors.first, ...variables.colors.second, cells.length);
      obj.style.backgroundColor = `rgb(
      ${cellsColor[index].R},${cellsColor[index].G},${cellsColor[index].B})`;
    });
  }
  //pattern performance 
  const simonSays = () => {
    variables.wasStarted = true; 
    if (variables.passed) return
    let index = 0;
    let interval = setInterval(() => {
      resetMatrix();
      setTimeout(() => {
        beep(variables.pattern[index]);
        cells[variables.pattern[index]].style.backgroundColor = '#00FFFF';
        index++;
        //stop interval
        if (index >= variables.pattern.length) {
          clearInterval(interval);
          setTimeout(() => {
            //finish pattern
            freezeClick = false;
            resetMatrix();
          }, noteTime);
        };
      }, 500);
    }, noteTime);
  };
  //check if the current selected cell match pattern current position
  const verify = () => {
    const cellsObj = matrix.querySelectorAll('.cell');
    let index = 0;
    cellsObj.forEach((obj, i) => {
      obj.addEventListener('click', () => {
        if(!variables.wasStarted) return; 
        if (variables.passed) return
        beep(i); //note sounds
        if (obj === cellsObj[variables.pattern[index]]) {
          //well done
          obj.style.backgroundColor = '#00FFFF';
          if (index >= variables.pattern.length - 1) {
            //level passed 
            variables.passed = true;
            finishLevelFunc();
            index = 0;
          } else {
            index++;
          }
        } else {
          //error
          obj.style.backgroundColor = '#DF6A1E';
          variables.error+=10;
          if(variables.error >= allowedErrors*10){
            variables.error = 0; 
            variables.gameResetTimes ++; 
            alreadyLoose = true; 
            lostFunc();
            console.log(variables);
          }
          freezeClick = true;
          setTimeout(() => {
            resetMatrix();
            freezeClick = false;
          }, 1500);
          index = 0;
        }
      });
    })
  }
  //set timer
  //timer 
  const startTimer = () => {
    let timer = time;
    let minutes;
    let seconds;
    let timerInterval = setInterval(() => {
      minutes = parseInt(timer / 60);
      seconds = parseInt(timer % 60);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      timerDisplay.innerText = minutes + ":" + seconds;
      levelTime.value = seconds; 
      if (--timer < 0 || alreadyLoose ) {
        alreadyLoose = false; 
        //lost by time
        timer = 0;
        outOfTime= true; 
        lostFunc(); 
        clearInterval(timerInterval); 
      }
      if (variables.passed){
        variables.usedTime = seconds; 
        console.log(variables.usedTime + 'suuuuuu');
        clearInterval(timerInterval);
      }
    }, 1000);
  }
  //init state
  const startLevel = () => {
    pressStartMsg.classList.remove('hidden'); 
    initCellsSize(); 
    resetMatrix();
    verify();
    startTimer();
  }; 
  return {
    variables,
    setPassed,
    resetMatrix,
    simonSays,
    startLevel,
    startTimer,
  }
}