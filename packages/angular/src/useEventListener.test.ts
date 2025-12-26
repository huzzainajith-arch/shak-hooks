import { describe, it, expect, vi } from "vitest";
import { signal } from "@angular/core";
import { useEventListener } from "./useEventListener";
import { createAngularTestContext, flushAngularEffects } from "./test-utils";

describe("Angular: useEventListener", () => {
  it("attaches and removes listener on window", () => {
    const ctx = createAngularTestContext();

    const handler = vi.fn();
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");

    ctx.run(() => {
      useEventListener("click", handler);
    });

    expect(addSpy).toHaveBeenCalledWith("click", handler);

    window.dispatchEvent(new Event("click"));
    expect(handler).toHaveBeenCalledTimes(1);

    ctx.destroy();
    expect(removeSpy).toHaveBeenCalledWith("click", handler);
  });

  it("re-attaches when Signal target changes", () => {
    const ctx = createAngularTestContext();

    const handler = vi.fn();
    const el1 = document.createElement("div");
    const el2 = document.createElement("div");
    const target = signal<EventTarget | null>(el1);

    const add1 = vi.spyOn(el1, "addEventListener");
    const remove1 = vi.spyOn(el1, "removeEventListener");
    const add2 = vi.spyOn(el2, "addEventListener");

    ctx.run(() => {
      useEventListener(target, "click", handler);
      flushAngularEffects(ctx.injector);
    });

    expect(add1).toHaveBeenCalledWith("click", handler);

    target.set(el2);
    flushAngularEffects(ctx.injector);

    expect(remove1).toHaveBeenCalledWith("click", handler);
    expect(add2).toHaveBeenCalledWith("click", handler);

    ctx.destroy();
  });
});

