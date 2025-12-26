import { useEffect, useRef } from 'react';
import { isBrowser } from '@shak-hooks/core';

export interface UseDocumentTitleOptions {
  restoreOnUnmount?: boolean;
}

export function useDocumentTitle(title: string, options: UseDocumentTitleOptions = {}) {
  const { restoreOnUnmount = false } = options;
  const defaultTitle = useRef(isBrowser ? document.title : '');

  useEffect(() => {
    if (!isBrowser) return;
    document.title = title;
  }, [title]);

  useEffect(() => {
    if (!isBrowser || !restoreOnUnmount) return;
    return () => {
      document.title = defaultTitle.current;
    };
  }, [restoreOnUnmount]);
}
