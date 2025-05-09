// Component for language selection screen
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '../context/AppStateContext';
import LogoPlaceholder from '../components/common/LogoPlaceholder';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Footer from '../components/common/Footer';
import '../styles/pages/LanguageSelection.css';

interface Language {
  code: string;
  name: string;
}

const LANGUAGES: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' }
];

const LanguageSelection: React.FC = () => {
  const { currentLanguage, setCurrentLanguage } = useAppState();
  const navigate = useNavigate();

  const handleLanguageSelect = (languageCode: string): void => {
    setCurrentLanguage(languageCode);
  };

  const handleContinue = (): void => {
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="logo-area">
        <LogoPlaceholder />
      </div>
      
      <Card>
        <h1 className="heading-primary">Select Your Language</h1>
        
        <div className="language-selector">
          {LANGUAGES.map(language => (
            <div 
              key={language.code}
              className={`language-btn ${currentLanguage === language.code ? 'active' : ''}`}
              onClick={() => handleLanguageSelect(language.code)}
            >
              {language.name}
            </div>
          ))}
        </div>
        
        <Button onClick={handleContinue}>Continue</Button>
      </Card>
      
      <Footer />
    </div>
  );
};

export default LanguageSelection;