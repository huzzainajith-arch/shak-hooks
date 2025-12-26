import { describe, it, expect, vi, afterEach } from "vitest";
import { signal } from "@angular/core";
import { useLockBodyScroll } from "./useLockBodyScroll";
import { createAngularTestContext, flushAngularEffects } from "./test-utils";

describe("Angular: useLockBodyScroll", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("locks and unlocks body scroll", () => {
    const ctx = createAngularTestContext();
    const locked = signal(true);
    const original = document.body.style.overflow;

    ctx.run(() => {
      useLockBodyScroll(locked, ctx.injector);
      flushAngularEffects(ctx.injector);
    });

    expect(document.body.style.overflow).toBe("hidden");

    locked.set(false);
    flushAngularEffects(ctx.injector);
    expect(document.body.style.overflow).toBe(original);

    ctx.destroy();
    expect(document.body.style.overflow).toBe(original);
  });
});

