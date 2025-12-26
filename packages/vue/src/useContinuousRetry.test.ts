import { describe, it, expect, vi } from "vitest";
import { useContinuousRetry } from "./useContinuousRetry";
import { withSetup } from "./test-utils";

describe("Vue: useContinuousRetry", () => {
  it("should resolve when callback returns true", async () => {
    vi.useFakeTimers();
    const callback = vi.fn().mockReturnValue(true);
    
    const { result } = withSetup(() => useContinuousRetry(callback, 100));
    
    expect(result.value).toBe(false);

    await vi.advanceTimersByTimeAsync(100);
    
    expect(callback).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it("should stop retrying after maxRetries", async () => {
    vi.useFakeTimers();
    const callback = vi.fn().mockReturnValue(false);
    
    const { result } = withSetup(() => useContinuousRetry(callback, 100, { maxRetries: 2 }));

    await vi.advanceTimersByTimeAsync(100);
    await vi.advanceTimersByTimeAsync(100);
    await vi.advanceTimersByTimeAsync(100);

    expect(callback).toHaveBeenCalledTimes(2);
    expect(result.value).toBe(false);
    vi.useRealTimers();
  });
});
