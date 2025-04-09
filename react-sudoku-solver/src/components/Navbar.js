import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background-color: #343a40;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 700;
  
  &:hover {
    color: #f8f9fa;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
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
`;

const Navbar = () => {
  const location = useLocation();
  
  return (
    <NavbarContainer>
      <Logo to="/">Sudoku Solver</Logo>
      <NavLinks>
        <NavLink to="/" active={location.pathname === '/' ? 1 : 0}>
          Solver
        </NavLink>
        <NavLink to="/about" active={location.pathname === '/about' ? 1 : 0}>
          About
        </NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar; 