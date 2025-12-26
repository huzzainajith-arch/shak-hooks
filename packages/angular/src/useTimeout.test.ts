import { describe, it, expect, vi } from "vitest";
import { useTimeout } from "./useTimeout";

describe("Angular: useTimeout", () => {
  it("should call callback after delay", () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    
    // Pass number directly to avoid effect() usage
    useTimeout(callback, 1000);

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    vi.clearAllTimers();
    vi.useRealTimers();
  });
});
