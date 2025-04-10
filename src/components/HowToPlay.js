import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HowToPlayContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #343a40;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 700;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #343a40;
  margin-bottom: 1rem;
  font-weight: 600;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;
`;

const SubsectionTitle = styled.h3`
  color: #343a40;
  margin: 1.25rem 0 0.75rem 0;
  font-weight: 600;
`;

const Paragraph = styled.p`
  color: #495057;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const List = styled.ol`
  color: #495057;
  line-height: 1.6;
  margin-bottom: 1rem;
  margin-left: 1.5rem;
`;

const UnorderedList = styled.ul`
  color: #495057;
  line-height: 1.6;
  margin-bottom: 1rem;
  margin-left: 1.5rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.75rem;
`;

const RuleHighlight = styled.div`
  background-color: #f8f9fa;
  border-left: 4px solid #0277bd;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 0 5px 5px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled(Link)`
  display: block;
  flex: 1;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 600;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #0069d9;
    color: white;
  }
`;

const GreenButton = styled(Button)`
  background-color: #28a745;
  
  &:hover {
    background-color: #218838;
  }
`;

const HowToPlay = () => {
  return (
    <HowToPlayContainer>
      <Title>How to Play Sudoku</Title>
      
      <Section>
        <SectionTitle>Basic Rules of Sudoku</SectionTitle>
        <Paragraph>
          Sudoku is a logic-based number placement puzzle. The objective is to fill a 9×9 grid with digits so that each column, each row, and each of the nine 3×3 subgrids (also called "boxes") contains all of the digits from 1 to 9.
        </Paragraph>
        
        <RuleHighlight>
          <strong>The Rules:</strong>
          <UnorderedList>
            <ListItem>Each row must contain the numbers 1-9 without repetition.</ListItem>
            <ListItem>Each column must contain the numbers 1-9 without repetition.</ListItem>
            <ListItem>Each of the nine 3×3 sub-boxes must contain the numbers 1-9 without repetition.</ListItem>
          </UnorderedList>
        </RuleHighlight>
        
        <Paragraph>
          The puzzle starts with some cells already filled with numbers. These are the "givens" or "clues." Your task is to fill in the rest of the grid while adhering to the three rules above.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>Solving Strategies</SectionTitle>
        
        <SubsectionTitle>1. Scanning</SubsectionTitle>
        <Paragraph>
          This involves checking each row, column, and 3×3 box to identify which numbers are missing and which positions are possible for each missing number.
        </Paragraph>
        
        <SubsectionTitle>2. Elimination</SubsectionTitle>
        <Paragraph>
          If a number already exists in a row, column, or box, then it cannot be placed in any other cell in that same row, column, or box.
        </Paragraph>
        
        <SubsectionTitle>3. Crosshatching</SubsectionTitle>
        <Paragraph>
          Look for cells where only one number can possibly go based on what numbers are already present in intersecting rows, columns, and boxes.
        </Paragraph>
        
        <SubsectionTitle>4. Trial and Error</SubsectionTitle>
        <Paragraph>
          For more difficult puzzles, you might need to make an educated guess and see if it leads to a solution or a contradiction.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>How to Use Our Sudoku Game</SectionTitle>
        <List>
          <ListItem>
            <strong>Select a difficulty:</strong> Choose from Easy, Medium, or Hard depending on your skill level.
          </ListItem>
          <ListItem>
            <strong>Click on an empty cell:</strong> This will select the cell you want to fill.
          </ListItem>
          <ListItem>
            <strong>Use the number pad:</strong> Click on one of the number buttons (1-9) to place that number in the selected cell.
          </ListItem>
          <ListItem>
            <strong>Erase a number:</strong> If you want to remove a number, select the cell and click the "Erase" button.
          </ListItem>
          <ListItem>
            <strong>Check your progress:</strong> Use the "Check" button to see if your current entries are correct.
          </ListItem>
          <ListItem>
            <strong>Start a new game:</strong> Click the "New Game" button to generate a fresh puzzle.
          </ListItem>
        </List>
        
        <Paragraph>
          <strong>Note:</strong> The timer at the top tracks how long you've been playing. Challenge yourself to improve your time as you get better!
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>Using the Sudoku Solver</SectionTitle>
        <Paragraph>
          If you're stuck on a puzzle and need help, you can use our Sudoku Solver:
        </Paragraph>
        
        <List>
          <ListItem>
            <strong>Enter the puzzle:</strong> Input the numbers of your puzzle into the grid. Leave empty cells blank.
          </ListItem>
          <ListItem>
            <strong>Solve:</strong> Click the "Solve Puzzle" button and watch as our algorithm finds the solution.
          </ListItem>
          <ListItem>
            <strong>Clear:</strong> To start over, use the "Clear Grid" button.
          </ListItem>
        </List>
        
        <Paragraph>
          Our solver uses an efficient backtracking algorithm that can tackle even the most challenging Sudoku puzzles.
        </Paragraph>
      </Section>
      
      <ButtonContainer>
        <Button to="/">Try Solver</Button>
        <GreenButton to="/game">Play Game</GreenButton>
      </ButtonContainer>
    </HowToPlayContainer>
  );
};

export default HowToPlay; 