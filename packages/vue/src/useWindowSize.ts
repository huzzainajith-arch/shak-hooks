import { ref, onMounted, onUnmounted, readonly } from 'vue';
import { isBrowser } from '@shak-hooks/core';

export function useWindowSize() {
  const width = ref(isBrowser ? window.innerWidth : 0);
  const height = ref(isBrowser ? window.innerHeight : 0);

  const handleResize = () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };

  onMounted(() => {
    if (isBrowser) {
      window.addEventListener('resize', handleResize);
    }
  });

  onUnmounted(() => {
    if (isBrowser) {
      window.removeEventListener('resize', handleResize);
    }
  });

  return {
    width: readonly(width),
    height: readonly(height),
  };
}
