import { signal, WritableSignal, computed, Signal } from "@angular/core";
import { CounterOptions } from "@shak-hooks/core";

export interface CounterActions {
  inc: (delta?: number) => void;
  dec: (delta?: number) => void;
  get: () => number;
  set: (value: number) => void;
  reset: (value?: number) => void;
}

export type UseCounterReturn = [WritableSignal<number>, CounterActions];

export function useCounter(
  initialValue: number = 0,
  options: CounterOptions = {}
): UseCounterReturn {
  const { min = -Infinity, max = Infinity } = options;
  const count = signal(Math.min(Math.max(initialValue, min), max));

  const inc = (delta: number = 1) => {
    count.update((c) => Math.min(Math.max(c + delta, min), max));
  };

  const dec = (delta: number = 1) => {
    count.update((c) => Math.min(Math.max(c - delta, min), max));
  };

  const set = (value: number) => {
    count.set(Math.min(Math.max(value, min), max));
  };

  const reset = (value: number = initialValue) => {
    count.set(Math.min(Math.max(value, min), max));
  };

  const get = () => count();

  return [count, { inc, dec, get, set, reset }];
}
