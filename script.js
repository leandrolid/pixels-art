function getRandomColor() {
  const red = Math.ceil(Math.random() * 255);
  const green = Math.ceil(Math.random() * 255);
  const blue = Math.ceil(Math.random() * 255);
  const color = `rgb(${red}, ${green}, ${blue})`;
  return color;
}

function createPalette(paletteLength) {
  const table = document.querySelector('#color-palette');
  const line = document.createElement('tr');
  table.appendChild(line);

  for (let index = 0; index < paletteLength; index += 1) {
    const td = document.createElement('td');

    if (index === 0) {
      td.classList.add('selected');
      td.style.backgroundColor = '#000000';
    } else {
      td.style.backgroundColor = getRandomColor();
    }

    td.classList.add('color');
    td.style.border = '1px solid black';
    line.appendChild(td);
  }
}

function removePalette() {
  const table = document.getElementById('color-palette');
  table.innerHTML = '';
}

function createBoard(boardSize) {
  const table = document.querySelector('#pixel-board');

  for (let rowIndex = 0; rowIndex < boardSize; rowIndex += 1) {
    const line = document.createElement('tr');
    table.appendChild(line);

    for (let columnIndex = 0; columnIndex < boardSize; columnIndex += 1) {
      const td = document.createElement('td');
      td.classList.add('pixel');
      line.appendChild(td);
    }
  }
}

function paintPixel(color) {
  const pixels = document.querySelectorAll('.pixel');

  for (let pixelIndex = 0; pixelIndex < pixels.length; pixelIndex += 1) {
    pixels[pixelIndex].addEventListener('click', (event) => {
      const currentPixel = event.target;
      currentPixel.style.backgroundColor = color;
    });
  }
}

function removeSelected(selected) {
  const colors = document.querySelectorAll('.color');

  for (let colorIndex = 0; colorIndex < colors.length; colorIndex += 1) {
    if (selected.target !== colors[colorIndex]) {
      colors[colorIndex].classList.remove('selected');
    }
  }
}

function selectColor() {
  const colors = document.querySelectorAll('.color');

  for (let colorIndex = 0; colorIndex < colors.length; colorIndex += 1) {
    colors[colorIndex].addEventListener('click', (event) => {
      event.target.classList.add('selected');
      removeSelected(event);
      paintPixel(event.target.style.backgroundColor);
    });
  }
}

function clearPixels() {
  const pixels = document.querySelectorAll('.pixel');
  const button = document.querySelector('#clear-board');

  button.addEventListener('click', () => {
    for (let pixelIndex = 0; pixelIndex < pixels.length; pixelIndex += 1) {
      pixels[pixelIndex].style.backgroundColor = '#ffffff';
    }
  });
}

function getNewPalette() {
  const button = document.querySelector('#gererate-palette');

  button.addEventListener('click', () => {
    removePalette();
    createPalette(4);
    selectColor();
  });
}

function getBoardSize() {
  const boardInput = document.getElementById('board-size').value;
  return boardInput;
}

function removePreviousBoard() {
  const table = document.getElementById('pixel-board');
  table.innerHTML = '';
}

function changeBoardSize() {
  const button = document.querySelector('#generate-board');

  button.addEventListener('click', () => {
    let boardSize = getBoardSize();

    if (boardSize === '') {
      alert('Board inválido!');
    } else if (boardSize < 5) {
      boardSize = 5;
    } else if (boardSize > 50) {
      boardSize = 50;
    }

    removePreviousBoard();
    createBoard(boardSize);
  });
}

changeBoardSize();

getNewPalette();

createPalette(4);

createBoard(5);

selectColor();

clearPixels();

paintPixel('black');
