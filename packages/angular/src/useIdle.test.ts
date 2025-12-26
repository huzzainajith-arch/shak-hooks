import { describe, it, expect, vi, afterEach } from "vitest";
import { useIdle } from "./useIdle";
import { createAngularTestContext } from "./test-utils";

describe("Angular: useIdle", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("becomes idle after timeout and resets on activity", () => {
    vi.useFakeTimers();

    const ctx = createAngularTestContext();
    const idle = ctx.run(() => useIdle(1000, ctx.injector));

    expect(idle()).toBe(false);

    vi.advanceTimersByTime(1000);
    expect(idle()).toBe(true);

    window.dispatchEvent(new Event("mousemove"));
    expect(idle()).toBe(false);

    vi.advanceTimersByTime(1000);
    expect(idle()).toBe(true);

    ctx.destroy();
  });

  it("removes listeners on destroy", () => {
    vi.useFakeTimers();

    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const ctx = createAngularTestContext();
    ctx.run(() => useIdle(1000, ctx.injector));

    expect(addSpy).toHaveBeenCalled();

    ctx.destroy();
    expect(removeSpy).toHaveBeenCalled();
  });
});

