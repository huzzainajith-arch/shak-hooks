import { useState, useMemo } from 'react';

export function useSet<K>(initialValue?: Iterable<K>) {
  const [set, setSet] = useState(new Set<K>(initialValue));

  const actions = useMemo(
    () => ({
      add: (key: K) => {
        setSet((prev) => {
          const next = new Set(prev);
          next.add(key);
          return next;
        });
      },
      remove: (key: K) => {
        setSet((prev) => {
          const next = new Set(prev);
          next.delete(key);
          return next;
        });
      },
      clear: () => {
        setSet(new Set());
      },
      reset: () => {
        setSet(new Set(initialValue));
      },
      has: (key: K) => set.has(key),
    }),
    [set, initialValue]
  );

  return [set, actions] as const;
}
