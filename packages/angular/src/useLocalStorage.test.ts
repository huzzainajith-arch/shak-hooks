import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useLocalStorage } from "./useLocalStorage";
import { createAngularTestContext, flushAngularEffects } from "./test-utils";

describe("Angular: useLocalStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return initial value", () => {
    const ctx = createAngularTestContext();
    const state = ctx.run(() => useLocalStorage("key", "initial"));
    flushAngularEffects(ctx.injector);

    expect(state()).toBe("initial");
    expect(window.localStorage.getItem("key")).toBe(JSON.stringify("initial"));

    ctx.destroy();
  });

  it("should update local storage", () => {
    const ctx = createAngularTestContext();
    const state = ctx.run(() => useLocalStorage("key", "initial"));
    flushAngularEffects(ctx.injector);

    state.set("updated");
    flushAngularEffects(ctx.injector);

    expect(window.localStorage.getItem("key")).toBe(JSON.stringify("updated"));
    ctx.destroy();
  });

  it("should initialize from local storage", () => {
    window.localStorage.setItem("key", JSON.stringify("existing"));
    const ctx = createAngularTestContext();
    const state = ctx.run(() => useLocalStorage("key", "initial"));
    flushAngularEffects(ctx.injector);

    expect(state()).toBe("existing");
    ctx.destroy();
  });
});
