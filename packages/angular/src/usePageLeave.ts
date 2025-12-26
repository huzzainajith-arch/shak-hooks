import { Injector, inject, DestroyRef } from '@angular/core';

export function usePageLeave(onLeave: () => void, injector?: Injector) {
  const destroyRef = injector ? injector.get(DestroyRef) : inject(DestroyRef);

  const handler = (event: MouseEvent) => {
    if (
      event.clientY <= 0 ||
      event.clientX <= 0 ||
      event.clientX >= window.innerWidth ||
      event.clientY >= window.innerHeight
    ) {
      onLeave();
    }
  };

  document.addEventListener('mouseleave', handler);

  destroyRef.onDestroy(() => {
    document.removeEventListener('mouseleave', handler);
  });
}
