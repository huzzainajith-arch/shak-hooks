import { useRef, useEffect } from 'react';

export function useRenderInfo(name: string = 'Component') {
  const count = useRef(0);
  const lastRender = useRef(Date.now());

  useEffect(() => {
    const now = Date.now();
    count.current++;
    console.log(`${name} rendered`, {
      count: count.current,
      sinceLast: now - lastRender.current,
      timestamp: now,
    });
    lastRender.current = now;
  });
}
