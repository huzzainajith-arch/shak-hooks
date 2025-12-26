import { signal, inject, DestroyRef } from '@angular/core';
import { isBrowser } from '@shak-hooks/core';

export function useVisibilityChange() {
  const isVisible = signal(isBrowser ? document.visibilityState === 'visible' : true);

  if (isBrowser) {
    const handleVisibilityChange = () => {
      isVisible.set(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    try {
      const destroyRef = inject(DestroyRef);
      destroyRef.onDestroy(() => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      });
    } catch (e) {}
  }

  return isVisible;
}
