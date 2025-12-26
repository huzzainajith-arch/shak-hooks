import { signal, Injector, inject, DestroyRef } from '@angular/core';

export function useKeyPress(targetKey: string, injector?: Injector) {
  const keyPressed = signal(false);
  const destroyRef = injector ? injector.get(DestroyRef) : inject(DestroyRef);

  const downHandler = ({ key }: KeyboardEvent) => {
    if (key === targetKey) {
      keyPressed.set(true);
    }
  };

  const upHandler = ({ key }: KeyboardEvent) => {
    if (key === targetKey) {
      keyPressed.set(false);
    }
  };

  window.addEventListener('keydown', downHandler);
  window.addEventListener('keyup', upHandler);

  destroyRef.onDestroy(() => {
    window.removeEventListener('keydown', downHandler);
    window.removeEventListener('keyup', upHandler);
  });

  return keyPressed;
}
