import { useRef, useEffect } from 'react';

export function useIntervalWhen(
  callback: () => void,
  delay: number,
  when: boolean = true,
  immediate: boolean = false
) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (when) {
      if (immediate) {
        savedCallback.current();
      }
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay, when, immediate]);
}
