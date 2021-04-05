const matrix = document.querySelector('.matrix');
const cells = matrix.querySelectorAll('.cell');
const button = document.querySelector('button');
const noteTime = 2000 / 2;
const pattern = [4, 5, 20, 12, 13, 14, 15, ];
const unable = () => {
  cells.forEach((obj) => {
    obj.classList.remove('cell--active');
    obj.classList.remove('cell--wrong');
  });
}

const simonSays = (list) => {
  let index = 0;
  let interval = setInterval(() => {
    unable();
    setTimeout(() => {
      cells[pattern[index]].classList.add('cell--active');
      index++;
      //stop interval
      if (index >= list.length) {
        clearInterval(interval);
        setTimeout(() => {
          console.log('ya');
          unable();
        }, noteTime);
      };
    }, 500);
  }, noteTime);
};

button.addEventListener('click', () => {
  unable();
  simonSays(pattern)
});

const verify = (patternList, matrixObj) => {
  const cellsObj = matrixObj.querySelectorAll('.cell');
  let index = 0;
  cellsObj.forEach((obj, i) => {
    obj.addEventListener('click', () => {

      if (obj === cellsObj[patternList[index]]) {
        obj.classList.add('cell--active');
        index++;
      } else {
        obj.classList.add('cell--wrong');
        setTimeout(() => {
          unable();
        }, 1500);
        index = 0;
      }
    });
  })
}

verify(pattern, matrix);