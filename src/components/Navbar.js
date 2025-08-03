import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaTimes, FaBars } from 'react-icons/fa';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 0;
  transition: all 0.3s ease;
`;

const NavContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  
  .logo-image {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
  }
  
  .logo-text {
    color: #1e293b;
    font-weight: 700;
    font-size: 1.25rem;
    letter-spacing: -0.02em;
  }
`;

const DesktopMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const MenuItem = styled.div`
  position: relative;
`;

const MenuLink = styled.a`
  color: #64748b;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &:hover {
    color: #1e293b;
  }

  &.active {
    color: #6366f1;
    font-weight: 600;
  }
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  min-width: 280px;
  margin-top: 0.5rem;
  z-index: 1001;
`;

const DropdownItem = styled.a`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  &:hover {
    background: #f8fafc;
  }
`;

const DropdownIcon = styled.div`
  color: #6366f1;
  margin-top: 0.125rem;
`;

const DropdownContent = styled.div`
  flex: 1;
`;

const DropdownTitle = styled.div`
  font-weight: 600;
  color: #1e293b;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const DropdownDescription = styled.div`
  color: #64748b;
  font-size: 0.8rem;
  line-height: 1.4;
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const LoginButton = styled.button`
  background: none;
  border: none;
  color: #64748b;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    color: #1e293b;
    background: #f8fafc;
  }
`;

const SignupButton = styled(motion.button)`
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
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #64748b;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 1024px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 2rem;
  z-index: 999;
  max-height: calc(100vh - 70px);
  overflow-y: auto;
`;

const MobileMenuItem = styled.div`
  margin-bottom: 1.5rem;
`;

const MobileLinkGroup = styled.div`
  margin-bottom: 2rem;
`;

const MobileLinkTitle = styled.div`
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const MobileLink = styled.a`
  display: block;
  color: #64748b;
  font-weight: 500;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f1f5f9;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #6366f1;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const MobileAuthButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #f1f5f9;
`;

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const menuData = {
    logo: {
      src: "/logo.png",
      alt: "Axie Studio",
      title: "Axie Studio",
    },
    menu: [
      {
        title: "Hem",
        url: "#hem",
      },
      {
        title: "Lösningar",
        url: "#",
        items: [
          {
            title: "AI Chatbots",
            description: "Intelligenta chatbots för kundservice",
            icon: "🤖",
            url: "#tjanster",
          },
          {
            title: "AI Agenter",
            description: "Avancerade AI-agenter för företag",
            icon: "🧠",
            url: "#axie-agent",
          },
          {
            title: "Agent Builder",
            description: "Bygg dina egna AI-agenter visuellt",
            icon: "🛠️",
            url: "#coming-soon",
          },
        ],
      },
      {
        title: "Funktioner",
        url: "#tjanster",
      },
      {
        title: "Om Oss",
        url: "#om-oss",
      },
      {
        title: "Kontakt",
        url: "#kontakt",
      },
    ],
    auth: {
      login: { text: "Logga In", url: "/login" },
      signup: { text: "Kom Igång", url: "/signup" },
    },
  };

  return (
    <>
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
            <div className="logo-image">A</div>
            <div className="logo-text">{menuData.logo.title}</div>
          </Logo>

          <DesktopMenu>
            {menuData.menu.map((item, index) => (
              <MenuItem
                key={index}
                onMouseEnter={() => item.items && setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <MenuLink
                  className={activeSection === item.url.replace('#', '') ? 'active' : ''}
                  onClick={(e) => handleNavClick(e, item.url)}
                >
                  {item.title}
                  {item.items && <FaChevronDown size={12} />}
                </MenuLink>
                
                <AnimatePresence>
                  {item.items && activeDropdown === index && (
                    <DropdownMenu
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.items.map((subItem, subIndex) => (
                        <DropdownItem
                          key={subIndex}
                          onClick={(e) => handleNavClick(e, subItem.url)}
                        >
                          <DropdownIcon>{subItem.icon}</DropdownIcon>
                          <DropdownContent>
                            <DropdownTitle>{subItem.title}</DropdownTitle>
                            <DropdownDescription>{subItem.description}</DropdownDescription>
                          </DropdownContent>
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  )}
                </AnimatePresence>
              </MenuItem>
            ))}
          </DesktopMenu>

          <AuthButtons>
            <LoginButton>{menuData.auth.login.text}</LoginButton>
            <SignupButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {menuData.auth.signup.text}
            </SignupButton>
          </AuthButtons>

          <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </NavContent>
      </NavContainer>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {menuData.menu.map((item, index) => (
              <MobileMenuItem key={index}>
                {item.items ? (
                  <MobileLinkGroup>
                    <MobileLinkTitle>{item.title}</MobileLinkTitle>
                    {item.items.map((subItem, subIndex) => (
                      <MobileLink
                        key={subIndex}
                        onClick={(e) => handleNavClick(e, subItem.url)}
                      >
                        {subItem.icon} {subItem.title}
                      </MobileLink>
                    ))}
                  </MobileLinkGroup>
                ) : (
                  <MobileLink onClick={(e) => handleNavClick(e, item.url)}>
                    {item.title}
                  </MobileLink>
                )}
              </MobileMenuItem>
            ))}
            
            <MobileAuthButtons>
              <LoginButton style={{ width: '100%', textAlign: 'center' }}>
                {menuData.auth.login.text}
              </LoginButton>
              <SignupButton style={{ width: '100%' }}>
                {menuData.auth.signup.text}
              </SignupButton>
            </MobileAuthButtons>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;