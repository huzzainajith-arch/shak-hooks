export type Procedure = (...args: any[]) => void;

export interface DebouncedFunc<T extends Procedure> {
  (...args: Parameters<T>): ReturnType<T> | undefined;
  cancel: () => void;
}

export function debounce<T extends Procedure>(
  func: T,
  wait: number,
  immediate: boolean = false
): DebouncedFunc<T> {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  const debounced = function (this: any, ...args: Parameters<T>) {
    const context = this;
    const later = function () {
      timeout = undefined;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  } as DebouncedFunc<T>;

  debounced.cancel = function () {
    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }
  };

  return debounced;
}
