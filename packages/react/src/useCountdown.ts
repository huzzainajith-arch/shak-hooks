import { useState, useEffect, useRef } from 'react';

export function useCountdown(initialSeconds: number) {
  const [count, setCount] = useState(initialSeconds);
  const intervalRef = useRef<any>(null);

  const start = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev <= 0) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const reset = () => {
    stop();
    setCount(initialSeconds);
  };

  useEffect(() => {
    start();
    return stop;
  }, [initialSeconds]);

  return { count, start, stop, reset };
}
