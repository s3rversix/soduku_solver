import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const AboutContainer = styled.div`
  max-width: 600px;
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
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  color: #343a40;
  margin-bottom: 0.75rem;
  font-weight: 600;
`;

const Paragraph = styled.p`
  color: #495057;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const BackButton = styled(Link)`
  display: block;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 600;
  margin-top: 1.5rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #0069d9;
    color: white;
  }
`;

const About = () => {
  return (
    <AboutContainer>
      <Title>About Me</Title>
      
      <Section>
        <SectionTitle>Who am I?</SectionTitle>
        <Paragraph>
          Hello my name is Hilal, I am an aspiring software/web developer
          looking for a chance to demonstrate my skills through multiple
          projects :D ENJOY SUDOKU SOLVER!!
        </Paragraph>
      </Section>
      
      <Section>
        <SectionTitle>What is this website?</SectionTitle>
        <Paragraph>
          This web application is designed to solve Sudoku boards recursively,
          regardless of the complexity of the puzzle. The frontend is built using
          React with styled-components for a modern look and feel. The backend,
          developed with Python Flask, processes the Sudoku inputs and calculates
          the correct placements to complete the board accurately.
        </Paragraph>
      </Section>
      
      <BackButton to="/">Back to Sudoku Solver</BackButton>
    </AboutContainer>
  );
};

export default About; 