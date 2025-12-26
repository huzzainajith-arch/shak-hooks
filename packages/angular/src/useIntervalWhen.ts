import { effect, inject, DestroyRef, Signal } from '@angular/core';

export function useIntervalWhen(
  callback: () => void,
  delay: Signal<number> | number,
  when: Signal<boolean> | boolean = true,
  immediate: boolean = false
) {
  let id: any = null;

  const clean = () => {
    if (id) {
      clearInterval(id);
      id = null;
    }
  };

  const start = () => {
    clean();
    const d = typeof delay === 'function' ? delay() : delay;
    const w = typeof when === 'function' ? when() : when;

    if (w) {
      if (immediate) {
        callback();
      }
      id = setInterval(callback, d);
    }
  };

  if (typeof delay === 'function' || typeof when === 'function') {
      effect(() => {
          // Register dependencies
          if (typeof delay === 'function') delay();
          if (typeof when === 'function') when();
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
