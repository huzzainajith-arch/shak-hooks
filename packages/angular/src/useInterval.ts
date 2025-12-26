import { effect, inject, DestroyRef, Signal } from '@angular/core';

export function useInterval(callback: () => void, delay: Signal<number | null> | number | null) {
  let id: any = null;

  const clean = () => {
    if (id) {
      clearInterval(id);
      id = null;
    }
  };

  const start = (d: number | null) => {
    clean();
    if (d !== null) {
      id = setInterval(callback, d);
    }
  };

  if (typeof delay === 'function') {
      effect(() => {
          start(delay());
      });
  } else {
      start(delay);
  }

  try {
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(clean);
  } catch (e) {}
}
