let isSolved = false; 
document.getElementById('sudoku-form').addEventListener('submit', function(event) {
  event.preventDefault();
  let board = [];
  for (let row = 0; row < 9; row++) {
    let rowData = [];
    for (let col = 0; col < 9; col++) {
      let value = document.getElementById(`cell-${row}-${col}`).value;
      rowData.push(value ? parseInt(value) : 0);
    }
    board.push(rowData);
  }

  const formData = new URLSearchParams();
  board.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      formData.append(`cell-${rowIndex}-${colIndex}`, value);
    });
  });

  fetch('/solve', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData
  })
  .then(response => response.json())
  .then(solvedBoard => {
    if (solvedBoard.error) {
      alert(solvedBoard.error);
    } else {
      
      solvedBoard.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          const cellElement = document.getElementById(`cell-${rowIndex}-${colIndex}`);
          if (cell !== 0) {
            cellElement.value = cell;  
          }
        });
      });

      
      document.getElementById('clear-btn').style.display = 'inline-block';
      isSolved = true; 
    }
  })
  .catch(error => {
    console.error('Error solving puzzle:', error);
  });
});


document.getElementById('clear-btn').addEventListener('click', function() {
  
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cellElement = document.getElementById(`cell-${row}-${col}`);
      cellElement.value = '';  
    }
  }

  
  const allCells = document.querySelectorAll('td');
  allCells.forEach(cell => cell.classList.remove('highlight'));

  
  document.getElementById('clear-btn').style.display = 'none';

  
  isSolved = false;
});


const highlightCells = (row, col) => {
  if (!isSolved) return; 

  
  const allCells = document.querySelectorAll('td');
  allCells.forEach(cell => cell.classList.remove('highlight'));

  
  for (let c = 0; c < 9; c++) {
    document.getElementById(`cell-${row}-${c}`).parentElement.classList.add('highlight');
  }

  
  for (let r = 0; r < 9; r++) {
    document.getElementById(`cell-${r}-${col}`).parentElement.classList.add('highlight');
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      document.getElementById(`cell-${r}-${c}`).parentElement.classList.add('highlight');
    }
  }
};

for (let row = 0; row < 9; row++) {
  for (let col = 0; col < 9; col++) {
    const cellElement = document.getElementById(`cell-${row}-${col}`);
    cellElement.addEventListener('click', () => highlightCells(row, col));
  }
}