import { useState, useEffect } from 'react';
import { isBrowser } from '@shak-hooks/core';

export function usePreferredLanguage(): string {
  const [language, setLanguage] = useState<string>(() => {
    if (isBrowser) {
      return navigator.language;
    }
    return 'en';
  });

  useEffect(() => {
    if (!isBrowser) return;

    const handleLanguageChange = () => {
      setLanguage(navigator.language);
    };

    window.addEventListener('languagechange', handleLanguageChange);
    return () => window.removeEventListener('languagechange', handleLanguageChange);
  }, []);

  return language;
}
