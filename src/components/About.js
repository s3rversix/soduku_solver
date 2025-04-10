import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 1rem auto;
  padding: 1.5rem;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    max-width: 100%;
    margin: 0.5rem;
    padding: 1rem;
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

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  color: #343a40;
  margin-bottom: 0.75rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.1rem;
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

const List = styled.ul`
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
  margin-bottom: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
  }
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

const About = () => {
  return (
    <AboutContainer>
      <Title>About Sudoku Master</Title>
      
      <Section>
        <SectionTitle>Who am I?</SectionTitle>
        <Paragraph>
          Hello! My name is Hilal, I am an aspiring software/web developer
          looking for opportunities to demonstrate my skills through multiple
          projects. Thank you for checking out Sudoku Master!
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>What is Sudoku Master?</SectionTitle>
        <Paragraph>
          Sudoku Master is a comprehensive web application that offers both a Sudoku solver and an interactive Sudoku game experience.
          This dual-functionality application provides users with the flexibility to either solve existing puzzles they're stuck on
          or enjoy playing new Sudoku puzzles with varying difficulty levels.
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>Features</SectionTitle>
        <List>
          <ListItem>
            <strong>Sudoku Solver:</strong> Upload any valid Sudoku puzzle and our powerful algorithm will solve it for you instantly.
          </ListItem>
          <ListItem>
            <strong>Interactive Sudoku Game:</strong> Play Sudoku puzzles with three difficulty levels (Easy, Medium, Hard).
          </ListItem>
          <ListItem>
            <strong>Real-time Validation:</strong> Get immediate feedback on your moves as you play.
          </ListItem>
          <ListItem>
            <strong>Timing and Progress Tracking:</strong> Monitor your progress with an integrated timer.
          </ListItem>
          <ListItem>
            <strong>Responsive Design:</strong> Enjoy a smooth experience on any device.
          </ListItem>
        </List>
      </Section>
      
      <Section>
        <SectionTitle>Technology Stack</SectionTitle>
        <Paragraph>
          This application is built using modern web technologies:
        </Paragraph>
        <List>
          <ListItem>
            <strong>Frontend:</strong> React, React Router, Styled Components
          </ListItem>
          <ListItem>
            <strong>Backend:</strong> Python Flask for the solving and puzzle generation algorithms
          </ListItem>
          <ListItem>
            <strong>Deployment:</strong> Vercel for both frontend and backend hosting
          </ListItem>
        </List>
      </Section>
      
      <ButtonContainer>
        <Button to="/">Try Solver</Button>
        <GreenButton to="/game">Play Game</GreenButton>
      </ButtonContainer>
    </AboutContainer>
  );
};

export default About; 