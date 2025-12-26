import { describe, it, expect } from "vitest";
import { useFavicon } from "./useFavicon";
import { ref, nextTick } from "vue";

describe("Vue: useFavicon", () => {
  it("should set favicon", async () => {
    const href = ref("favicon1.ico");
    useFavicon(href);

    let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    expect(link).toBeTruthy();
    expect(link.href).toContain("favicon1.ico");

    href.value = "favicon2.ico";
    await nextTick();
    
    link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    expect(link.href).toContain("favicon2.ico");
  });
});
