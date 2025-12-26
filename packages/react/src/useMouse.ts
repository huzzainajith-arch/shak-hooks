import { useState, useEffect } from 'react';
import { isBrowser } from '@shak-hooks/core';

export interface MouseState {
  x: number;
  y: number;
  elementX: number;
  elementY: number;
  elementPositionX: number;
  elementPositionY: number;
}

export function useMouse() {
  const [state, setState] = useState<MouseState>({
    x: 0,
    y: 0,
    elementX: 0,
    elementY: 0,
    elementPositionX: 0,
    elementPositionY: 0,
  });

  useEffect(() => {
    if (!isBrowser) return;

    const moveHandler = (event: MouseEvent) => {
      setState((prev) => ({
        ...prev,
        x: event.pageX,
        y: event.pageY,
      }));
    };

    document.addEventListener('mousemove', moveHandler);

    return () => {
      document.removeEventListener('mousemove', moveHandler);
    };
  }, []);

  return state;
}
