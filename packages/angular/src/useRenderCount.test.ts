import { describe, it, expect, vi } from "vitest";
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
import { useRenderCount } from "./useRenderCount";

describe("Angular: useRenderCount", () => {
  it("increments on afterRender", () => {
    renderCallbacks = [];
    const ctx = createAngularTestContext();

    const count = ctx.run(() => useRenderCount(ctx.injector));
    expect(count()).toBe(0);

    expect(renderCallbacks.length).toBe(1);
    renderCallbacks[0]!();
    expect(count()).toBe(1);
    renderCallbacks[0]!();
    expect(count()).toBe(2);

    ctx.destroy();
  });
});

