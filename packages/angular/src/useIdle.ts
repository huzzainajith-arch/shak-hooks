import { signal, Injector, inject, DestroyRef } from '@angular/core';

export function useIdle(ms: number = 60000, injector?: Injector) {
  const idle = signal(false);
  let timeoutId: any = null;
  const destroyRef = injector ? injector.get(DestroyRef) : inject(DestroyRef);

  const handleEvent = () => {
    idle.set(false);
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      idle.set(true);
    }, ms);
  };

  const events = ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel'];

  events.forEach((event) => window.addEventListener(event, handleEvent));
  timeoutId = setTimeout(() => {
    idle.set(true);
  }, ms);

  destroyRef.onDestroy(() => {
    events.forEach((event) => window.removeEventListener(event, handleEvent));
    if (timeoutId) clearTimeout(timeoutId);
  });

  return idle;
}
