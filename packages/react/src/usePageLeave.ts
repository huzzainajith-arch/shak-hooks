import { useEffect } from 'react';

export function usePageLeave(onLeave: () => void) {
  useEffect(() => {
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
    return () => {
      document.removeEventListener('mouseleave', handler);
    };
  }, [onLeave]);
}
