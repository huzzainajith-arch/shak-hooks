import { signal, effect, Signal, WritableSignal } from "@angular/core";

export function useDebounce<T>(value: Signal<T>, delay: number): Signal<T> {
  const debouncedValue = signal<T>(value());

  effect((onCleanup) => {
    const timer = setTimeout(() => {
      debouncedValue.set(value());
    }, delay);

    onCleanup(() => {
      clearTimeout(timer);
    });
  });

  return debouncedValue;
}
