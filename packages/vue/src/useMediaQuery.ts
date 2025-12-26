import { ref, onUnmounted, readonly, Ref } from 'vue';
import { isBrowser } from '@shak-hooks/core';

export function useMediaQuery(query: string): Ref<boolean> {
  const matches = ref(false);

  if (isBrowser) {
    const mediaQueryList = window.matchMedia(query);
    matches.value = mediaQueryList.matches;

    const listener = (event: MediaQueryListEvent) => {
      matches.value = event.matches;
    };

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', listener);
    } else {
      mediaQueryList.addListener(listener);
    }

    onUnmounted(() => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', listener);
      } else {
        mediaQueryList.removeListener(listener);
      }
    });
  }

  return readonly(matches);
}
