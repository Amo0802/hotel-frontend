import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import language JSON files
import enTranslation from './locales/en.json';
import esTranslation from './locales/es.json';
import frTranslation from './locales/fr.json';
import deTranslation from './locales/de.json';
import zhTranslation from './locales/zh.json';
import jaTranslation from './locales/ja.json';

// Define the resources for each language
const resources = {
  en: {
    translation: enTranslation
  },
  es: {
    translation: esTranslation
  },
  fr: {
    translation: frTranslation
  },
  de: {
    translation: deTranslation
  },
  zh: {
    translation: zhTranslation
  },
  ja: {
    translation: jaTranslation
  }
};

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    resources,
    fallbackLng: 'en',
    debug: import.meta.env.DEV, // true in development, false in production
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'hotelAppLanguage',
      caches: ['localStorage'],
    }
  });

export default i18n;

// Function to change language and save to localStorage
export const changeLanguage = (language: string) => {
  localStorage.setItem('hotelAppLanguage', language);
  i18n.changeLanguage(language);
};

// Get current language
export const getCurrentLanguage = () => {
  return i18n.language || localStorage.getItem('hotelAppLanguage') || 'en';
};