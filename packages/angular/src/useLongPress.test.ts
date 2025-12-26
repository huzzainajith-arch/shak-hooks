import { describe, it, expect, vi } from "vitest";
import { useLongPress } from "./useLongPress";
import { Injector, DestroyRef } from "@angular/core";

describe("Angular: useLongPress", () => {
  it("should trigger callback after threshold", () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    
    // Mock Injector and DestroyRef
    const mockDestroyRef = { onDestroy: vi.fn() };
    const mockInjector = {
      get: (token: any) => {
        if (token === DestroyRef) return mockDestroyRef;
        return null;
      }
    } as unknown as Injector;

    const handlers = useLongPress(callback, { threshold: 500 }, mockInjector);
    
    handlers.onMouseDown({} as any);
    
    expect(callback).not.toHaveBeenCalled();
    
    vi.advanceTimersByTime(500);
    
    expect(callback).toHaveBeenCalled();
    
    vi.useRealTimers();
  });

  it("should cancel if released before threshold", () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    
    const mockDestroyRef = { onDestroy: vi.fn() };
    const mockInjector = {
      get: (token: any) => {
        if (token === DestroyRef) return mockDestroyRef;
        return null;
      }
    } as unknown as Injector;

    const handlers = useLongPress(callback, { threshold: 500 }, mockInjector);
    
    handlers.onMouseDown({} as any);
    vi.advanceTimersByTime(200);
    handlers.onMouseUp({} as any);
    
    vi.advanceTimersByTime(300);
    expect(callback).not.toHaveBeenCalled();
    
    vi.useRealTimers();
  });
});
