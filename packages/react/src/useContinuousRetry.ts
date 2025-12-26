import { useState, useEffect, useRef } from 'react';

export function useContinuousRetry(
  callback: () => boolean | Promise<boolean>,
  interval: number = 100,
  options: { maxRetries?: number } = {}
) {
  const [hasResolved, setHasResolved] = useState(false);
  const intervalId = useRef<any>(null);
  const retries = useRef(0);

  useEffect(() => {
    const tick = async () => {
      if (hasResolved) return;
      
      if (options.maxRetries && retries.current >= options.maxRetries) {
        clearInterval(intervalId.current);
        return;
      }

      try {
        const result = await callback();
        if (result) {
          setHasResolved(true);
          clearInterval(intervalId.current);
        }
      } catch (e) {
        // ignore error and retry
      }
      retries.current++;
    };

    intervalId.current = setInterval(tick, interval);
    return () => clearInterval(intervalId.current);
  }, [callback, interval, options.maxRetries, hasResolved]);

  return hasResolved;
}
