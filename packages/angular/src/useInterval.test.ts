import { describe, it, expect, vi } from "vitest";
import { useInterval } from "./useInterval";

describe("Angular: useInterval", () => {
  it("should call callback repeatedly", () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    
    // Pass number directly to avoid effect() usage
    useInterval(callback, 1000);

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);

    vi.clearAllTimers();
    vi.useRealTimers();
  });
});
