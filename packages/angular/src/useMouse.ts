import { signal } from '@angular/core';
import { useEventListener } from './useEventListener';

export function useMouse() {
  const x = signal(0);
  const y = signal(0);

  useEventListener('mousemove', (event: MouseEvent) => {
    x.set(event.pageX);
    y.set(event.pageY);
  });

  return { x, y };
}
