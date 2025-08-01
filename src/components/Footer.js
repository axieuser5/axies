import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaFacebook, FaGithub } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: ${props => props.theme.colors.background.dark};
  color: white;
  padding: 60px 0 20px;
`;

const Container = styled.div`
  max-width: ${props => props.theme.breakpoints.wide};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const FooterSection = styled.div`
  h3, h4 {
    margin-bottom: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.secondary};
  }

  p {
    color: #cbd5e1;
    line-height: 1.6;
  }

  ul {
    list-style: none;
  }

  ul li {
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  ul li a {
    color: #cbd5e1;
    text-decoration: none;
    transition: color ${props => props.theme.transitions.normal};

    &:hover {
      color: ${props => props.theme.colors.secondary};
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
`;

const SocialLink = styled(motion.a)`
  width: 40px;
  height: 40px;
  background: #334155;
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all ${props => props.theme.transitions.normal};

  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: ${props => props.theme.spacing.xl};
  border-top: 1px solid #334155;
  color: #cbd5e1;
`;

const Footer = () => {
  const footerSections = [
    {
      title: 'Axie Studio',
      content: 'AI-powered kundservicelösningar för moderna företag.',
      type: 'text'
    },
    {
      title: 'Tjänster',
      links: [
        { text: 'Chatbots', href: '#tjanster' },
        { text: 'AI-Agenter', href: '#tjanster' },
        { text: 'Kundservice', href: '#tjanster' }
      ],
      type: 'links'
    },
    {
      title: 'Företag',
      links: [
        { text: 'Om Oss', href: '#om-oss' },
        { text: 'Karriär', href: '#' },
        { text: 'Kontakt', href: '#kontakt' }
      ],
      type: 'links'
    },
    {
      title: 'Följ Oss',
      type: 'social'
    }
  ];

  const socialLinks = [
    { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FaFacebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: FaGithub, href: 'https://github.com', label: 'GitHub' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const renderSection = (section, index) => {
    switch (section.type) {
      case 'text':
        return (
          <FooterSection key={index}>
            <motion.h3 variants={itemVariants}>{section.title}</motion.h3>
            <motion.p variants={itemVariants}>{section.content}</motion.p>
          </FooterSection>
        );
      
      case 'links':
        return (
          <FooterSection key={index}>
            <motion.h4 variants={itemVariants}>{section.title}</motion.h4>
            <motion.ul variants={itemVariants}>
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a href={link.href}>{link.text}</a>
                </li>
              ))}
            </motion.ul>
          </FooterSection>
        );
      
      case 'social':
        return (
          <FooterSection key={index}>
            <motion.h4 variants={itemVariants}>{section.title}</motion.h4>
            <SocialLinks>
              {socialLinks.map((social, socialIndex) => (
                <SocialLink
                  key={socialIndex}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon />
                </SocialLink>
              ))}
            </SocialLinks>
          </FooterSection>
        );
      
      default:
        return null;
    }
  };

  return (
    <FooterContainer>
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, threshold: 0.1 }}
        >
          <FooterContent>
            {footerSections.map((section, index) => renderSection(section, index))}
          </FooterContent>
        </motion.div>

        <FooterBottom>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            &copy; 2024 Axie Studio. Alla rättigheter förbehållna.
          </motion.p>
        </FooterBottom>
      </Container>
    </FooterContainer>
  );
};

export default Footer; 