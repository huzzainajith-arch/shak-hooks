import { signal, inject, DestroyRef } from '@angular/core';
import { isBrowser } from '@shak-hooks/core';

export function useOrientation() {
  const angle = signal(0);
  const type = signal('landscape-primary');

  if (isBrowser) {
    const updateState = () => {
        if (window.screen?.orientation) {
            angle.set(window.screen.orientation.angle);
            type.set(window.screen.orientation.type);
        } else if (typeof window.orientation !== 'undefined') {
            angle.set(Number(window.orientation));
            type.set('unknown');
        }
    };

    updateState();

    if (window.screen?.orientation) {
        window.screen.orientation.addEventListener('change', updateState);
    } else {
        window.addEventListener('orientationchange', updateState);
    }

    try {
      const destroyRef = inject(DestroyRef);
      destroyRef.onDestroy(() => {
        if (window.screen?.orientation) {
            window.screen.orientation.removeEventListener('change', updateState);
        } else {
            window.removeEventListener('orientationchange', updateState);
        }
      });
    } catch (e) {}
  }

  return { angle, type };
}
