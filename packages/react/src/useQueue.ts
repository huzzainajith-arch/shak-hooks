import { useState } from 'react';

export function useQueue<T>(initialValue: T[] = []) {
  const [queue, setQueue] = useState<T[]>(initialValue);

  const add = (element: T) => {
    setQueue((q) => [...q, element]);
  };

  const remove = () => {
    let removedElement: T | undefined;
    setQueue((q) => {
      const [first, ...rest] = q;
      removedElement = first;
      return rest;
    });
    return removedElement;
  };

  const clear = () => {
    setQueue([]);
  };

  return {
    queue,
    add,
    remove,
    clear,
    first: queue[0],
    last: queue[queue.length - 1],
    size: queue.length,
  };
}
