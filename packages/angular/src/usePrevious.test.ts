import { describe, it, expect, vi } from "vitest";
import { usePrevious } from "./usePrevious";
import { signal } from "@angular/core";
import { createAngularTestContext, flushAngularEffects } from "./test-utils";

describe("Angular: usePrevious", () => {
  it("should return undefined initially", () => {
    const ctx = createAngularTestContext();
    const value = signal("initial");
    const previous = ctx.run(() => usePrevious(value));
    flushAngularEffects(ctx.injector);

    expect(previous()).toBeUndefined();
    ctx.destroy();
  });

  it("should return previous value after update", () => {
    const ctx = createAngularTestContext();
    const value = signal("initial");
    const previous = ctx.run(() => usePrevious(value));
    flushAngularEffects(ctx.injector);

    value.set("next");
    flushAngularEffects(ctx.injector);
    expect(previous()).toBe("initial");

    value.set("final");
    flushAngularEffects(ctx.injector);
    expect(previous()).toBe("next");

    ctx.destroy();
  });
});
