import { useState, useEffect, ReactNode } from "react";
import { LanguageContext } from "../hooks/useLanguage";

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("language");
    if (storedLang) setLanguage(storedLang);
  }, []);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      en: { welcome: "Welcome", goodbye: "Goodbye" },
      pl: { welcome: "Witamy", goodbye: "Do widzenia" },
    };
    return translations[language]?.[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
