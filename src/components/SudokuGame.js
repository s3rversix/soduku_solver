import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
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
    props.isSelected ? '#b3e5fc' :
      props.isHighlighted ? '#e3e3e3' :
        props.isDimmed ? '#f0f0f0' :
          props.isGiven ? '#f9f9f9' : 'white'};
  color: ${(props) => (props.isGiven ? '#343a40' : props.isError ? 'red' : '#0277bd')};
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: ${(props) => (props.isGiven ? '700' : '500')};

  &:focus {
    background-color: #b3e5fc;
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
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  margin: 0;
  flex-wrap: wrap;

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
`;

const ActionButton = styled(Button)`
  background-color: #0277bd;
  color: white;
  min-width: 120px;
  
  &:hover {
    background-color: #015d99;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;
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


const TimerContainer = styled.div`
  width: 100%;
  margin-bottom: 0;
  display: flex;
  justify-content: center;
`;

const Timer = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0.5rem;
  text-align: center;
  color: white;
`;

const SudokuGame = () => {
  const [board, setBoard] = useState(Array(9).fill().map(() => Array(9).fill('')));
  const [solution, setSolution] = useState(Array(9).fill().map(() => Array(9).fill('')));
  const [originalBoard, setOriginalBoard] = useState(Array(9).fill().map(() => Array(9).fill(false)));
  const [selectedCell, setSelectedCell] = useState(null);
  const [highlightedCells, setHighlightedCells] = useState([]);
  const [difficulty] = useState('medium');
  const [message, setMessage] = useState({ text: '', isError: false, show: false });
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [errors, setErrors] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    // Start timer when a new game begins
    let interval = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  // Generate a new Sudoku puzzle
  const generatePuzzle = async () => {
    try {
      setIsLoading(true);
      // Reset game state
      setSelectedCell(null);
      setHighlightedCells([]);
      setMessage({ text: '', isError: false, show: false });
      setTime(0);
      setGameComplete(false);
      setErrors(new Set());

      // Call the API to generate a new puzzle with the selected difficulty
      const response = await axios.get(`/api/generate?difficulty=${difficulty}`);

      if (response.data.error) {
        setMessage({
          text: response.data.error,
          isError: true,
          show: true
        });
        return;
      }

      const { puzzle, solution } = response.data;

      // Convert the puzzle to our board format and track which cells are given
      const newBoard = [];
      const newOriginalBoard = [];

      for (let i = 0; i < 9; i++) {
        const row = [];
        const originalRow = [];
        for (let j = 0; j < 9; j++) {
          row.push(puzzle[i][j] === 0 ? '' : puzzle[i][j].toString());
          originalRow.push(puzzle[i][j] !== 0);
        }
        newBoard.push(row);
        newOriginalBoard.push(originalRow);
      }

      setBoard(newBoard);
      setOriginalBoard(newOriginalBoard);
      setSolution(solution);
      setTimerActive(true);
      setMessage({
        text: '',
        isError: false,
        show: false
      });
    } catch (error) {
      setMessage({
        text: 'Error generating puzzle. Please try again.',
        isError: true,
        show: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Generate a puzzle when the component mounts
    generatePuzzle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleCellClick = useCallback((row, col) => {
    if (originalBoard[row][col]) return; // Can't select given cells

    setSelectedCell([row, col]);

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

    // Highlight all cells with the same number
    const clickedValue = board[row][col];
    if (clickedValue !== '') {
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (board[r][c] === clickedValue) {
            cells.push(`${r}-${c}`);
          }
        }
      }
    }

    setHighlightedCells(cells);
  }, [originalBoard, board]);

  // Check for Sudoku rule violations
  const checkSudokuRules = useCallback((board, row, col, value) => {
    const violations = new Set();

    // Check row
    for (let c = 0; c < 9; c++) {
      if (c !== col && board[row][c] === value) {
        violations.add(`${row}-${c}`);
      }
    }

    // Check column
    for (let r = 0; r < 9; r++) {
      if (r !== row && board[r][col] === value) {
        violations.add(`${r}-${col}`);
      }
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        if ((r !== row || c !== col) && board[r][c] === value) {
          violations.add(`${r}-${c}`);
        }
      }
    }

    return violations;
  }, []);

  const checkCompletion = useCallback((currentBoard) => {
    let isComplete = true;

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (currentBoard[i][j] === '' || currentBoard[i][j] !== solution[i][j].toString()) {
          isComplete = false;
          break;
        }
      }
      if (!isComplete) break;
    }

    if (isComplete) {
      setTimerActive(false);
      setGameComplete(true);
      setMessage({
        text: `Congratulations! You completed the puzzle in ${formatTime(time)}!`,
        isError: false,
        show: true
      });
    }
  }, [solution, time]);

  const handleNumberInput = useCallback((number) => {
    if (!selectedCell) return;

    const [row, col] = selectedCell;
    const newBoard = [...board];

    // Check if the input matches the solution
    const errorKey = `${row}-${col}`;
    const newErrors = new Set(errors);

    if (number === '') {
      newBoard[row][col] = '';
      newErrors.delete(errorKey);
    } else {
      const numberValue = number.toString();
      newBoard[row][col] = numberValue;

      // Real-time validation - check if the value is correct according to the solution
      if (numberValue !== solution[row][col].toString()) {
        newErrors.add(errorKey);
      } else {
        newErrors.delete(errorKey);
      }

      // Also check for Sudoku rule violations (same number in row, column, or box)
      const ruleViolations = checkSudokuRules(newBoard, row, col, numberValue);
      ruleViolations.forEach(violation => newErrors.add(violation));
    }

    setBoard(newBoard);
    setErrors(newErrors);

    // Check if the game is complete
    checkCompletion(newBoard);
  }, [selectedCell, board, errors, solution, checkSudokuRules, checkCompletion]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!selectedCell) return;

      const key = event.key;

      // Handle number keys 1-9
      if (key >= '1' && key <= '9') {
        handleNumberInput(parseInt(key));
        event.preventDefault();
      }

      // Handle backspace and delete for erasing
      if (key === 'Backspace' || key === 'Delete') {
        handleNumberInput('');
        event.preventDefault();
      }

      // Handle arrow keys for navigation
      if (selectedCell && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
        const [row, col] = selectedCell;
        let newRow = row;
        let newCol = col;

        switch (key) {
          case 'ArrowUp':
            newRow = Math.max(0, row - 1);
            break;
          case 'ArrowDown':
            newRow = Math.min(8, row + 1);
            break;
          case 'ArrowLeft':
            newCol = Math.max(0, col - 1);
            break;
          case 'ArrowRight':
            newCol = Math.min(8, col + 1);
            break;
          default:
            break;
        }

        // Only move if the new cell is not a given cell
        if (!originalBoard[newRow][newCol]) {
          handleCellClick(newRow, newCol);
        }
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedCell, originalBoard, board, handleCellClick, handleNumberInput]);

  const newGame = () => {
    generatePuzzle();
  };

  const solvePuzzle = () => {
    const solvedBoard = [...solution];
    const newBoard = [];

    solvedBoard.forEach((row) => {
      const newRow = row.map((cell) => cell.toString());
      newBoard.push(newRow);
    });

    setBoard(newBoard);
    setTimerActive(false);
    setGameComplete(true);
    setMessage({
      text: 'Puzzle solved!',
      isError: false,
      show: true
    });
  };


  const isDimmed = (row, col) => {
    return (
      Math.floor(col / 3) % 2 !== 0 &&
      Math.floor(row / 3) % 2 !== 0 &&
      !(Math.floor(row / 3) === 1 && Math.floor(col / 3) === 1)
    );
  };

  return (
    <GameContainer>
      <TimerContainer>
        <Timer>Time: {formatTime(time)}</Timer>
      </TimerContainer>

      <GridContainer>
        <SudokuGrid>
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                type="text"
                value={cell}
                readOnly={true}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                isGiven={originalBoard[rowIndex][colIndex]}
                isDimmed={isDimmed(rowIndex, colIndex)}
                isSelected={selectedCell && selectedCell[0] === rowIndex && selectedCell[1] === colIndex}
                isHighlighted={highlightedCells.includes(`${rowIndex}-${colIndex}`)}
                isError={errors.has(`${rowIndex}-${colIndex}`)}
              />
            ))
          )}
        </SudokuGrid>
      </GridContainer>

      <ButtonContainer>
        <ActionButton
          onClick={newGame}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'New Game'}
        </ActionButton>
        <ActionButton
          onClick={solvePuzzle}
          disabled={gameComplete || isLoading}
        >
          Solve
        </ActionButton>
      </ButtonContainer>

      <Message show={message.show} error={message.isError}>
        {message.text}
      </Message>
    </GameContainer>
  );
};

export default SudokuGame; 