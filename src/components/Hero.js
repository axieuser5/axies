import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaRobot, FaClock, FaChartLine } from 'react-icons/fa';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, ${props => props.theme.colors.gradient.start} 0%, ${props => props.theme.colors.gradient.end} 100%);
  padding: 120px 0 80px 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    pointer-events: none;
  }
`;

const HeroContainer = styled.div`
  max-width: ${props => props.theme.breakpoints.wide};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  display: grid;
  grid-template-columns: 2fr 1fr; /* 2:1 Grid Design */
  gap: ${props => props.theme.spacing.xxxl};
  align-items: center;
  position: relative;
  z-index: 2;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
    text-align: center;
  }
`;

const HeroContent = styled.div`
  color: ${props => props.theme.colors.text.light};
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: ${props => props.theme.fonts.weights.bold};
  line-height: 1.2;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Highlight = styled.span`
  background: linear-gradient(45deg, ${props => props.theme.colors.secondary}, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroDescription = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: ${props => props.theme.spacing.xl};
  opacity: 0.9;
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const Button = styled(motion.button)`
  padding: 12px 24px;
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.fonts.weights.semibold};
  font-size: 1rem;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.normal};
  text-decoration: none;
  display: inline-block;

  ${props => props.variant === 'primary' && `
    background: linear-gradient(45deg, ${props.theme.colors.secondary}, #f59e0b);
    color: white;
  `}

  ${props => props.variant === 'secondary' && `
    background: transparent;
    color: white;
    border: 2px solid white;
  `}

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.variant === 'primary' 
      ? `0 10px 25px rgba(251, 191, 36, 0.3)` 
      : 'none'};
  }
`;

const HeroFeatures = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.spacing.xl};
  flex-wrap: wrap;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    justify-content: center;
  }
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  font-size: 0.9rem;
  opacity: 0.9;

  svg {
    color: ${props => props.theme.colors.secondary};
  }
`;

const HeroDemo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChatbotContainer = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.md};
  box-shadow: ${props => props.theme.shadows.xl};
  width: 100%;
  max-width: 400px;
  animation: float 6s ease-in-out infinite;

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
`;

const ChatbotIframe = styled.iframe`
  border-radius: ${props => props.theme.borderRadius.lg};
  width: 100%;
  height: 500px;
  border: none;
`;

const Hero = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const features = [
    { icon: FaRobot, text: 'AI-Powered Chatbots' },
    { icon: FaClock, text: '24/7 Tillgänglighet' },
    { icon: FaChartLine, text: 'Förbättrad Effektivitet' }
  ];

  return (
    <HeroSection id="hem">
      <HeroContainer ref={ref}>
        <HeroContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <HeroTitle variants={itemVariants}>
              Revolutionera din <Highlight>Kundservice</Highlight> med AI
            </HeroTitle>
            
            <HeroDescription variants={itemVariants}>
              Axie Studio erbjuder avancerade chatbot- och AI-agentlösningar som förbättrar din kundservice genom att använda företagsinformation för att leverera personliga och effektiva svar. Våra AI-agenter är designade för att förstå dina kunders behov och ge snabba, precisa svar dygnet runt.
            </HeroDescription>

            <HeroButtons variants={itemVariants}>
              <Button
                variant="primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Kom Igång
              </Button>
              <Button
                variant="secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Se Demo
              </Button>
            </HeroButtons>

            <HeroFeatures variants={itemVariants}>
              {features.map((feature, index) => (
                <Feature key={index}>
                  <feature.icon />
                  <span>{feature.text}</span>
                </Feature>
              ))}
            </HeroFeatures>
          </motion.div>
        </HeroContent>

        <HeroDemo>
          <ChatbotContainer
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ChatbotIframe
              src="https://chatbotex1.netlify.app"
              title="Axie Studio Chatbot Demo"
              allow="microphone; camera"
            />
          </ChatbotContainer>
        </HeroDemo>
      </HeroContainer>
    </HeroSection>
  );
};

export default Hero; 