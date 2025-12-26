import { describe, it, expect, vi, afterEach } from "vitest";
import { useScript } from "./useScript";

describe("Angular: useScript", () => {
  afterEach(() => {
    document.head.innerHTML = "";
    document.body.innerHTML = "";
  });

  it("should load script", () => {
    const status = useScript("https://example.com/script.js");
    
    expect(status()).toBe("loading");
    
    const script = document.querySelector('script[src="https://example.com/script.js"]');
    expect(script).toBeTruthy();

    script?.dispatchEvent(new Event("load"));

    expect(status()).toBe("ready");
  });
});
