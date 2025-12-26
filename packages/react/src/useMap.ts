import { useState, useMemo } from 'react';

export function useMap<K, V>(initialValue?: Iterable<readonly [K, V]>) {
  const [map, setMap] = useState(new Map<K, V>(initialValue));

  const actions = useMemo(
    () => ({
      set: (key: K, value: V) => {
        setMap((prev) => {
          const next = new Map(prev);
          next.set(key, value);
          return next;
        });
      },
      remove: (key: K) => {
        setMap((prev) => {
          const next = new Map(prev);
          next.delete(key);
          return next;
        });
      },
      clear: () => {
        setMap(new Map());
      },
      reset: () => {
        setMap(new Map(initialValue));
      },
    }),
    [initialValue]
  );

  return [map, actions] as const;
}
