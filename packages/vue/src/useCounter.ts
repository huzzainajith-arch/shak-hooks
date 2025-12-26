import { ref, computed, unref } from "vue";
import type { Ref } from "vue";
import { CounterOptions } from "@shak-hooks/core";

export interface CounterActions {
  inc: (delta?: number) => void;
  dec: (delta?: number) => void;
  get: () => number;
  set: (value: number) => void;
  reset: (value?: number) => void;
}

export type UseCounterReturn = [Ref<number>, CounterActions];

export function useCounter(
  initialValue: number = 0,
  options: CounterOptions = {}
): UseCounterReturn {
  const { min = -Infinity, max = Infinity } = options;
  const count = ref(Math.min(Math.max(initialValue, min), max));

  const inc = (delta: number = 1) => {
    count.value = Math.min(Math.max(count.value + delta, min), max);
  };

  const dec = (delta: number = 1) => {
    count.value = Math.min(Math.max(count.value - delta, min), max);
  };

  const set = (value: number) => {
    count.value = Math.min(Math.max(value, min), max);
  };

  const reset = (value: number = initialValue) => {
    count.value = Math.min(Math.max(value, min), max);
  };

  const get = () => count.value;

  return [count, { inc, dec, get, set, reset }];
}
