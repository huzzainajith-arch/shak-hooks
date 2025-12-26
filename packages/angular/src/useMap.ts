import { signal } from '@angular/core';

export function useMap<K, V>(initialValue?: Iterable<readonly [K, V]>) {
  const map = signal(new Map<K, V>(initialValue));

  const set = (key: K, value: V) => {
    map.update(prev => {
      const next = new Map(prev);
      next.set(key, value);
      return next;
    });
  };

  const remove = (key: K) => {
    map.update(prev => {
      const next = new Map(prev);
      next.delete(key);
      return next;
    });
  };

  const clear = () => {
    map.set(new Map());
  };

  const reset = () => {
    map.set(new Map(initialValue));
  };

  return {
    map,
    set,
    remove,
    clear,
    reset,
  };
}
