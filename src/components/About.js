import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const AboutContainer = styled.div`
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
    margin: 0;
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

const About = () => {
  return (
    <AboutContainer>
      <Title>About</Title>

      <Section>
        <SectionTitle>Hi, I'm Hilal!</SectionTitle>
        <Paragraph>
          I'm an aspiring software developer who built this Sudoku app to showcase my skills. Thanks for checking it out!
        </Paragraph>
      </Section>
      <Section>
        <SectionTitle>Built With</SectionTitle>
        <Paragraph>
          React, Python Flask, and deployed on Vercel.
        </Paragraph>
      </Section>

      <ButtonContainer>
        <Button to="/">Try Solver</Button>
        <GreenButton to="/game">Play Game</GreenButton>
      </ButtonContainer>
    </AboutContainer>
  );
};

export default About; 