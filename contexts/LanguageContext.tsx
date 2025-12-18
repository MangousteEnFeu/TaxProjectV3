import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TRANSLATIONS, Language } from '../constants/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    const savedLang = localStorage.getItem('app_language') as Language;
    if (savedLang && TRANSLATIONS[savedLang]) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('app_language', lang);
  };

  const t = (path: string): string => {
    const keys = path.split('.');
    let value = TRANSLATIONS[language];
    
    for (const key of keys) {
      if (value && value[key]) {
        value = value[key];
      } else {
        // Fallback to French if translation missing
        let fallback = TRANSLATIONS['fr'];
        for (const k of keys) {
          if (fallback && fallback[k]) fallback = fallback[k];
          else return path; // Return key if absolutely nothing found
        }
        return fallback as string || path;
      }
    }
    return value as string;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};