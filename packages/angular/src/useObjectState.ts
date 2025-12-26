import { signal } from '@angular/core';

export function useObjectState<T extends object>(initialValue: T) {
  const state = signal<T>({ ...initialValue });

  const update = (partial: Partial<T> | ((prev: T) => Partial<T>)) => {
    state.update(prev => {
      const changes = typeof partial === 'function' ? partial(prev) : partial;
      return { ...prev, ...changes };
    });
  };

  return { state, update };
}
