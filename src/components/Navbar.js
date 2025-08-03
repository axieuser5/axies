import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;
  padding: 1rem 0;
  transition: all 0.3s ease;
`;

const NavContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  
  .logo-icon {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
  }
  
  .logo-text {
    color: white;
    font-weight: 700;
    font-size: 1.25rem;
    letter-spacing: -0.02em;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
  align-items: center;

  @media (max-width: 1024px) {
    position: fixed;
    left: ${props => props.isOpen ? '0' : '-100%'};
    top: 80px;
    flex-direction: column;
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(20px);
    width: 100%;
    text-align: center;
    transition: left 0.3s ease;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 2rem 0;
    gap: 1.5rem;
  }
`;

const NavItem = styled(motion.li)`
  position: relative;
`;

const NavLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
  padding: 0.5rem 0;

  &:hover {
    color: white;
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  &.active {
    color: white;
  }

  &.active::after {
    width: 100%;
  }
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
  }

  @media (max-width: 1024px) {
    margin-top: 1rem;
  }
`;

const Hamburger = styled.button`
  display: none;
  flex-direction: column;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0.5rem;

  @media (max-width: 1024px) {
    display: flex;
  }
`;

const Bar = styled.span`
  width: 24px;
  height: 2px;
  background-color: white;
  margin: 2px 0;
  transition: 0.3s ease;
  transform-origin: center;

  ${props => props.isOpen && `
    &:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    &:nth-child(2) {
      opacity: 0;
    }
    &:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }
  `}
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hem');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hem', 'axie-agent', 'coming-soon', 'tjanster', 'om-oss', 'kontakt'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
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
    { id: 'hem', label: 'Home' },
    { id: 'axie-agent', label: 'Agent' },
    { id: 'coming-soon', label: 'Builder' },
    { id: 'tjanster', label: 'Features' },
    { id: 'om-oss', label: 'About' },
    { id: 'kontakt', label: 'Contact' }
  ];

  return (
    <NavContainer
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
          <div className="logo-icon">A</div>
          <div className="logo-text">Axie Studio</div>
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
                className={activeSection === item.id ? 'active' : ''}
                onClick={(e) => handleNavClick(e, `#${item.id}`)}
              >
                {item.label}
              </NavLink>
            </NavItem>
          ))}
          
          <CTAButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </CTAButton>
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