import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useIntervalWhen } from "./useIntervalWhen";

describe("React: useIntervalWhen", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should run interval when enabled", () => {
    const callback = vi.fn();
    renderHook(() => useIntervalWhen(callback, 100, true));

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should not run interval when disabled", () => {
    const callback = vi.fn();
    renderHook(() => useIntervalWhen(callback, 100, false));

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it("should run immediately if requested", () => {
    const callback = vi.fn();
    renderHook(() => useIntervalWhen(callback, 100, true, true));

    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });
});
