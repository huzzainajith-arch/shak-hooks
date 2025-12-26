import { ref, onMounted, onUnmounted, readonly } from 'vue';
import { isBrowser } from '@shak-hooks/core';

export function usePreferredLanguage() {
  const language = ref(isBrowser ? navigator.language : 'en');

  const handleLanguageChange = () => {
    language.value = navigator.language;
  };

  onMounted(() => {
    if (isBrowser) {
      window.addEventListener('languagechange', handleLanguageChange);
    }
  });

  onUnmounted(() => {
    if (isBrowser) {
      window.removeEventListener('languagechange', handleLanguageChange);
    }
  });

  return readonly(language);
}
