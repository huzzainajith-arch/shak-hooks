import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useSessionStorage } from "./useSessionStorage";
import { createAngularTestContext, flushAngularEffects } from "./test-utils";

describe("Angular: useSessionStorage", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return initial value", () => {
    const ctx = createAngularTestContext();
    const state = ctx.run(() => useSessionStorage("key", "initial"));
    flushAngularEffects(ctx.injector);

    expect(state()).toBe("initial");
    expect(window.sessionStorage.getItem("key")).toBe(JSON.stringify("initial"));

    ctx.destroy();
  });

  it("should update session storage", () => {
    const ctx = createAngularTestContext();
    const state = ctx.run(() => useSessionStorage("key", "initial"));
    flushAngularEffects(ctx.injector);

    state.set("updated");
    flushAngularEffects(ctx.injector);

    expect(window.sessionStorage.getItem("key")).toBe(JSON.stringify("updated"));
    ctx.destroy();
  });

  it("should initialize from session storage", () => {
    window.sessionStorage.setItem("key", JSON.stringify("existing"));
    const ctx = createAngularTestContext();
    const state = ctx.run(() => useSessionStorage("key", "initial"));
    flushAngularEffects(ctx.injector);

    expect(state()).toBe("existing");
    ctx.destroy();
  });
});
