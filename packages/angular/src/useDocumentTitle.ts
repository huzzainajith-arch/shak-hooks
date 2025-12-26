import { effect, inject, DestroyRef, Signal } from '@angular/core';
import { isBrowser } from '@shak-hooks/core';

export interface UseDocumentTitleOptions {
  restoreOnUnmount?: boolean;
}

export function useDocumentTitle(title: Signal<string> | string, options: UseDocumentTitleOptions = {}) {
  const { restoreOnUnmount = false } = options;
  const defaultTitle = isBrowser ? document.title : '';

  if (isBrowser) {
    if (typeof title === 'string') {
      document.title = title;
    } else {
      effect(() => {
        document.title = title();
      });
    }

    try {
      const destroyRef = inject(DestroyRef);
      destroyRef.onDestroy(() => {
        if (restoreOnUnmount) {
          document.title = defaultTitle;
        }
      });
    } catch (e) {}
  }
}
