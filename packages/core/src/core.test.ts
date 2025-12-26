import { describe, it, expect } from "vitest";
import { CounterLogic } from "./counter";
import { debounce } from "./debounce";

describe("Core: CounterLogic", () => {
  it("should initialize with default value", () => {
    const counter = new CounterLogic(0);
    expect(counter.get()).toBe(0);
  });

  it("should increment", () => {
    const counter = new CounterLogic(0);
    counter.inc();
    expect(counter.get()).toBe(1);
  });

  it("should respect max value", () => {
    const counter = new CounterLogic(0, { max: 5 });
    counter.set(10);
    expect(counter.get()).toBe(5);
  });
});

describe("Core: debounce", () => {
  it("should debounce function calls", async () => {
    let count = 0;
    const fn = debounce(() => count++, 10);

    fn();
    fn();
    fn();

    expect(count).toBe(0);
    await new Promise((r) => setTimeout(r, 20));
    expect(count).toBe(1);
  });
});
