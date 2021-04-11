const message = document.querySelectorAll('.message'); 
const matrix = document.querySelector('.matrix');
const cells = matrix.querySelectorAll('.cell');
const button = document.querySelector('button');
const noteTime = 2000 / 2.5;
const pattern = [5,24,15,8];
let freezeClick = false; // just modify that variable to disable all clicks events

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
    const cellsColor = gradientTransition(153, 179, 250, 14, 49, 148, cells.length);
    obj.style.backgroundColor = `rgb(
      ${cellsColor[index].R},${cellsColor[index].G},${cellsColor[index].B})`;
  });
}
//pattern performance 
const simonSays = (list) => {
  message.classList.add('hidden'); 
  let index = 0;
  let interval = setInterval(() => {
    resetMatrix();
    setTimeout(() => {
      beep(pattern[index]);
      cells[pattern[index]].style.backgroundColor = 'green';
      index++;
      //stop interval
      if (index >= list.length) {
        clearInterval(interval);
        setTimeout(() => {
          console.log('ya');
          
          freezeClick= false; 
          resetMatrix();
        }, noteTime);
      };
    }, 500);
  }, noteTime);
};
//check if the current selected cell match pattern current position
const verify = (patternList, matrixObj) => {
  const cellsObj = matrixObj.querySelectorAll('.cell');
  let index = 0;
  cellsObj.forEach((obj, i) => {
    obj.addEventListener('click', () => {
      beep(i); //note sounds
      if (obj === cellsObj[patternList[index]]) {
        //well done
        obj.style.backgroundColor = 'green';
        if(index >= patternList.length-1){
          console.log('alo');
          message[1].classList.remove('hidden'); 
          message[1].classList.add('active'); 
          index = 0;
        }else{
          index++;
        }
      } else {
        //error
        obj.style.backgroundColor = 'red';
        freezeClick = true; 
        setTimeout(() => {
          resetMatrix();
          freezeClick= false; 
        }, 1500);
        index = 0;
      }
    });
  })
}
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
  resetMatrix();
  simonSays(pattern)
  freezeClick = true; 
});

resetMatrix();
verify(pattern, matrix);

//create a cell as an object and save his --------just testing around
const createCell = (index, color, sound) => {
  const variables = {
    color,
    index,
    sound
  }
  const setColor = (newColor) => {
    variables.color = newColor;
  }
  return {
    setColor,
    variables,
  };
}
//testing set variables
// const cell0 = createCell(0, '22,22,22');
// console.log(cell0.variables.color);
// cell0.setColor('33,33,33');
// console.log(cell0.variables.color);

