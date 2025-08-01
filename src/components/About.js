import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutSection = styled.section`
  padding: ${props => props.theme.spacing.xxxl} 0;
  background: ${props => props.theme.colors.background.primary};
`;

const Container = styled.div`
  max-width: ${props => props.theme.breakpoints.wide};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xxxl};
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
  }
`;

const AboutText = styled.div`
  h2 {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: ${props => props.theme.fonts.weights.bold};
    margin-bottom: ${props => props.theme.spacing.lg};
    color: ${props => props.theme.colors.text.primary};
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: ${props => props.theme.colors.text.secondary};
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

const AboutStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Stat = styled(motion.div)`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.background.secondary};
  border-radius: ${props => props.theme.borderRadius.lg};
  transition: transform ${props => props.theme.transitions.normal};

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    font-size: 2.5rem;
    font-weight: ${props => props.theme.fonts.weights.bold};
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  p {
    color: ${props => props.theme.colors.text.secondary};
    font-weight: ${props => props.theme.fonts.weights.medium};
    margin: 0;
  }
`;

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const stats = [
    { value: 95, label: 'Kundnöjdhet', suffix: '%' },
    { value: 24, label: 'Tillgänglighet', suffix: '/7' },
    { value: 60, label: 'Kostnadsbesparing', suffix: '%' }
  ];

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

  return (
    <AboutSection id="om-oss">
      <Container ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <AboutContent>
            <AboutText>
              <motion.div variants={itemVariants}>
                <h2>Om Axie Studio</h2>
                <p>
                  Axie Studio är en ledande leverantör av AI-drivena kundservicelösningar. 
                  Vi kombinerar avancerad maskininlärning med djup förståelse för kundbehov 
                  för att skapa chatbot- och AI-agentlösningar som verkligen gör skillnad.
                </p>
                <p>
                  Våra lösningar är byggda på den senaste AI-tekniken och kan anpassas 
                  efter dina specifika behov och företagsinformation.
                </p>
              </motion.div>
            </AboutText>

            <AboutStats>
              {stats.map((stat, index) => (
                <Stat
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <h3>
                    {inView && (
                      <CountUp
                        end={stat.value}
                        duration={2}
                        delay={index * 0.2}
                      />
                    )}
                    {stat.suffix}
                  </h3>
                  <p>{stat.label}</p>
                </Stat>
              ))}
            </AboutStats>
          </AboutContent>
        </motion.div>
      </Container>
    </AboutSection>
  );
};

// Simple CountUp component since we don't have the actual library
const CountUp = ({ end, duration, delay }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const increment = end / (duration * 60); // 60fps
      let current = 0;
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, 1000 / 60);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [end, duration, delay]);

  return count;
};

export default About; 