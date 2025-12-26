import { describe, it, expect } from "vitest";
import { PLATFORM_ID } from "@angular/core";
import { useIsClient } from "./useIsClient";
import { createAngularTestContext } from "./test-utils";

describe("Angular: useIsClient", () => {
  it("is true on browser platform", () => {
    const ctx = createAngularTestContext();
    const isClient = ctx.run(() => useIsClient(ctx.injector));
    ctx.destroy();
    expect(isClient()).toBe(true);
  });

  it("is false on server platform", () => {
    const ctx = createAngularTestContext([{ provide: PLATFORM_ID, useValue: "server" }]);
    const isClient = ctx.run(() => useIsClient(ctx.injector));
    ctx.destroy();
    expect(isClient()).toBe(false);
  });
});

