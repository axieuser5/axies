import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { AxieAgentContainer } from './components/ContainerScroll';
import ComingSoon from './components/ComingSoon';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingChatbot from './components/FloatingChatbot';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <AxieAgentContainer />
                <ComingSoon />
                <Services />
                <About />
                <Contact />
              </>
            } />
          </Routes>
          <Footer />
          <FloatingChatbot />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 