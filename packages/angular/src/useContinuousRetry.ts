import { signal, Injector, inject, DestroyRef } from '@angular/core';

export function useContinuousRetry(
  callback: () => boolean | Promise<boolean>,
  interval: number = 100,
  options: { maxRetries?: number } = {},
  injector?: Injector
) {
  const hasResolved = signal(false);
  let intervalId: any = null;
  let retries = 0;
  
  const destroyRef = injector ? injector.get(DestroyRef) : inject(DestroyRef);

  const tick = async () => {
    if (hasResolved()) return;

    if (options.maxRetries && retries >= options.maxRetries) {
      clearInterval(intervalId);
      return;
    }

    try {
      const result = await callback();
      if (result) {
        hasResolved.set(true);
        clearInterval(intervalId);
      }
    } catch (e) {
      // ignore
    }
    retries++;
  };

  intervalId = setInterval(tick, interval);

  destroyRef.onDestroy(() => {
    clearInterval(intervalId);
  });

  return hasResolved;
}
