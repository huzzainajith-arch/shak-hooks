import { effect, inject, DestroyRef, Signal } from '@angular/core';

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

export function useRandomInterval(
  callback: () => void,
  minDelay: Signal<number | null> | number | null,
  maxDelay: Signal<number | null> | number | null
) {
  let timeoutId: number | null = null;

  const clean = () => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  const start = () => {
    clean();
    const min = typeof minDelay === 'function' ? minDelay() : minDelay;
    const max = typeof maxDelay === 'function' ? maxDelay() : maxDelay;

    if (typeof min === 'number' && typeof max === 'number') {
      const handleTick = () => {
        const nextTickAt = random(min, max);
        timeoutId = window.setTimeout(() => {
          callback();
          handleTick();
        }, nextTickAt);
      };
      handleTick();
    }
  };

  if (typeof minDelay === 'function' || typeof maxDelay === 'function') {
      effect(() => {
          if (typeof minDelay === 'function') minDelay();
          if (typeof maxDelay === 'function') maxDelay();
          start();
      });
  } else {
      start();
  }

  try {
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(clean);
  } catch (e) {}

  return clean;
}
