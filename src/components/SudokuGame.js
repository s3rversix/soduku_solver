import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const GameContainer = styled.div`
  max-width: 800px;
  margin: 1rem auto;
  padding: 1rem;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    max-width: 100%;
    margin: 0.5rem;
    padding: 0.75rem;
    border-radius: 10px;
  }
`;

const Title = styled.h1`
  color: #343a40;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const GameLayout = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-width: 240px;

  @media (max-width: 768px) {
    width: 100%;
    min-width: unset;
  }
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
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 1.2rem;
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
  transition: background-color 0.2s ease;
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
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;
  gap: 0.75rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
  }
`;

const ActionButton = styled(Button)`
  background-color: #0277bd;
  color: white;
  width: 100%;
  
  &:hover {
    background-color: #015d99;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const DifficultySelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
`;

const DifficultyLabel = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #343a40;
`;

const DifficultyButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

const DifficultyButton = styled(Button)`
  background-color: ${(props) => (props.active ? '#0277bd' : '#e0e0e0')};
  color: ${(props) => (props.active ? 'white' : '#333')};
  width: 100%;
  
  &:hover {
    background-color: ${(props) => (props.active ? '#015d99' : '#d0d0d0')};
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

const NumberPad = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 0.5rem;
  margin-top: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    max-width: 300px;
  }
`;

const NumberButton = styled(Button)`
  background-color: #e0e0e0;
  color: #333;
  padding: 0.75rem;
  font-size: 1.2rem;
  
  &:hover {
    background-color: #d0d0d0;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 1rem;
  }
`;

const EraseButton = styled(Button)`
  background-color: #f44336;
  color: white;
  width: 100%;
  margin-top: 0.5rem;
  
  &:hover {
    background-color: #d32f2f;
  }
`;

const TimerContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

const Timer = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0.5rem;
  background-color: #f8f9fa;
  border-radius: 5px;
  text-align: center;
`;

const SudokuGame = () => {
  const [board, setBoard] = useState(Array(9).fill().map(() => Array(9).fill('')));
  const [solution, setSolution] = useState(Array(9).fill().map(() => Array(9).fill('')));
  const [originalBoard, setOriginalBoard] = useState(Array(9).fill().map(() => Array(9).fill(false)));
  const [selectedCell, setSelectedCell] = useState(null);
  const [highlightedCells, setHighlightedCells] = useState([]);
  const [difficulty, setDifficulty] = useState('medium');
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
        text: `New ${difficulty} puzzle generated!`,
        isError: false,
        show: true
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
  
  // When difficulty changes, generate a new puzzle
  useEffect(() => {
    if (timerActive) {
      // Only generate a new puzzle if we're already playing
      const confirmed = window.confirm('Do you want to start a new game with this difficulty?');
      if (confirmed) {
        generatePuzzle();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  const handleCellClick = (row, col) => {
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
  };

  const handleNumberInput = (number) => {
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
      
      // Check if the value is correct according to the solution
      if (numberValue !== solution[row][col].toString()) {
        newErrors.add(errorKey);
      } else {
        newErrors.delete(errorKey);
      }
    }
    
    setBoard(newBoard);
    setErrors(newErrors);
    
    // Check if the game is complete
    checkCompletion(newBoard);
  };

  const checkCompletion = (currentBoard) => {
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
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const newGame = () => {
    generatePuzzle();
  };

  const checkPuzzle = () => {
    let hasErrors = false;
    const newErrors = new Set();
    
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] !== '' && board[i][j] !== solution[i][j].toString()) {
          newErrors.add(`${i}-${j}`);
          hasErrors = true;
        }
      }
    }
    
    setErrors(newErrors);
    
    if (hasErrors) {
      setMessage({
        text: 'There are errors in your solution. Check the highlighted cells.',
        isError: true,
        show: true
      });
    } else {
      setMessage({
        text: 'Looking good so far!',
        isError: false,
        show: true
      });
    }
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
      <Title>Sudoku Game</Title>
      
      <GameLayout>
        <LeftPanel>
          <TimerContainer>
            <Timer>Time: {formatTime(time)}</Timer>
          </TimerContainer>
          
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
          
          <Message show={message.show} error={message.isError}>
            {message.text}
          </Message>
        </LeftPanel>
        
        <RightPanel>
          <DifficultySelector>
            <DifficultyLabel>Difficulty</DifficultyLabel>
            <DifficultyButtonGroup>
              <DifficultyButton 
                active={difficulty === 'easy'} 
                onClick={() => setDifficulty('easy')}
                disabled={isLoading}
              >
                Easy
              </DifficultyButton>
              <DifficultyButton 
                active={difficulty === 'medium'} 
                onClick={() => setDifficulty('medium')}
                disabled={isLoading}
              >
                Medium
              </DifficultyButton>
              <DifficultyButton 
                active={difficulty === 'hard'} 
                onClick={() => setDifficulty('hard')}
                disabled={isLoading}
              >
                Hard
              </DifficultyButton>
            </DifficultyButtonGroup>
          </DifficultySelector>
          
          <NumberPad>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <NumberButton 
                key={num} 
                onClick={() => handleNumberInput(num)} 
                disabled={isLoading || !selectedCell}
              >
                {num}
              </NumberButton>
            ))}
          </NumberPad>
          
          <EraseButton 
            onClick={() => handleNumberInput('')} 
            disabled={isLoading || !selectedCell}
          >
            Erase
          </EraseButton>
          
          <ButtonContainer>
            <ActionButton 
              onClick={newGame} 
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'New Game'}
            </ActionButton>
            <ActionButton 
              onClick={checkPuzzle} 
              disabled={gameComplete || isLoading}
            >
              Check
            </ActionButton>
          </ButtonContainer>
        </RightPanel>
      </GameLayout>
    </GameContainer>
  );
};

export default SudokuGame; 