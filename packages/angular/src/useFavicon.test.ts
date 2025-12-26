import { describe, it, expect } from "vitest";
import { useFavicon } from "./useFavicon";
import { signal } from "@angular/core";
import { createAngularTestContext, flushAngularEffects } from "./test-utils";

describe("Angular: useFavicon", () => {
  it("should set favicon", () => {
    const href = signal("favicon1.ico");

    const ctx = createAngularTestContext();
    ctx.run(() => {
      useFavicon(href, ctx.injector);
      flushAngularEffects(ctx.injector);
    });

    const link1 = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null;
    expect(link1).toBeTruthy();
    expect(link1!.href).toContain("favicon1.ico");

    href.set("favicon2.ico");
    flushAngularEffects(ctx.injector);

    const link2 = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null;
    expect(link2).toBeTruthy();
    expect(link2!.href).toContain("favicon2.ico");

    ctx.destroy();
  });
});
