import { describe, it, expect, vi } from "vitest";
import type { Injector } from "@angular/core";

let nextCallbacks: Array<() => void> = [];

vi.mock("@angular/core", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@angular/core")>();
  return {
    ...actual,
    afterNextRender: (cb: () => void, _opts?: { injector?: Injector }) => {
      nextCallbacks.push(cb);
    },
  };
});

import { createAngularTestContext } from "./test-utils";
import { useIsFirstRender } from "./useIsFirstRender";

describe("Angular: useIsFirstRender", () => {
  it("is true until afterNextRender runs", () => {
    nextCallbacks = [];
    const ctx = createAngularTestContext();

    const isFirst = ctx.run(() => useIsFirstRender(ctx.injector));
    expect(isFirst()).toBe(true);

    expect(nextCallbacks.length).toBe(1);
    nextCallbacks[0]!();
    expect(isFirst()).toBe(false);

    ctx.destroy();
  });
});

