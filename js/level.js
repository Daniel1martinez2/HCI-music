const createLevel = ({
  pattern,
  colors,
  size,
  matrix,
  matrixSize
}) => {
  const variables = {
    passed: false,
    pattern,
    colors,
    size,
    cellsNum: Math.pow(size, 2),
    time: 0, 
    error: 0, 
    repetition: 0, 
  }
  const cells = matrix.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.style.height = `${50/size}vmin`;
    cell.style.width = `${50/size}vmin`;
  });
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
    message[1].classList.add('hidden');
    let index = 0;
    let interval = setInterval(() => {
      resetMatrix();
      setTimeout(() => {
        beep(pattern[index]);
        cells[pattern[index]].style.backgroundColor = '#00FFFF';
        index++;
        //stop interval
        if (index >= pattern.length) {
          clearInterval(interval);
          setTimeout(() => {
            console.log('ya');

            freezeClick = false;
            resetMatrix();
          }, noteTime);
        };
      }, 500);
    }, noteTime);
  };
  //check if the current selected cell match pattern current position
  const verify = (patternList) => {
    const cellsObj = matrix.querySelectorAll('.cell');
    let index = 0;
    cellsObj.forEach((obj, i) => {
      obj.addEventListener('click', () => {
        beep(i); //note sounds
        if (obj === cellsObj[patternList[index]]) {
          //well done
          obj.style.backgroundColor = '#00FFFF';
          if (index >= patternList.length - 1) {
            console.log('finish');
            message[1].classList.remove('hidden');
            message[1].classList.add('active');
            index = 0;
          } else {
            index++;
          }
        } else {
          //error
          obj.style.backgroundColor = '#DF6A1E';
          variables.error++; 
          console.log(variables.error + ' error');
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
  const startTimer = (duration, display) => {
    let timer = duration;
    let minutes;
    let seconds;
    setInterval(() => {
      minutes = parseInt(timer / 60);
      seconds = parseInt(timer % 60);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.innerText = minutes + ":" + seconds;
      if (--timer < 0) {
        timer = 0;
      }
    }, 1000);
  }
  //init state
  const startLevel = () => {
    resetMatrix();
    verify(pattern);
  }
  return {
    variables,
    setPassed,
    resetMatrix,
    simonSays,
    startLevel,
    startTimer

  }
}