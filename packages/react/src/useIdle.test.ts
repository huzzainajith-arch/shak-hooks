import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useIdle } from "./useIdle";

describe("React: useIdle", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("becomes idle after timeout and resets on activity", () => {
    vi.useFakeTimers();

    const { result } = renderHook(() => useIdle(1000));
    expect(result.current).toBe(false);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(true);

    act(() => {
      window.dispatchEvent(new Event("mousemove"));
    });
    expect(result.current).toBe(false);
  });
});

