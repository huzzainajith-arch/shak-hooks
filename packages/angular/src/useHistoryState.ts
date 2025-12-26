import { signal } from '@angular/core';

export function useHistoryState<T>(initialValue: T, key: string) {
  const state = signal<T>(initialValue);
  
  // Initialize
  const historyState = window.history.state;
  if (historyState && historyState[key] !== undefined) {
      state.set(historyState[key]);
  }

  const setHistoryState = (value: T) => {
    const newState = { ...window.history.state, [key]: value };
    window.history.replaceState(newState, '');
    state.set(value);
  };

  return { state, setHistoryState };
}
