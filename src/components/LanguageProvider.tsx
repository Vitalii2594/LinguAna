import { useState, useEffect, ReactNode } from "react";
import { LanguageContext } from "../hooks/useLanguage";
import { translations } from "../utils/translations";

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<string>("pl");

  useEffect(() => {
    const storedLang = localStorage.getItem("language");
    if (storedLang && (storedLang === "pl" || storedLang === "uk")) {
      setLanguage(storedLang);
    }
  }, []);

  const changeLanguage = (lang: string) => {
    if (lang === "pl" || lang === "uk") {
      setLanguage(lang);
      localStorage.setItem("language", lang);
    }
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language as keyof typeof translations];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to Polish if key not found in current language
        value = translations.pl;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            console.warn(`Translation key not found: ${key}`);
            return key; // Return the key itself if translation not found
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};