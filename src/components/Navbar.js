import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background-color: transparent;
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;

  @media (max-width: 768px) {
    padding: 1rem;
    justify-content: space-between;
    position: relative;
  }
`;

const DesktopNavLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileDrawer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    right: ${props => props.isOpen ? '0' : '-300px'};
    width: 280px;
    height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
    transition: right 0.3s ease-in-out;
    z-index: 1000;
    padding: 2rem 0;
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 2rem 0;
`;

const Overlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    transition: opacity 0.3s ease-in-out;
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
    padding: 1rem 2rem;
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 1.1rem;
    
    &:after {
      display: none;
    }
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
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
  z-index: 1001;

  @media (max-width: 768px) {
    display: block;
  }
`;

const CloseButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  padding: 0.5rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 1001;

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

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <NavbarContainer>
        <MenuButton onClick={toggleMenu}>
          ☰
        </MenuButton>

        <DesktopNavLinks>
          <NavLink to="/" active={location.pathname === '/' ? 1 : 0}>
            Solver
          </NavLink>
          <NavLink to="/game" active={location.pathname === '/game' ? 1 : 0}>
            Play Game
          </NavLink>
          <NavLink to="/how-to-play" active={location.pathname === '/how-to-play' ? 1 : 0}>
            How to Play
          </NavLink>
          <NavLink to="/about" active={location.pathname === '/about' ? 1 : 0}>
            About
          </NavLink>
        </DesktopNavLinks>
      </NavbarContainer>

      <Overlay isOpen={menuOpen} onClick={closeMenu} />

      <MobileDrawer isOpen={menuOpen}>
        <CloseButton onClick={closeMenu}>
          ✕
        </CloseButton>

        <MobileNavLinks>
          <NavLink to="/" active={location.pathname === '/' ? 1 : 0} onClick={closeMenu}>
            Solver
          </NavLink>
          <NavLink to="/game" active={location.pathname === '/game' ? 1 : 0} onClick={closeMenu}>
            Play Game
          </NavLink>
          <NavLink to="/how-to-play" active={location.pathname === '/how-to-play' ? 1 : 0} onClick={closeMenu}>
            How to Play
          </NavLink>
          <NavLink to="/about" active={location.pathname === '/about' ? 1 : 0} onClick={closeMenu}>
            About
          </NavLink>
        </MobileNavLinks>
      </MobileDrawer>
    </>
  );
};

export default Navbar; 