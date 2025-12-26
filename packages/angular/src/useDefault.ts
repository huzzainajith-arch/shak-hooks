import { signal, computed } from '@angular/core';

export function useDefault<T>(initialValue: T, defaultValue: T) {
  const state = signal<T | undefined | null>(initialValue);
  const value = computed(() => {
      const s = state();
      return s === undefined || s === null ? defaultValue : s;
  });
  return { value, state };
}
