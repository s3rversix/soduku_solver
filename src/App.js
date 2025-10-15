import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import SudokuSolver from './components/SudokuSolver';
import SudokuGame from './components/SudokuGame';
import About from './components/About';
import HowToPlay from './components/HowToPlay';
import Navbar from './components/Navbar';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Roboto', sans-serif;
`;

const Footer = styled.footer`
  background-color: transparent;
  color: white;
  text-align: center;
  padding: 1rem 0;
  margin-top: auto;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Navbar />
        <Routes>
          <Route path="/" element={<SudokuSolver />} />
          <Route path="/game" element={<SudokuGame />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-to-play" element={<HowToPlay />} />
        </Routes>
        <Footer>
          <p>Made by Hilal</p>
        </Footer>
      </AppContainer>
    </Router>
  );
}

export default App; 