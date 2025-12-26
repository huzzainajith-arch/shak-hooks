import { signal, Injector, inject, DestroyRef } from '@angular/core';

export function useCountdown(initialSeconds: number, injector?: Injector) {
  const count = signal(initialSeconds);
  let intervalId: any = null;
  const destroyRef = injector ? injector.get(DestroyRef) : inject(DestroyRef);

  const stop = () => {
    if (intervalId) clearInterval(intervalId);
  };

  const start = () => {
    stop();
    intervalId = setInterval(() => {
      if (count() <= 0) {
        stop();
        count.set(0);
      } else {
        count.update(v => v - 1);
      }
    }, 1000);
  };

  const reset = () => {
    stop();
    count.set(initialSeconds);
  };

  start();
  
  destroyRef.onDestroy(stop);

  return { count, start, stop, reset };
}
