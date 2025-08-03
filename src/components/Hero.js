import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaPlay, FaArrowRight, FaCode, FaRocket, FaBolt } from 'react-icons/fa';

const HeroSection = styled.section`
  min-height: 100vh;
  position: relative;
  background: #0a0a0a;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 120px 0 0 0;
`;

const BackgroundGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 50px 50px;
  mask: radial-gradient(ellipse 100% 100% at 50% 0%, black 40%, transparent 100%);
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.15), transparent),
              radial-gradient(ellipse 60% 50% at 50% 100%, rgba(255, 119, 198, 0.1), transparent);
  pointer-events: none;
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

const FloatingOrb = styled(motion.div)`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background: ${props => props.gradient};
  filter: blur(40px);
  opacity: 0.4;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 4rem;
  align-items: center;
  min-height: 80vh;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
`;

const ContentSection = styled.div`
  color: white;
  max-width: 600px;

  @media (max-width: 1024px) {
    max-width: none;
    margin: 0 auto;
  }
`;

const AnnouncementBadge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }

  .badge-icon {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #10b981;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const MainHeading = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  
  background: linear-gradient(
    135deg,
    #ffffff 0%,
    #ffffff 40%,
    #a78bfa 60%,
    #06b6d4 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SubHeading = styled(motion.p)`
  font-size: 1.25rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2.5rem;
  font-weight: 400;
  max-width: 540px;

  @media (max-width: 1024px) {
    max-width: none;
  }
`;

const CTASection = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const PrimaryButton = styled(motion.button)`
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

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

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(99, 102, 241, 0.3);
  }
`;

const SecondaryButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.05);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const StatsSection = styled(motion.div)`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 640px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  backdrop-filter: blur(10px);

  .stat-icon {
    width: 20px;
    height: 20px;
    color: #10b981;
  }

  .stat-text {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
  }
`;

const DemoSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DemoContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 480px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 1.5rem;
  backdrop-filter: blur(20px);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3), rgba(6, 182, 212, 0.3));
    border-radius: 21px;
    z-index: -1;
    opacity: 0.6;
  }
`;

const DemoHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const DemoTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;

  h3 {
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
  }

  .demo-badge {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.5rem;
    border-radius: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const DemoControls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const DemoButton = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  
  &.close { background: #ef4444; }
  &.minimize { background: #f59e0b; }
  &.maximize { background: #10b981; }
`;

const IframeContainer = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: #000;
  height: 400px;

  @media (max-width: 640px) {
    height: 300px;
  }
`;

const DemoIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: inherit;
`;

const LoadingOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border-radius: inherit;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid #6366f1;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Hero = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [isLoading, setIsLoading] = useState(true);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
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

  const floatingOrbs = [
    { size: 200, top: '10%', left: '5%', gradient: 'radial-gradient(circle, rgba(99, 102, 241, 0.4), rgba(99, 102, 241, 0.1))' },
    { size: 150, top: '60%', right: '10%', gradient: 'radial-gradient(circle, rgba(139, 92, 246, 0.4), rgba(139, 92, 246, 0.1))' },
    { size: 100, top: '30%', right: '30%', gradient: 'radial-gradient(circle, rgba(6, 182, 212, 0.4), rgba(6, 182, 212, 0.1))' },
  ];

  const stats = [
    { icon: FaBolt, text: '99.9% Uptime' },
    { icon: FaRocket, text: 'Sub-100ms Response' },
    { icon: FaCode, text: 'Enterprise Ready' }
  ];

  return (
    <HeroSection id="hem">
      <BackgroundGrid />
      <GradientOverlay />
      
      <FloatingElements>
        {floatingOrbs.map((orb, index) => (
          <FloatingOrb
            key={index}
            size={orb.size}
            gradient={orb.gradient}
            style={{
              top: orb.top,
              left: orb.left,
              right: orb.right,
              y
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </FloatingElements>

      <Container>
        <HeroGrid ref={ref}>
          <ContentSection>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <AnnouncementBadge variants={itemVariants}>
                <div className="badge-icon" />
                <span>New: Advanced AI Agent Builder</span>
                <FaArrowRight size={12} />
              </AnnouncementBadge>

              <MainHeading variants={itemVariants}>
                Build AI Agents That Actually Work
              </MainHeading>

              <SubHeading variants={itemVariants}>
                Create sophisticated AI-powered customer service agents with our visual builder. 
                No code required. Enterprise-grade reliability. Deploy in minutes, not months.
              </SubHeading>

              <CTASection variants={itemVariants}>
                <PrimaryButton
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start Building Free
                  <FaArrowRight />
                </PrimaryButton>
                
                <SecondaryButton
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaPlay />
                  Watch Demo
                </SecondaryButton>
              </CTASection>

              <StatsSection variants={itemVariants}>
                {stats.map((stat, index) => (
                  <StatItem key={index}>
                    <stat.icon className="stat-icon" />
                    <span className="stat-text">{stat.text}</span>
                  </StatItem>
                ))}
              </StatsSection>
            </motion.div>
          </ContentSection>

          <DemoSection>
            <DemoContainer
              initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
              animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.8, rotateY: 15 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ scale: 1.02, rotateY: -2 }}
            >
              <DemoHeader>
                <DemoTitle>
                  <h3>Axie Agent</h3>
                  <div className="demo-badge">Live</div>
                </DemoTitle>
                <DemoControls>
                  <DemoButton className="close" />
                  <DemoButton className="minimize" />
                  <DemoButton className="maximize" />
                </DemoControls>
              </DemoHeader>

              <IframeContainer>
                <DemoIframe
                  src="https://chatbotex1.netlify.app"
                  title="Axie Studio AI Agent Demo"
                  allow="microphone; camera"
                />
                
                {isLoading && (
                  <LoadingOverlay
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                  >
                    <LoadingSpinner />
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.875rem' }}>
                      Loading AI Agent...
                    </p>
                  </LoadingOverlay>
                )}
              </IframeContainer>
            </DemoContainer>
          </DemoSection>
        </HeroGrid>
      </Container>
    </HeroSection>
  );
};

export default Hero;