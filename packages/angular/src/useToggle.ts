import { signal } from '@angular/core';

export function useToggle(initialValue: boolean = false) {
  const value = signal(initialValue);
  const toggle = (nextValue?: any) => {
    if (typeof nextValue === 'boolean') {
      value.set(nextValue);
    } else {
      value.update(v => !v);
    }
  };
  return { value, toggle };
}
