import { effect, Injector, inject, DestroyRef } from '@angular/core';

export function useLockBodyScroll(locked: (() => boolean) | boolean = true, injector?: Injector) {
  const destroyRef = injector ? injector.get(DestroyRef) : inject(DestroyRef);
  let originalStyle = '';

  // Initialize
  originalStyle = document.body.style.overflow;

  const isLocked = typeof locked === 'function' ? (locked as () => boolean) : () => locked as boolean;

  effect(() => {
    if (isLocked()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalStyle;
    }
  }, { injector });

  destroyRef.onDestroy(() => {
    document.body.style.overflow = originalStyle;
  });
}
