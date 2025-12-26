import { describe, it, expect, vi } from "vitest";
import { useIntervalWhen } from "./useIntervalWhen";

describe("Angular: useIntervalWhen", () => {
  it("should run interval when enabled", () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    useIntervalWhen(callback, 100, true);

    vi.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledTimes(1);

    vi.clearAllTimers();
    vi.useRealTimers();
  });
});
