// src/pages/Chatbot.tsx
import React, { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useAppState } from '../context/AppStateContext';
import LogoPlaceholder from '../components/common/LogoPlaceholder';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import FloatingLanguageSelector from '../components/common/FloatingLanguageSelector';
import '../styles/pages/Chatbot.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface QuickQuestion {
  id: string;
  text: string;
}

const Chatbot: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentLanguage } = useAppState();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    text: t('chatbot.greeting'),
    sender: 'bot',
    timestamp: new Date()
  }]);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const quickQuestions: QuickQuestion[] = [
    { id: 'breakfast', text: t('chatbot.quickQuestions.breakfast') },
    { id: 'airport', text: t('chatbot.quickQuestions.airport') },
    { id: 'fitness', text: t('chatbot.quickQuestions.fitness') },
    { id: 'wifi', text: t('chatbot.quickQuestions.wifi') }
  ];

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e?: FormEvent): Promise<void> => {
    if (e) e.preventDefault();
    
    if (!currentMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: currentMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setLoading(true);
    
    // Here you would call your AI API endpoint
    // In a real app, you would call an API to get a response
    // For now, we'll simulate a delay and response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `I understand you're asking about "${currentMessage}". Let me help you with that...`,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question: string): void => {
    setCurrentMessage(question);
    
    // Set timeout to allow the state update to complete
    setTimeout(() => {
      handleSendMessage();
    }, 0);
  };

  return (
    <div className="container">
      <FloatingLanguageSelector />
      
      <div className="logo-area">
        <LogoPlaceholder />
        <h1 className="heading-primary">{t('chatbot.title')}</h1>
        <p className="help-text text-center">{t('chatbot.aiAssistant')}</p>
      </div>
      
      <div className="card chat-container">
        <div className="chat-messages" id="chat-messages">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`message message-${message.sender}`}
            >
              {message.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <form className="chat-input-container" onSubmit={handleSendMessage}>
          <input 
            type="text" 
            className="chat-input" 
            id="user-message" 
            placeholder={t('chatbot.inputPlaceholder')}
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <button 
            className="send-button" 
            type="submit"
            disabled={loading || !currentMessage.trim()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
        
        <div className="quick-questions">
          {quickQuestions.map(question => (
            <div 
              key={question.id}
              className="quick-question"
              onClick={() => handleQuickQuestion(question.text)}
            >
              {question.text}
            </div>
          ))}
        </div>
      </div>
      
      <Button variant="text" onClick={() => navigate('/home')}>
        ← {t('common.backHome')}
      </Button>
      
      <Footer />
    </div>
  );
};

export default Chatbot;