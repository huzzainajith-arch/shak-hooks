import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useIntervalWhen } from "./useIntervalWhen";
import { withSetup } from "./test-utils";

describe("Vue: useIntervalWhen", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should run interval when enabled", () => {
    const callback = vi.fn();
    withSetup(() => useIntervalWhen(callback, 100, true));

    vi.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should not run interval when disabled", () => {
    const callback = vi.fn();
    withSetup(() => useIntervalWhen(callback, 100, false));

    vi.advanceTimersByTime(100);

    expect(callback).not.toHaveBeenCalled();
  });
});
