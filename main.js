const matrix = document.querySelector('.matrix');
const cells = matrix.querySelectorAll('.cell');
const button = document.querySelector('button');
const noteTime = 2000 / 2.5;
const pattern = [24, 14, 3, 15, 21];

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
const beep = (index) => {
  var snd = new Audio(
    `./notes/sound${index}.mp3`
  );
  snd.play();
};
const resetMatrix = () => {
  cells.forEach((obj, index) => {
    //obj.classList.remove('cell--active');
    //obj.classList.remove('cell--wrong');
    const cellsColor = gradientTransition(153, 179, 250, 14, 49, 148, cells.length);
    obj.style.backgroundColor = `rgb(
      ${cellsColor[index].R},${cellsColor[index].G},${cellsColor[index].B})`;
  });
}

resetMatrix();

const simonSays = (list) => {
  let index = 0;
  let interval = setInterval(() => {
    resetMatrix();
    setTimeout(() => {
      beep(pattern[index]);
      //cells[pattern[index]].classList.add('cell--active');
      cells[pattern[index]].style.backgroundColor = 'green';
      index++;
      //stop interval
      if (index >= list.length) {
        clearInterval(interval);
        setTimeout(() => {
          console.log('ya');
          resetMatrix();
        }, noteTime);
      };
    }, 500);
  }, noteTime);
};



button.addEventListener('click', () => {
  resetMatrix();
  simonSays(pattern)

});

const verify = (patternList, matrixObj) => {
  const cellsObj = matrixObj.querySelectorAll('.cell');
  let index = 0;
  cellsObj.forEach((obj, i) => {
    obj.addEventListener('click', () => {

      beep(i);

      if (obj === cellsObj[patternList[index]]) {
        //obj.classList.add('cell--active');
        obj.style.backgroundColor = 'green';
        index++;
      } else {
        //obj.classList.add('cell--wrong');

        obj.style.backgroundColor = 'red';

        setTimeout(() => {
          resetMatrix();
        }, 1500);
        index = 0;
      }
    });
  })
}

verify(pattern, matrix);


//create a cell as an object and save his 

const createCell = (index, color, sound) => {
  const variables = {
    color,
    index,
    sound
  }
  const setColor = (newColor) => {
    variables.color = newColor;
    //ball.style.backgroundColor = newColor;
  }
  return {
    setColor,
    variables,
  };

}
//testing set variables
const cell0 = createCell(0, '22,22,22');
console.log(cell0.variables.color);
cell0.setColor('33,33,33');
console.log(cell0.variables.color);