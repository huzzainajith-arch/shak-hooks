import { useState, useCallback } from "react";
import { CounterOptions } from "@shak-hooks/core";

export interface CounterActions {
  inc: (delta?: number) => void;
  dec: (delta?: number) => void;
  get: () => number;
  set: (value: number) => void;
  reset: (value?: number) => void;
}

export type UseCounterReturn = [number, CounterActions];

export function useCounter(
  initialValue: number = 0,
  options: CounterOptions = {}
): UseCounterReturn {
  const { min = -Infinity, max = Infinity } = options;
  const [count, setCount] = useState(() => {
    return Math.min(Math.max(initialValue, min), max);
  });

  const inc = useCallback(
    (delta: number = 1) => {
      setCount((c) => Math.min(Math.max(c + delta, min), max));
    },
    [min, max]
  );

  const dec = useCallback(
    (delta: number = 1) => {
      setCount((c) => Math.min(Math.max(c - delta, min), max));
    },
    [min, max]
  );

  const set = useCallback(
    (value: number) => {
      setCount(Math.min(Math.max(value, min), max));
    },
    [min, max]
  );

  const reset = useCallback(
    (value: number = initialValue) => {
      setCount(Math.min(Math.max(value, min), max));
    },
    [initialValue, min, max]
  );

  const get = useCallback(() => count, [count]);

  return [count, { inc, dec, get, set, reset }];
}
