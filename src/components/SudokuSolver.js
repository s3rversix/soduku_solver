import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SolverContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
`;

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
`;

const GridContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0;
`;


const SudokuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);
  gap: 1px;
  background-color: #343a40;
  border: 2px solid #343a40;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const Cell = styled.input`
  width: 70px;
  height: 70px;
  text-align: center;
  font-size: 1.6rem;
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

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    font-size: 1rem;
  }

  @media (max-width: 350px) {
    width: 28px;
    height: 28px;
    font-size: 0.9rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 140px;
  position: relative;
  overflow: hidden;
  
  &:focus {
    outline: none;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  &:hover::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
    animation: shine 0.6s ease;
  }

  @keyframes shine {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
`;

const SolveButton = styled(Button)`
  background-color: #0277bd;
  color: white;
  
  &:hover {
    background-color: #015d99;
  }
`;

const ClearButton = styled(Button)`
  background-color: #0277bd;
  color: white;
  
  &:hover {
    background-color: #015d99;
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
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      setMessage({ text: '', isError: false, show: false });

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
          text: '',
          isError: false,
          show: false,
        });
      }
    } catch (error) {
      setMessage({
        text: 'Error solving puzzle. Please try again.',
        isError: true,
        show: true,
      });
    } finally {
      setIsLoading(false);
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
      <GridContainer>
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
                disabled={isLoading}
              />
            ))
          )}
        </SudokuGrid>
      </GridContainer>

      <ControlsContainer>
        <ButtonContainer>
          <SolveButton onClick={solveSudoku} disabled={isLoading}>
            {isLoading ? 'Solving...' : 'Solve Puzzle'}
          </SolveButton>
          <ClearButton onClick={clearBoard} disabled={isLoading}>
            Clear Grid
          </ClearButton>
        </ButtonContainer>

        <Message show={message.show} error={message.isError}>
          {message.text}
        </Message>
      </ControlsContainer>
    </SolverContainer>
  );
};

export default SudokuSolver; 