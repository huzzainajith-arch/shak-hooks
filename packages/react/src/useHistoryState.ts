import { useState, useCallback } from 'react';

export function useHistoryState<T>(initialValue: T, key: string) {
  const [state, setState] = useState<T>(() => {
    const historyState = window.history.state;
    return historyState && historyState[key] !== undefined ? historyState[key] : initialValue;
  });

  const setHistoryState = useCallback((value: T) => {
    const newState = { ...window.history.state, [key]: value };
    window.history.replaceState(newState, '');
    setState(value);
  }, [key]);

  return [state, setHistoryState] as const;
}
