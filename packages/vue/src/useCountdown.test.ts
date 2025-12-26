import { describe, it, expect, vi } from "vitest";
import { useCountdown } from "./useCountdown";
import { withSetup } from "./test-utils";

describe("Vue: useCountdown", () => {
  it("should initialize with count", () => {
    const { result } = withSetup(() => useCountdown(10));
    expect(result.count.value).toBe(10);
  });

  it("should countdown", async () => {
    vi.useFakeTimers();
    const { result } = withSetup(() => useCountdown(10));

    await vi.advanceTimersByTimeAsync(1000);
    expect(result.count.value).toBe(9);

    await vi.advanceTimersByTimeAsync(2000);
    expect(result.count.value).toBe(7);
    vi.useRealTimers();
  });
});
