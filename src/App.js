import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import SudokuSolver from './components/SudokuSolver';
import About from './components/About';
import Navbar from './components/Navbar';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  font-family: 'Roboto', sans-serif;
`;

const Footer = styled.footer`
  background-color: #343a40;
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
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer>
          <p>Made by Hilal</p>
        </Footer>
      </AppContainer>
    </Router>
  );
}

export default App; 