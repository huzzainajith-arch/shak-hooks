import { describe, it, expect, vi } from "vitest";
import { useThrottle } from "./useThrottle";
import { signal } from "@angular/core";
import { createAngularTestContext, flushAngularEffects } from "./test-utils";

describe("Angular: useThrottle", () => {
  it("should throttle value updates", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(0));

    const ctx = createAngularTestContext();
    ctx.run(() => {
      const value = signal("initial");
      const throttledValue = useThrottle(value, 1000);
      flushAngularEffects(ctx.injector);

      expect(throttledValue()).toBe("initial");

      value.set("updated");
      flushAngularEffects(ctx.injector);
      expect(throttledValue()).toBe("initial");

      vi.advanceTimersByTime(1000);
      expect(throttledValue()).toBe("updated");
    });

    ctx.destroy();
    vi.clearAllTimers();
    vi.useRealTimers();
  });
});
