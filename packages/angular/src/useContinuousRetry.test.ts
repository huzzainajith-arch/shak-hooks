import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useContinuousRetry } from "./useContinuousRetry";
import { createAngularTestContext } from "./test-utils";

describe("Angular: useContinuousRetry", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should resolve when callback returns true", async () => {
    const callback = vi.fn().mockReturnValue(true);
    const ctx = createAngularTestContext();

    await ctx.run(async () => {
      const hasResolved = useContinuousRetry(callback, 100);
      expect(hasResolved()).toBe(false);

      await vi.advanceTimersByTimeAsync(100);
      
      expect(callback).toHaveBeenCalled();
    });

    ctx.destroy();
  });

  it("should stop retrying after maxRetries", async () => {
    const callback = vi.fn().mockReturnValue(false);
    const ctx = createAngularTestContext();

    await ctx.run(async () => {
      const hasResolved = useContinuousRetry(callback, 100, { maxRetries: 2 });

      await vi.advanceTimersByTimeAsync(100);
      await vi.advanceTimersByTimeAsync(100);
      await vi.advanceTimersByTimeAsync(100);

      expect(callback).toHaveBeenCalledTimes(2);
      expect(hasResolved()).toBe(false);
    });

    ctx.destroy();
  });
});
