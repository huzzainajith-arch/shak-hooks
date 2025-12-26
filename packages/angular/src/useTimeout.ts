import { effect, inject, DestroyRef, Signal } from '@angular/core';

export function useTimeout(callback: () => void, delay: Signal<number | null> | number | null) {
  let id: any = null;

  const clean = () => {
    if (id) {
      clearTimeout(id);
      id = null;
    }
  };

  const start = () => {
    clean();
    const d = typeof delay === 'function' ? delay() : delay;
    if (d !== null) {
      id = setTimeout(callback, d);
    }
  };

  if (typeof delay === 'function') {
      effect(() => {
          delay();
          start();
      });
  } else {
      start();
  }

  try {
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(clean);
  } catch (e) {}
}
