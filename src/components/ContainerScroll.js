import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import styled from "styled-components";

const SectionWrapper = styled.section`
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    pointer-events: none;
  }
`;

const ContainerWrapper = styled.div`
  height: 60rem;
  
  @media (min-width: 768px) {
    height: 80rem;
  }
  
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0.5rem;
  
  @media (min-width: 768px) {
    padding: 5rem;
  }
`;

const ContentWrapper = styled.div`
  padding: 2.5rem 0;
  
  @media (min-width: 768px) {
    padding: 10rem 0;
  }
  
  width: 100%;
  position: relative;
`;

const HeaderWrapper = styled(motion.div)`
  max-width: 80rem;
  margin: 0 auto;
  text-align: center;
`;

const CardWrapper = styled(motion.div)`
  max-width: 80rem;
  margin: -3rem auto 0;
  height: 30rem;
  
  @media (min-width: 768px) {
    height: 40rem;
  }
  
  width: 100%;
  border: 4px solid #6C6C6C;
  padding: 0.5rem;
  
  @media (min-width: 768px) {
    padding: 1.5rem;
  }
  
  background: #222222;
  border-radius: 30px;
  box-shadow: 0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003;
`;

const CardContent = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  border-radius: 1rem;
  background: #f3f4f6;
  
  @media (prefers-color-scheme: dark) {
    background: #18181b;
  }
  
  @media (min-width: 768px) {
    border-radius: 1rem;
    padding: 1rem;
  }
`;

const IframeWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  overflow: hidden;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: inherit;
  pointer-events: auto;
  scrolling: no;
`;

export const ContainerScroll = ({
  titleComponent,
  children,
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  // Completely remove all scroll transforms
  const rotate = 0;
  const scale = 1;
  const translate = 0;

  return (
    <SectionWrapper>
      <ContainerWrapper ref={containerRef}>
        <ContentWrapper
          style={{
            perspective: "1000px",
          }}
        >
          <Header translate={translate} titleComponent={titleComponent} />
          <Card rotate={rotate} translate={translate} scale={scale}>
            {children}
          </Card>
        </ContentWrapper>
      </ContainerWrapper>
    </SectionWrapper>
  );
};

export const Header = ({ translate, titleComponent }) => {
  return (
    <HeaderWrapper
    >
      {titleComponent}
    </HeaderWrapper>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}) => {
  return (
    <CardWrapper
    >
      <CardContent>
        {children}
      </CardContent>
    </CardWrapper>
  );
};

// Special component for the Axie Agent iframe
export const AxieAgentContainer = () => {
  return (
    <div id="axie-agent">
      <ContainerScroll
      titleComponent={
        <div style={{ color: 'white', marginBottom: '2rem' }}>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3rem)', 
            fontWeight: 'bold',
            marginBottom: '1rem',
            background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Upptäck Axie Agent
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Interagera med vår avancerade AI-agent som förstår och svarar på dina frågor 
            med hjälp av företagsinformation och kunskapsbas.
          </p>
        </div>
      }
    >
      <IframeWrapper>
        <StyledIframe
          src="https://axieagent.netlify.app"
          title="Axie Agent - AI Assistant"
          allow="microphone; camera; geolocation"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
          scrolling="no"
          style={{ overflow: 'hidden' }}
        />
      </IframeWrapper>
    </ContainerScroll>
    </div>
  );
};