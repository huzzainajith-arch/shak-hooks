import { useState, useEffect } from 'react';
import { isBrowser } from '@shak-hooks/core';

export function useVisibilityChange(): boolean {
  const [isVisible, setIsVisible] = useState(() => {
    return isBrowser ? document.visibilityState === 'visible' : true;
  });

  useEffect(() => {
    if (!isBrowser) return;

    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isVisible;
}
