import { signal, Signal, effect, computed } from '@angular/core';

export function usePrevious<T>(value: Signal<T>): Signal<T | undefined> {
  const prev = signal<T | undefined>(undefined);
  let current = value();

  effect(() => {
    const next = value();
    if (next !== current) {
      prev.set(current);
      current = next;
    }
  }, { allowSignalWrites: true });

  return prev;
}
