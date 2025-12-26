import { useState, useMemo } from 'react';

export function useList<T>(initialValue: T[] = []) {
  const [list, setList] = useState<T[]>(initialValue);

  const actions = useMemo(
    () => ({
      set: (newList: T[]) => setList(newList),
      push: (...items: T[]) => setList((l) => [...l, ...items]),
      updateAt: (index: number, item: T) =>
        setList((l) => l.map((e, i) => (i === index ? item : e))),
      insertAt: (index: number, item: T) =>
        setList((l) => [...l.slice(0, index), item, ...l.slice(index)]),
      update: (predicate: (a: T, b: T) => boolean, newItem: T) =>
        setList((l) => l.map((e) => (predicate(e, newItem) ? newItem : e))),
      removeAt: (index: number) => setList((l) => l.filter((_, i) => i !== index)),
      clear: () => setList([]),
      reset: () => setList(initialValue),
    }),
    [initialValue]
  );

  return [list, actions] as const;
}
