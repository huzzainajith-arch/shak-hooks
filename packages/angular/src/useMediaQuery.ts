import { signal, inject, DestroyRef } from '@angular/core';
import { isBrowser } from '@shak-hooks/core';

export function useMediaQuery(query: string) {
  const matches = signal(false);

  if (isBrowser) {
    const mediaQueryList = window.matchMedia(query);
    matches.set(mediaQueryList.matches);

    const listener = (event: MediaQueryListEvent) => {
      matches.set(event.matches);
    };

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', listener);
    } else {
      mediaQueryList.addListener(listener);
    }

    try {
      const destroyRef = inject(DestroyRef);
      destroyRef.onDestroy(() => {
        if (mediaQueryList.removeEventListener) {
          mediaQueryList.removeEventListener('change', listener);
        } else {
          mediaQueryList.removeListener(listener);
        }
      });
    } catch (e) {}
  }

  return matches;
}
