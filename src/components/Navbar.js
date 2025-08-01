import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  padding: ${props => props.theme.spacing.md} 0;
  transition: all ${props => props.theme.transitions.normal};
  box-shadow: ${props => props.scrolled ? props.theme.shadows.md : 'none'};
`;

const NavContent = styled.div`
  max-width: ${props => props.theme.breakpoints.wide};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`;

const Logo = styled(motion.h2)`
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fonts.weights.bold};
  font-size: 1.5rem;
  cursor: pointer;
`;

const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    position: fixed;
    left: ${props => props.isOpen ? '0' : '-100%'};
    top: 70px;
    flex-direction: column;
    background-color: ${props => props.theme.colors.background.primary};
    width: 100%;
    text-align: center;
    transition: left ${props => props.theme.transitions.normal};
    box-shadow: ${props => props.theme.shadows.lg};
    padding: ${props => props.theme.spacing.xl} 0;
  }
`;

const NavItem = styled(motion.li)`
  position: relative;
`;

const NavLink = styled.a`
  color: ${props => props.theme.colors.text.primary};
  font-weight: ${props => props.theme.fonts.weights.medium};
  transition: color ${props => props.theme.transitions.normal};
  position: relative;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: ${props => props.theme.colors.primary};
    transition: width ${props => props.theme.transitions.normal};
  }

  &:hover::after {
    width: 100%;
  }
`;

const Hamburger = styled.button`
  display: none;
  flex-direction: column;
  cursor: pointer;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text.primary};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: flex;
  }
`;

const Bar = styled.span`
  width: 25px;
  height: 3px;
  background-color: ${props => props.theme.colors.text.primary};
  margin: 3px 0;
  transition: ${props => props.theme.transitions.normal};
  transform: ${props => props.isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'};

  &:nth-child(2) {
    opacity: ${props => props.isOpen ? '0' : '1'};
  }

  &:nth-child(3) {
    transform: ${props => props.isOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'};
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsOpen(false);
  };

  const navItems = [
    { id: 'hem', label: 'Hem' },
    { id: 'axie-agent', label: 'Axie Agent' },
    { id: 'coming-soon', label: 'Nytt Verktyg' },
    { id: 'tjanster', label: 'Tjänster' },
    { id: 'om-oss', label: 'Om Oss' },
    { id: 'kontakt', label: 'Kontakt' }
  ];

  return (
    <NavContainer
      scrolled={scrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NavContent>
        <Logo
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => handleNavClick(e, '#hem')}
        >
          Axie Studio
        </Logo>

        <NavMenu isOpen={isOpen}>
          {navItems.map((item, index) => (
            <NavItem
              key={item.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavLink
                onClick={(e) => handleNavClick(e, `#${item.id}`)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </NavLink>
            </NavItem>
          ))}
        </NavMenu>

        <Hamburger onClick={() => setIsOpen(!isOpen)}>
          <Bar isOpen={isOpen} />
          <Bar isOpen={isOpen} />
          <Bar isOpen={isOpen} />
        </Hamburger>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar; 