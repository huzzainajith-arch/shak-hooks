import { useState, useEffect, useRef } from 'react';

export function useIdle(ms: number = 60000) {
  const [idle, setIdle] = useState(false);
  const timeoutId = useRef<any>(null);

  useEffect(() => {
    const handleEvent = () => {
      setIdle(false);
      if (timeoutId.current) clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => setIdle(true), ms);
    };

    const events = ['mousemove', 'mousedown', 'resize', 'keydown', 'touchstart', 'wheel'];
    events.forEach((event) => window.addEventListener(event, handleEvent));

    timeoutId.current = setTimeout(() => setIdle(true), ms);

    return () => {
      events.forEach((event) => window.removeEventListener(event, handleEvent));
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [ms]);

  return idle;
}
