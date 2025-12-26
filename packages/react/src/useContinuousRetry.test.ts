import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useContinuousRetry } from "./useContinuousRetry";

describe("React: useContinuousRetry", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should resolve when callback returns true", async () => {
    const callback = vi.fn().mockReturnValue(true);
    const { result } = renderHook(() => useContinuousRetry(callback, 100));

    expect(result.current).toBe(false);

    await act(async () => {
      vi.advanceTimersByTime(100);
    });

    expect(callback).toHaveBeenCalled();
    expect(result.current).toBe(true);
  });

  it("should retry until callback returns true", async () => {
    const callback = vi.fn()
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValue(true);

    const { result } = renderHook(() => useContinuousRetry(callback, 100));

    await act(async () => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe(false);

    await act(async () => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe(false);

    await act(async () => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe(true);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it("should stop retrying after maxRetries", async () => {
    const callback = vi.fn().mockReturnValue(false);
    const { result } = renderHook(() => useContinuousRetry(callback, 100, { maxRetries: 2 }));

    await act(async () => {
      vi.advanceTimersByTime(100);
    });
    await act(async () => {
      vi.advanceTimersByTime(100);
    });
    await act(async () => {
      vi.advanceTimersByTime(100);
    });

    expect(callback).toHaveBeenCalledTimes(2);
    expect(result.current).toBe(false);
  });
});
