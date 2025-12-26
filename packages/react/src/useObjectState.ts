import { useState, useCallback } from 'react';

export function useObjectState<T extends object>(initialValue: T) {
  const [state, setState] = useState<T>(initialValue);

  const update = useCallback((partial: Partial<T> | ((prev: T) => Partial<T>)) => {
    setState((prev) => {
      const changes = typeof partial === 'function' ? partial(prev) : partial;
      return { ...prev, ...changes };
    });
  }, []);

  return [state, update] as const;
}
