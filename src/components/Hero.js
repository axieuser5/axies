import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaRobot, FaClock, FaChartLine, FaArrowRight } from 'react-icons/fa';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%);
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
    background: 
      radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    pointer-events: none;
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingOrb = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.gradient};
  filter: blur(1px);
  opacity: 0.6;
`;

const HeroContainer = styled.div`
  max-width: ${props => props.theme.breakpoints.wide};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  display: grid;
  grid-template-columns: 2fr 1fr;
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
  color: white;
  position: relative;
`;

const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: ${props => props.theme.spacing.lg};
  background: linear-gradient(135deg, #ffffff 0%, #a78bfa 50%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 40px rgba(167, 139, 250, 0.3);
`;

const Highlight = styled.span`
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #fbbf24, #f59e0b, #ec4899);
    border-radius: 2px;
    opacity: 0.6;
  }
`;

const HeroDescription = styled(motion.p)`
  font-size: 1.25rem;
  line-height: 1.7;
  margin-bottom: ${props => props.theme.spacing.xl};
  opacity: 0.9;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 300;
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

const ModernButton = styled(motion.button)`
  padding: 16px 32px;
  border: none;
  border-radius: 16px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  ${props => props.variant === 'primary' && `
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #ec4899 100%);
    color: white;
    box-shadow: 0 8px 25px rgba(251, 191, 36, 0.3);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }
    
    &:hover::before {
      left: 100%;
    }
  `}

  ${props => props.variant === 'secondary' && `
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.3);
    }
  `}

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
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

const Feature = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  font-size: 0.95rem;
  opacity: 0.9;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }

  svg {
    color: #fbbf24;
    font-size: 1.1rem;
  }
`;

const HeroDemo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ChatbotContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  padding: ${props => props.theme.spacing.lg};
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  width: 100%;
  max-width: 420px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(167, 139, 250, 0.3), rgba(6, 182, 212, 0.3));
    border-radius: 26px;
    z-index: -1;
    opacity: 0.7;
  }
`;

const ChatbotHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.md};
  padding-bottom: ${props => props.theme.spacing.sm};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ChatbotTitle = styled.h3`
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const ChatbotIframe = styled.iframe`
  border-radius: 16px;
  width: 100%;
  height: 480px;
  border: none;
  background: rgba(0, 0, 0, 0.2);
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
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const features = [
    { icon: FaRobot, text: 'AI-Powered Chatbots' },
    { icon: FaClock, text: '24/7 Tillgänglighet' },
    { icon: FaChartLine, text: 'Förbättrad Effektivitet' }
  ];

  const floatingOrbs = [
    { size: 60, top: '10%', left: '10%', gradient: 'linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(245, 158, 11, 0.3))' },
    { size: 80, top: '70%', right: '15%', gradient: 'linear-gradient(135deg, rgba(167, 139, 250, 0.3), rgba(139, 92, 246, 0.3))' },
    { size: 40, top: '30%', right: '25%', gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(14, 165, 233, 0.3))' },
  ];

  return (
    <HeroSection id="hem">
      <FloatingElements>
        {floatingOrbs.map((orb, index) => (
          <FloatingOrb
            key={index}
            gradient={orb.gradient}
            style={{
              width: orb.size,
              height: orb.size,
              top: orb.top,
              left: orb.left,
              right: orb.right,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 6 + index * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </FloatingElements>

      <HeroContainer ref={ref}>
        <HeroContent>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <GlassCard variants={itemVariants}>
              <HeroTitle variants={itemVariants}>
                Revolutionera din <Highlight>Kundservice</Highlight> med AI
              </HeroTitle>
              
              <HeroDescription variants={itemVariants}>
                Axie Studio erbjuder avancerade chatbot- och AI-agentlösningar som förbättrar din kundservice genom att använda företagsinformation för att leverera personliga och effektiva svar. Våra AI-agenter är designade för att förstå dina kunders behov och ge snabba, precisa svar dygnet runt.
              </HeroDescription>
            </GlassCard>

            <HeroButtons variants={itemVariants}>
              <ModernButton
                variant="primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Kom Igång
                <FaArrowRight />
              </ModernButton>
              <ModernButton
                variant="secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Se Demo
              </ModernButton>
            </HeroButtons>

            <HeroFeatures variants={itemVariants}>
              {features.map((feature, index) => (
                <Feature
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <feature.icon />
                  <span>{feature.text}</span>
                </Feature>
              ))}
            </HeroFeatures>
          </motion.div>
        </HeroContent>

        <HeroDemo>
          <ChatbotContainer
            initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
            animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.8, rotateY: 15 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ scale: 1.02, rotateY: -2 }}
          >
            <ChatbotHeader>
              <ChatbotTitle>Axie Studio AI</ChatbotTitle>
              <StatusDot />
            </ChatbotHeader>
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