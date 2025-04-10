import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background-color: #343a40;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;

  @media (max-width: 768px) {
    padding: 1rem;
    flex-wrap: wrap;
  }
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 700;
  
  &:hover {
    color: #f8f9fa;
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    padding-top: 1rem;
    margin-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const NavLink = styled(Link)`
  color: ${(props) => (props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.75)')};
  text-decoration: none;
  font-weight: ${(props) => (props.active ? '600' : '400')};
  padding: 0.5rem 0;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: ${(props) => (props.active ? '100%' : '0')};
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: white;
    transition: width 0.2s ease-in-out;
  }
  
  &:hover {
    color: white;
    
    &:after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    padding: 0.6rem 0;
    width: 100%;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.3rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <NavbarContainer>
      <Logo to="/">Sudoku Master</Logo>
      
      <MenuButton onClick={toggleMenu}>
        {menuOpen ? '✕' : '☰'}
      </MenuButton>
      
      <NavLinks isOpen={menuOpen}>
        <NavLink to="/" active={location.pathname === '/' ? 1 : 0} onClick={() => setMenuOpen(false)}>
          Solver
        </NavLink>
        <NavLink to="/game" active={location.pathname === '/game' ? 1 : 0} onClick={() => setMenuOpen(false)}>
          Play Game
        </NavLink>
        <NavLink to="/how-to-play" active={location.pathname === '/how-to-play' ? 1 : 0} onClick={() => setMenuOpen(false)}>
          How to Play
        </NavLink>
        <NavLink to="/about" active={location.pathname === '/about' ? 1 : 0} onClick={() => setMenuOpen(false)}>
          About
        </NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar; 