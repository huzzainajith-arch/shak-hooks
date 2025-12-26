import { useRef, useEffect } from 'react';

export function useRenderCount() {
  const count = useRef(1);

  useEffect(() => {
    count.current++;
  });

  return count.current;
}
