import { ref, onMounted, onUnmounted, readonly } from 'vue';
import { isBrowser } from '@shak-hooks/core';

export interface OrientationState {
  angle: number;
  type: string;
}

export function useOrientation() {
  const angle = ref(0);
  const type = ref('landscape-primary');

  const updateState = () => {
    if (window.screen?.orientation) {
        angle.value = window.screen.orientation.angle;
        type.value = window.screen.orientation.type;
    } else if (typeof window.orientation !== 'undefined') {
        angle.value = Number(window.orientation);
        type.value = 'unknown';
    }
  };

  onMounted(() => {
    if (!isBrowser) return;
    updateState();

    if (window.screen?.orientation) {
        window.screen.orientation.addEventListener('change', updateState);
    } else {
        window.addEventListener('orientationchange', updateState);
    }
  });

  onUnmounted(() => {
    if (!isBrowser) return;
    if (window.screen?.orientation) {
        window.screen.orientation.removeEventListener('change', updateState);
    } else {
        window.removeEventListener('orientationchange', updateState);
    }
  });

  return {
      angle: readonly(angle),
      type: readonly(type)
  };
}
