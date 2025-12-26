import { ref, onMounted, onUnmounted, readonly } from 'vue';
import { isBrowser } from '@shak-hooks/core';

export function useVisibilityChange() {
  const isVisible = ref(isBrowser ? document.visibilityState === 'visible' : true);

  const handleVisibilityChange = () => {
    isVisible.value = document.visibilityState === 'visible';
  };

  onMounted(() => {
    if (isBrowser) {
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }
  });

  onUnmounted(() => {
    if (isBrowser) {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
  });

  return readonly(isVisible);
}
