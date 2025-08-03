import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes, FaExpand, FaCompress } from 'react-icons/fa';

const FloatingContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  
  @media (max-width: 768px) {
    bottom: 15px;
    right: 15px;
  }
`;

const ChatButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
    border-radius: 50%;
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 35px rgba(99, 102, 241, 0.4);
  }

  @media (max-width: 768px) {
    width: 55px;
    height: 55px;
    font-size: 1.3rem;
  }
`;

const ChatWindow = styled(motion.div)`
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 380px;
  height: 600px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: calc(100vw - 30px);
    height: 500px;
    bottom: 75px;
    right: -15px;
  }

  @media (max-width: 480px) {
    height: 450px;
  }
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
  }
`;

const ChatTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  z-index: 1;

  .status-dot {
    width: 8px;
    height: 8px;
    background: #10b981;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  h4 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
  }

  p {
    font-size: 0.8rem;
    opacity: 0.9;
    margin: 0;
  }
`;

const ChatControls = styled.div`
  display: flex;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
`;

const ControlButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }
`;

const ChatContent = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
`;

const ChatIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  background: white;
`;

const LoadingOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const LoadingSpinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid rgba(99, 102, 241, 0.1);
  border-top: 3px solid #6366f1;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const NotificationBadge = styled(motion.div)`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 20px;
  height: 20px;
  background: #ef4444;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  border: 2px solid white;
`;

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNotification, setHasNotification] = useState(true);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNotification(false);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleIframeLoad = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const chatWindowVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transformOrigin: 'bottom right'
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transformOrigin: 'bottom right'
    },
    expanded: {
      opacity: 1,
      scale: 1,
      y: 0,
      width: '450px',
      height: '700px',
      transformOrigin: 'bottom right'
    }
  };

  return (
    <FloatingContainer>
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            variants={chatWindowVariants}
            initial="hidden"
            animate={isExpanded ? "expanded" : "visible"}
            exit="hidden"
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.3 
            }}
          >
            <ChatHeader>
              <ChatTitle>
                <div>
                  <h4>Axie Assistant</h4>
                  <p>
                    <span className="status-dot"></span>
                    Online - Redo att hjälpa
                  </p>
                </div>
              </ChatTitle>
              <ChatControls>
                <ControlButton onClick={toggleExpanded}>
                  {isExpanded ? <FaCompress size={14} /> : <FaExpand size={14} />}
                </ControlButton>
                <ControlButton onClick={toggleChat}>
                  <FaTimes size={14} />
                </ControlButton>
              </ChatControls>
            </ChatHeader>
            
            <ChatContent>
              <ChatIframe
                src="https://chatbotex1.netlify.app"
                title="Axie Chatbot"
                allow="microphone *; camera *; geolocation *; autoplay; encrypted-media; fullscreen"
                sandbox="allow-scripts allow-forms allow-popups allow-presentation allow-same-origin"
                referrerPolicy="no-referrer"
                onLoad={handleIframeLoad}
              />
              
              {isLoading && (
                <LoadingOverlay
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <LoadingSpinner />
                  <p style={{ 
                    color: '#6366f1', 
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    margin: 0 
                  }}>
                    Startar chatbot...
                  </p>
                </LoadingOverlay>
              )}
            </ChatContent>
          </ChatWindow>
        )}
      </AnimatePresence>

      <ChatButton
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: hasNotification ? [1, 1.1, 1] : 1,
        }}
        transition={{
          scale: {
            duration: 2,
            repeat: hasNotification ? Infinity : 0,
            ease: "easeInOut"
          }
        }}
      >
        {isOpen ? <FaTimes /> : <FaComments />}
        
        {hasNotification && !isOpen && (
          <NotificationBadge
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            1
          </NotificationBadge>
        )}
      </ChatButton>
    </FloatingContainer>
  );
};

export default FloatingChatbot;