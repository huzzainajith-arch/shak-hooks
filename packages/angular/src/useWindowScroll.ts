import { signal } from '@angular/core';
import { isBrowser } from '@shak-hooks/core';
import { useEventListener } from './useEventListener';

export function useWindowScroll() {
  const x = signal(isBrowser ? window.scrollX : 0);
  const y = signal(isBrowser ? window.scrollY : 0);

  useEventListener(window, 'scroll', () => {
    x.set(window.scrollX);
    y.set(window.scrollY);
  });

  return { x, y };
}
