import { describe, it, expect, vi } from "vitest";
import { useDebounce } from "./useDebounce";
import { signal } from "@angular/core";
import { createAngularTestContext, flushAngularEffects } from "./test-utils";

describe("Angular: useDebounce", () => {
  it("should debounce value", () => {
    vi.useFakeTimers();
    const ctx = createAngularTestContext();

    ctx.run(() => {
      const value = signal("initial");
      const debounced = useDebounce(value, 200);
      flushAngularEffects(ctx.injector);

      expect(debounced()).toBe("initial");

      value.set("next");
      flushAngularEffects(ctx.injector);
      vi.advanceTimersByTime(199);
      expect(debounced()).toBe("initial");

      vi.advanceTimersByTime(1);
      expect(debounced()).toBe("next");
    });

    ctx.destroy();
    vi.useRealTimers();
  });
});
