import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useInterval } from "./useInterval";

describe("React: useInterval", () => {
  it("should call callback repeatedly", () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    renderHook(() => useInterval(callback, 1000));

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
  });

  it("should stop when delay is null", () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    const { rerender } = renderHook(({ delay }) => useInterval(callback, delay), {
      initialProps: { delay: 1000 as number | null },
    });

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    rerender({ delay: null });
    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });
});
