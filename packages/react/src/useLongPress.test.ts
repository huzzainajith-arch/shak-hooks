import { describe, it, expect, vi } from "vitest";
import { renderHook, fireEvent } from "@testing-library/react";
import { useLongPress } from "./useLongPress";

describe("React: useLongPress", () => {
  it("should trigger callback after threshold", () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    const { result } = renderHook(() => useLongPress(callback, { threshold: 500 }));
    
    // Simulate mouse down
    // Note: We can't easily simulate events on the hook result directly without a component,
    // but we can call the handlers returned by the hook.
    
    const handlers = result.current;
    
    handlers.onMouseDown({} as any);
    
    expect(callback).not.toHaveBeenCalled();
    
    vi.advanceTimersByTime(500);
    
    expect(callback).toHaveBeenCalled();
    
    vi.useRealTimers();
  });

  it("should cancel if released before threshold", () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    const { result } = renderHook(() => useLongPress(callback, { threshold: 500 }));
    
    const handlers = result.current;
    
    handlers.onMouseDown({} as any);
    vi.advanceTimersByTime(200);
    handlers.onMouseUp({} as any);
    
    vi.advanceTimersByTime(300);
    expect(callback).not.toHaveBeenCalled();
    
    vi.useRealTimers();
  });
});
