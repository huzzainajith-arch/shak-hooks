import { ElementRef, Signal } from '@angular/core';
import { useEventListener } from './useEventListener';

export function useClickAway(
  target: ElementRef | Signal<HTMLElement | null> | HTMLElement,
  handler: (event: Event) => void,
  events: string[] = ['mousedown', 'touchstart']
) {
  const listener = (event: Event) => {
    let el: HTMLElement | null = null;
    
    if (target instanceof ElementRef) {
        el = target.nativeElement;
    } else if (typeof target === 'function') {
        el = target();
    } else {
        el = target;
    }

    if (!el) return;

    if (el === event.target || event.composedPath().includes(el)) {
      return;
    }

    handler(event);
  };

  events.forEach((event) => {
    useEventListener(event, listener);
  });
}
