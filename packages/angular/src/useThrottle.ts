import { signal, effect, Signal } from '@angular/core';

export function useThrottle<T>(value: Signal<T> | T, interval: number = 500) {
  const initialValue = typeof value === 'function' ? (value as Signal<T>)() : value;
  const throttledValue = signal(initialValue);
  let lastExecuted = Date.now();
  let timerId: any = null;

  if (typeof value === 'function') {
    effect(() => {
      const newValue = (value as Signal<T>)();
      if (Date.now() >= lastExecuted + interval) {
        lastExecuted = Date.now();
        throttledValue.set(newValue);
      } else {
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(() => {
          lastExecuted = Date.now();
          throttledValue.set(newValue);
        }, interval - (Date.now() - lastExecuted));
      }
    });
  }

  return throttledValue;
}
