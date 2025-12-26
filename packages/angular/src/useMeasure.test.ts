import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useMeasure } from "./useMeasure";
import { createAngularTestContext, flushAngularEffects } from "./test-utils";

describe("Angular: useMeasure", () => {
  let observeMock: any;
  let disconnectMock: any;

  beforeEach(() => {
    observeMock = vi.fn();
    disconnectMock = vi.fn();
    global.ResizeObserver = vi.fn().mockImplementation(function (this: any, cb: any) {
      return {
        observe: (el: any) => {
          observeMock(el);
          queueMicrotask(() =>
            cb([
              {
                contentRect: {
                  width: 123,
                  height: 45,
                  x: 0,
                  y: 0,
                  top: 0,
                  left: 0,
                  right: 123,
                  bottom: 45,
                },
              },
            ])
          );
        },
        disconnect: disconnectMock,
      };
    }) as any;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with default rect", async () => {
    const el = document.createElement("div");

    const ctx = createAngularTestContext();
    const [ref, rect] = ctx.run(() => useMeasure());
    flushAngularEffects(ctx.injector);

    expect(rect().width).toBe(0);
    expect(rect().height).toBe(0);

    ref.set(el as any);
    flushAngularEffects(ctx.injector);

    expect(observeMock).toHaveBeenCalledWith(el);

    await Promise.resolve();
    expect(rect().width).toBe(123);
    expect(rect().height).toBe(45);

    ctx.destroy();
    expect(disconnectMock).toHaveBeenCalled();
  });
});
