import { signal, computed } from '@angular/core';

export function useQueue<T>(initialValue: T[] = []) {
  const queue = signal<T[]>([...initialValue]);

  const add = (element: T) => {
    queue.update(q => [...q, element]);
  };

  const remove = () => {
    let removed: T | undefined;
    queue.update(q => {
      const [first, ...rest] = q;
      removed = first;
      return rest;
    });
    return removed;
  };

  const clear = () => {
    queue.set([]);
  };

  const first = computed(() => queue()[0]);
  const last = computed(() => queue()[queue().length - 1]);
  const size = computed(() => queue().length);

  return {
    queue,
    add,
    remove,
    clear,
    first,
    last,
    size,
  };
}
