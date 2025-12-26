import { describe, it, expect, vi, afterEach } from "vitest";
import type { Injector } from "@angular/core";

let renderCallbacks: Array<() => void> = [];

vi.mock("@angular/core", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@angular/core")>();
  return {
    ...actual,
    afterRender: (cb: () => void, _opts?: { injector?: Injector }) => {
      renderCallbacks.push(cb);
    },
  };
});

import { createAngularTestContext } from "./test-utils";
import { useRenderInfo } from "./useRenderInfo";

describe("Angular: useRenderInfo", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("logs info on afterRender", () => {
    renderCallbacks = [];
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const ctx = createAngularTestContext();
    ctx.run(() => useRenderInfo("Comp", ctx.injector));

    expect(renderCallbacks.length).toBe(1);
    renderCallbacks[0]!();
    renderCallbacks[0]!();

    const calls = logSpy.mock.calls.filter((c) => c[0] === "Comp rendered");
    expect(calls.length).toBe(2);
    expect(calls[0]![1]).toMatchObject({ count: 1 });
    expect(calls[1]![1]).toMatchObject({ count: 2 });

    ctx.destroy();
  });
});

