import { signal, inject, DestroyRef } from '@angular/core';
import { isBrowser } from '@shak-hooks/core';

export function usePreferredLanguage() {
  const language = signal(isBrowser ? navigator.language : 'en');

  if (isBrowser) {
    const handleLanguageChange = () => {
      language.set(navigator.language);
    };

    window.addEventListener('languagechange', handleLanguageChange);

    try {
      const destroyRef = inject(DestroyRef);
      destroyRef.onDestroy(() => {
        window.removeEventListener('languagechange', handleLanguageChange);
      });
    } catch (e) {}
  }

  return language;
}
