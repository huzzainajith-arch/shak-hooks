import { describe, it, expect, vi } from "vitest";
import { useLongPress } from "./useLongPress";

describe("Vue: useLongPress", () => {
  it("should trigger callback after threshold", () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    const handlers = useLongPress(callback, { threshold: 500 });
    
    handlers.onMouseDown({} as any);
    
    expect(callback).not.toHaveBeenCalled();
    
    vi.advanceTimersByTime(500);
    
    expect(callback).toHaveBeenCalled();
    
    vi.useRealTimers();
  });

  it("should cancel if released before threshold", () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    const handlers = useLongPress(callback, { threshold: 500 });
    
    handlers.onMouseDown({} as any);
    vi.advanceTimersByTime(200);
    handlers.onMouseUp({} as any);
    
    vi.advanceTimersByTime(300);
    expect(callback).not.toHaveBeenCalled();
    
    vi.useRealTimers();
  });
});
