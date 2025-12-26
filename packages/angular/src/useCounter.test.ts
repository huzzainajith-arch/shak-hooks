import { describe, it, expect } from "vitest";
import { useCounter } from "./useCounter";
import { signal } from "@angular/core";

// Mock Angular signal behavior if running in an environment without full Angular setup
// However, @angular/core signals usually work in Node.js environments.

describe("Angular: useCounter", () => {
  it("should initialize correctly", () => {
    const [count] = useCounter(10);
    expect(count()).toBe(10);
  });

  it("should increment", () => {
    const [count, { inc }] = useCounter(0);
    inc();
    expect(count()).toBe(1);
  });

  it("should respect min/max", () => {
    const [count, { set }] = useCounter(0, { min: 0, max: 5 });
    set(10);
    expect(count()).toBe(5);
  });
});
