import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useIntersectionObserver } from "./useIntersectionObserver";
import { signal } from "@angular/core";
import { createAngularTestContext, flushAngularEffects } from "./test-utils";

describe("Angular: useIntersectionObserver", () => {
  let observeMock: any;
  let disconnectMock: any;

  beforeEach(() => {
    observeMock = vi.fn();
    disconnectMock = vi.fn();
    global.IntersectionObserver = vi.fn().mockImplementation(function (this: any, cb: any) {
      return {
        observe: (el: any) => {
          observeMock(el);
          queueMicrotask(() => cb([{ isIntersecting: true, target: el }]));
        },
        disconnect: disconnectMock,
      };
    }) as any;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should observe element", async () => {
    const el = document.createElement("div");
    const target = signal<Element | null>(el);

    const ctx = createAngularTestContext();
    const entry = ctx.run(() => useIntersectionObserver(target));
    flushAngularEffects(ctx.injector);

    expect(observeMock).toHaveBeenCalledWith(el);

    await Promise.resolve();
    expect(entry()?.isIntersecting).toBe(true);

    ctx.destroy();
    expect(disconnectMock).toHaveBeenCalled();
  });
});
