import { inject, DestroyRef } from '@angular/core';

export function useLogger(componentName: string, ...rest: any[]) {
  console.log(`${componentName} mounted`, ...rest);

  try {
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => {
      console.log(`${componentName} unmounted`);
    });
  } catch (e) {
    console.warn('useLogger must be used within an injection context to log unmounting.');
  }
}
