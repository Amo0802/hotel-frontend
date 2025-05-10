import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppState } from '../context/AppStateContext';
import { changeLanguage } from '../i18n';
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
  const { t } = useTranslation();
  const { currentLanguage, setCurrentLanguage } = useAppState();
  const navigate = useNavigate();

  const handleLanguageSelect = (languageCode: string): void => {
    // Update app state
    setCurrentLanguage(languageCode);
    
    // Update i18next and localStorage
    changeLanguage(languageCode);
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
        <h1 className="heading-primary">{t('language.title')}</h1>
        
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
        
        <Button onClick={handleContinue}>{t('language.continue')}</Button>
      </Card>
      
      <Footer />
    </div>
  );
};

export default LanguageSelection;