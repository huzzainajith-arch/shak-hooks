import { signal } from '@angular/core';

export function useSet<K>(initialValue?: Iterable<K>) {
  const set = signal(new Set<K>(initialValue));

  const add = (key: K) => {
    set.update(prev => {
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  };

  const remove = (key: K) => {
    set.update(prev => {
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
  };

  const clear = () => {
    set.set(new Set());
  };

  const reset = () => {
    set.set(new Set(initialValue));
  };

  return {
    set,
    add,
    remove,
    clear,
    reset,
  };
}
