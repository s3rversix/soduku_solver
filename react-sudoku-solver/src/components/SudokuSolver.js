import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SolverContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: #343a40;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 700;
`;

const SudokuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);
  gap: 1px;
  background-color: #343a40;
  border: 2px solid #343a40;
  margin-bottom: 1.5rem;
`;

const Cell = styled.input`
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 500;
  border: none;
  outline: none;
  background-color: ${(props) => 
    props.isHighlighted ? '#e3e3e3' : 
    props.isDimmed ? '#f0f0f0' : 'white'};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:focus {
    background-color: #e3e3e3;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 48%;
  
  &:focus {
    outline: none;
  }
`;

const SolveButton = styled(Button)`
  background-color: #28a745;
  color: white;
  
  &:hover {
    background-color: #218838;
  }
`;

const ClearButton = styled(Button)`
  background-color: #6c757d;
  color: white;
  
  &:hover {
    background-color: #5a6268;
  }
`;

const Message = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  width: 100%;
  text-align: center;
  border-radius: 5px;
  color: ${(props) => (props.error ? 'white' : '#155724')};
  background-color: ${(props) => (props.error ? '#dc3545' : '#d4edda')};
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

const SudokuSolver = () => {
  const [board, setBoard] = useState(Array(9).fill().map(() => Array(9).fill('')));
  const [highlightedCells, setHighlightedCells] = useState([]);
  const [message, setMessage] = useState({ text: '', isError: false, show: false });
  const [solved, setSolved] = useState(false);

  const handleCellChange = (row, col, value) => {
    if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 9)) {
      const newBoard = [...board];
      newBoard[row][col] = value;
      setBoard(newBoard);
    }
  };

  const handleCellClick = (row, col) => {
    if (!solved) return;

    // Highlight row, column, and box
    const cells = [];
    
    // Highlight row
    for (let c = 0; c < 9; c++) {
      cells.push(`${row}-${c}`);
    }
    
    // Highlight column
    for (let r = 0; r < 9; r++) {
      cells.push(`${r}-${col}`);
    }
    
    // Highlight 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        cells.push(`${boxRow + r}-${boxCol + c}`);
      }
    }
    
    setHighlightedCells(cells);
  };

  const solveSudoku = async () => {
    try {
      // Create form data in the format expected by the Flask API
      const formData = new URLSearchParams();
      board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          formData.append(`cell-${rowIndex}-${colIndex}`, cell === '' ? '0' : cell);
        });
      });

      const response = await axios.post('/api/solve', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.data.error) {
        setMessage({
          text: response.data.error,
          isError: true,
          show: true,
        });
      } else {
        const solvedBoard = response.data;
        const newBoard = [];
        
        solvedBoard.forEach((row) => {
          const newRow = row.map((cell) => (cell === 0 ? '' : cell.toString()));
          newBoard.push(newRow);
        });
        
        setBoard(newBoard);
        setSolved(true);
        setMessage({
          text: 'Puzzle solved successfully!',
          isError: false,
          show: true,
        });
      }
    } catch (error) {
      setMessage({
        text: 'Error solving puzzle. Please try again.',
        isError: true,
        show: true,
      });
    }
  };

  const clearBoard = () => {
    setBoard(Array(9).fill().map(() => Array(9).fill('')));
    setHighlightedCells([]);
    setMessage({ text: '', isError: false, show: false });
    setSolved(false);
  };

  const isDimmed = (row, col) => {
    return (
      Math.floor(col / 3) % 2 !== 0 &&
      Math.floor(row / 3) % 2 !== 0 &&
      !(Math.floor(row / 3) === 1 && Math.floor(col / 3) === 1)
    );
  };

  return (
    <SolverContainer>
      <Title>Sudoku Solver</Title>
      
      <SudokuGrid>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              type="number"
              min="1"
              max="9"
              value={cell}
              onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              isDimmed={isDimmed(rowIndex, colIndex)}
              isHighlighted={highlightedCells.includes(`${rowIndex}-${colIndex}`)}
            />
          ))
        )}
      </SudokuGrid>
      
      <ButtonContainer>
        <SolveButton onClick={solveSudoku}>Solve Puzzle</SolveButton>
        <ClearButton onClick={clearBoard}>Clear Grid</ClearButton>
      </ButtonContainer>
      
      <Message show={message.show} error={message.isError}>
        {message.text}
      </Message>
    </SolverContainer>
  );
};

export default SudokuSolver; 