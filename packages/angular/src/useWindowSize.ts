import { signal, inject, DestroyRef } from '@angular/core';
import { isBrowser } from '@shak-hooks/core';

export interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize() {
  const width = signal(isBrowser ? window.innerWidth : 0);
  const height = signal(isBrowser ? window.innerHeight : 0);

  if (isBrowser) {
    const handleResize = () => {
      width.set(window.innerWidth);
      height.set(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    
    try {
      const destroyRef = inject(DestroyRef);
      destroyRef.onDestroy(() => {
        window.removeEventListener('resize', handleResize);
      });
    } catch (e) {
      console.warn('useWindowSize: Could not inject DestroyRef. Event listener will not be cleaned up automatically.');
    }
  }

  return { width, height };
}
