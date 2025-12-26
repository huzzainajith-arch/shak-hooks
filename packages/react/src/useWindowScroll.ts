import { useState, useEffect } from 'react';
import { isBrowser } from '@shak-hooks/core';

export interface WindowScrollState {
  x: number;
  y: number;
}

export function useWindowScroll(): WindowScrollState {
  const [state, setState] = useState<WindowScrollState>({
    x: isBrowser ? window.scrollX : 0,
    y: isBrowser ? window.scrollY : 0,
  });

  useEffect(() => {
    if (!isBrowser) return;

    const handler = () => {
      setState({
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    window.addEventListener('scroll', handler, { capture: false, passive: true });

    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, []);

  return state;
}
