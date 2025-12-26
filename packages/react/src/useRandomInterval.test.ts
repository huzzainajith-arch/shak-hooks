import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useRandomInterval } from "./useRandomInterval";

describe("React: useRandomInterval", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should run callback within random interval", () => {
    const callback = vi.fn();
    renderHook(() => useRandomInterval(callback, 100, 200));

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(callback).toHaveBeenCalled();
  });

  it("should stop when cancelled", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useRandomInterval(callback, 100, 200));

    act(() => {
      result.current(); // cancel
      vi.advanceTimersByTime(200);
    });

    expect(callback).not.toHaveBeenCalled();
  });
});
