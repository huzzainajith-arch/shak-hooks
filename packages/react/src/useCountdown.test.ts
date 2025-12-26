import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCountdown } from "./useCountdown";

describe("React: useCountdown", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should initialize with count", () => {
    const { result } = renderHook(() => useCountdown(10));
    expect(result.current.count).toBe(10);
  });

  it("should countdown", () => {
    const { result } = renderHook(() => useCountdown(10));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.count).toBe(9);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.count).toBe(7);
  });

  it("should stop at 0", () => {
    const { result } = renderHook(() => useCountdown(2));

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.count).toBe(0);
  });

  it("should stop and reset", () => {
    const { result } = renderHook(() => useCountdown(10));

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.count).toBe(9);

    act(() => {
      result.current.stop();
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.count).toBe(9);

    act(() => {
      result.current.reset();
    });
    expect(result.current.count).toBe(10);
  });
});
