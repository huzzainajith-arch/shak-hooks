import { describe, it, expect } from "vitest";
import { useCounter } from "./useCounter";

describe("Vue: useCounter", () => {
  it("should initialize correctly", () => {
    const [count] = useCounter(10);
    expect(count.value).toBe(10);
  });

  it("should increment", () => {
    const [count, { inc }] = useCounter(0);
    inc();
    expect(count.value).toBe(1);
  });

  it("should respect min/max", () => {
    const [count, { set }] = useCounter(0, { min: 0, max: 5 });
    set(10);
    expect(count.value).toBe(5);
  });
});
