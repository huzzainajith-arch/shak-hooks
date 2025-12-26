import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useTimeout } from "./useTimeout";

describe("React: useTimeout", () => {
  it("should call callback after delay", () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    renderHook(() => useTimeout(callback, 1000));

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it("should cancel timeout on unmount", () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    const { unmount } = renderHook(() => useTimeout(callback, 1000));

    unmount();
    vi.advanceTimersByTime(1000);
    expect(callback).not.toHaveBeenCalled();

    vi.useRealTimers();
  });
});
