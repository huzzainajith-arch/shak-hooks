import { signal } from '@angular/core';

export function useList<T>(initialValue: T[] = []) {
  const list = signal<T[]>([...initialValue]);

  const set = (newList: T[]) => {
    list.set(newList);
  };
  const push = (...items: T[]) => {
    list.update(l => [...l, ...items]);
  };
  const updateAt = (index: number, item: T) => {
    list.update(l => l.map((e, i) => (i === index ? item : e)));
  };
  const insertAt = (index: number, item: T) => {
    list.update(l => [...l.slice(0, index), item, ...l.slice(index)]);
  };
  const update = (predicate: (a: T, b: T) => boolean, newItem: T) => {
    list.update(l => l.map((e) => (predicate(e, newItem) ? newItem : e)));
  };
  const removeAt = (index: number) => {
    list.update(l => l.filter((_, i) => i !== index));
  };
  const clear = () => {
    list.set([]);
  };
  const reset = () => {
    list.set([...initialValue]);
  };

  return {
    list,
    set,
    push,
    updateAt,
    insertAt,
    update,
    removeAt,
    clear,
    reset,
  };
}
