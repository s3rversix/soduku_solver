import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HowToPlayContainer = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 1.5rem;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 768px) {
    max-width: calc(100% - 2rem);
    margin: 2rem auto;
    padding: 1rem;
    border-radius: 10px;
    position: relative;
    top: auto;
    left: auto;
    transform: none;
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

const Section = styled.div`
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  color: #343a40;
  margin-bottom: 1rem;
  font-weight: 600;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 0.75rem;
  }
`;


const Paragraph = styled.p`
  color: #495057;
  line-height: 1.6;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const List = styled.ol`
  color: #495057;
  line-height: 1.6;
  margin-bottom: 1rem;
  margin-left: 1.5rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-left: 1.2rem;
  }
`;


const ListItem = styled.li`
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;


const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }
`;

const Button = styled(Link)`
  display: block;
  flex: 1;
  padding: 0.75rem;
  background-color: #0277bd;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 600;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #015d99;
    color: white;
  }
`;

const GreenButton = styled(Button)`
  background-color: #0277bd;
  
  &:hover {
    background-color: #015d99;
  }
`;

const HowToPlay = () => {
  return (
    <HowToPlayContainer>
      <Title>How to Play Sudoku</Title>

      <Section>
        <SectionTitle>How to Play</SectionTitle>
        <List>
          <ListItem><strong>Select difficulty:</strong> Choose Easy, Medium, or Hard</ListItem>
          <ListItem><strong>Click a cell:</strong> Select where you want to place a number</ListItem>
          <ListItem><strong>Use arrow keys:</strong> Navigate between cells</ListItem>
          <ListItem><strong>Solve:</strong> Click "Solve" if you need help</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>Tips</SectionTitle>
        <Paragraph>
          Start with easy puzzles and look for cells where only one number can fit. Use elimination - if a number already exists in a row, column, or box, it can't be placed again in that same area.
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