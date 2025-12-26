import { ref, readonly } from 'vue';
import { isBrowser } from '@shak-hooks/core';
import { useEventListener } from './useEventListener';

export function useWindowScroll() {
  const x = ref(isBrowser ? window.scrollX : 0);
  const y = ref(isBrowser ? window.scrollY : 0);

  useEventListener(window, 'scroll', () => {
    x.value = window.scrollX;
    y.value = window.scrollY;
  }, { capture: false, passive: true });

  return {
    x: readonly(x),
    y: readonly(y),
  };
}
