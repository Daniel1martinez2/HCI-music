const matrix = document.querySelector('.matrix');
const cells = matrix.querySelectorAll('.cell');
const button = document.querySelector('button');
const noteTime = 2000 / 2;
const pattern = [4, 5, 20, 12, 13, 14, 15, ];

const gradientTransition = () => {
  const colors = [];
  for (let index = 0; index < 25; index++) {
    colors.push({
      R: parseInt(153 - (5.7917 * index)),
      G: parseInt(179 - (5.416 * index)),
      B: parseInt(250 - (4.25 * index))
    });
  };
  return colors;
};



const resetMatrix = () => {
  cells.forEach((obj, index) => {
    //obj.classList.remove('cell--active');
    //obj.classList.remove('cell--wrong');
    obj.style.backgroundColor =
      `rgb(${gradientTransition()[index].R},
    ${gradientTransition()[index].G},
    ${gradientTransition()[index].B})`;

  });
}

resetMatrix();

const simonSays = (list) => {
  let index = 0;
  let interval = setInterval(() => {
    resetMatrix();
    setTimeout(() => {
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