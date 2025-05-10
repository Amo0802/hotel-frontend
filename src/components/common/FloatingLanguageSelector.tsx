// src/components/common/FloatingLanguageSelector.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage, getCurrentLanguage } from '../../i18n';
import { useAppState } from '../../context/AppStateContext';
import '../../styles/components/FloatingLanguageSelector.css';

interface Language {
  code: string;
  name: string;
  flag: string; // Emoji flag
}

const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' }
];

const FloatingLanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const { setCurrentLanguage } = useAppState();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentLangCode = getCurrentLanguage();
  const currentLanguage = LANGUAGES.find(lang => lang.code === currentLangCode) || LANGUAGES[0];
  
  const handleLanguageChange = (langCode: string): void => {
    // Change language in i18next and store in localStorage
    changeLanguage(langCode);
    
    // Update app state
    setCurrentLanguage(langCode);
    
    // Close dropdown
    setIsOpen(false);
  };
  
  return (
    <div className="floating-language-selector">
      <button 
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
      >
        <span className="language-flag">{currentLanguage.flag}</span>
      </button>
      
      {isOpen && (
        <div className="language-dropdown">
          <div className="language-dropdown-header">
            <span>Select Language</span>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div className="language-options">
            {LANGUAGES.map(language => (
              <div 
                key={language.code}
                className={`language-option ${currentLangCode === language.code ? 'active' : ''}`}
                onClick={() => handleLanguageChange(language.code)}
              >
                <span className="language-flag">{language.flag}</span>
                <span className="language-name">{language.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingLanguageSelector;