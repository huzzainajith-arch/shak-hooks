import { watchEffect, onUnmounted, toValue, MaybeRefOrGetter } from 'vue';
import { isBrowser } from '@shak-hooks/core';

export interface UseDocumentTitleOptions {
  restoreOnUnmount?: boolean;
}

export function useDocumentTitle(title: MaybeRefOrGetter<string>, options: UseDocumentTitleOptions = {}) {
  const { restoreOnUnmount = false } = options;
  const defaultTitle = isBrowser ? document.title : '';

  if (isBrowser) {
    watchEffect(() => {
      document.title = toValue(title);
    });

    onUnmounted(() => {
      if (restoreOnUnmount) {
        document.title = defaultTitle;
      }
    });
  }
}
