import { describe, it, expect, vi, afterEach } from "vitest";
import { useVisibilityChange } from "./useVisibilityChange";
import { createAngularTestContext } from "./test-utils";

describe("Angular: useVisibilityChange", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("updates when document visibility changes and cleans up", () => {
    const removeSpy = vi.spyOn(document, "removeEventListener");

    let state = "visible";
    const originalDescriptor = Object.getOwnPropertyDescriptor(document, "visibilityState");
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      get: () => state,
    });

    const ctx = createAngularTestContext();
    const isVisible = ctx.run(() => useVisibilityChange());

    expect(isVisible()).toBe(true);

    state = "hidden";
    document.dispatchEvent(new Event("visibilitychange"));
    expect(isVisible()).toBe(false);

    ctx.destroy();
    expect(removeSpy).toHaveBeenCalledWith("visibilitychange", expect.any(Function));

    if (originalDescriptor) Object.defineProperty(document, "visibilityState", originalDescriptor);
  });
});

