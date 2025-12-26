import { useState, useCallback } from 'react';

export function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback((nextValue?: any) => {
    if (typeof nextValue === 'boolean') {
      setValue(nextValue);
    } else {
      setValue((v) => !v);
    }
  }, []);
  return [value, toggle] as const;
}
