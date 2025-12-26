import { signal, ElementRef, Signal } from '@angular/core';
import { useEventListener } from './useEventListener';

export function useHover(target: ElementRef | Signal<HTMLElement | null> | HTMLElement) {
  const isHovered = signal(false);

  useEventListener(target, 'mouseenter', () => {
    isHovered.set(true);
  });

  useEventListener(target, 'mouseleave', () => {
    isHovered.set(false);
  });

  return isHovered;
}
