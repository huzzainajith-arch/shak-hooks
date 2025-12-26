import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useFavicon } from "./useFavicon";

describe("React: useFavicon", () => {
  it("should set favicon", () => {
    const { rerender } = renderHook(({ href }) => useFavicon(href), {
      initialProps: { href: "favicon1.ico" },
    });

    let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    expect(link).toBeTruthy();
    expect(link.href).toContain("favicon1.ico");

    rerender({ href: "favicon2.ico" });
    link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    expect(link.href).toContain("favicon2.ico");
  });
});
