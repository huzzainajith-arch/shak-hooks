import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useCountdown } from "./useCountdown";
import { createAngularTestContext } from "./test-utils";

describe("Angular: useCountdown", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should initialize with count", () => {
    const ctx = createAngularTestContext();
    ctx.run(() => {
      const { count } = useCountdown(10);
      expect(count()).toBe(10);
    });
    ctx.destroy();
  });

  it("should countdown", () => {
    const ctx = createAngularTestContext();
    ctx.run(() => {
      const { count } = useCountdown(10);

      vi.advanceTimersByTime(1000);
      expect(count()).toBe(9);

      vi.advanceTimersByTime(2000);
      expect(count()).toBe(7);
    });
    ctx.destroy();
  });
});
