import { describe, it, expect, vi, afterEach } from "vitest";
import { useScript } from "./useScript";

// Mock onMounted/onUnmounted
vi.mock("vue", async (importOriginal) => {
  const actual = await importOriginal<typeof import("vue")>();
  return {
    ...actual,
    onMounted: (fn: () => void) => fn(),
    onUnmounted: vi.fn(),
  };
});

describe("Vue: useScript", () => {
  afterEach(() => {
    document.head.innerHTML = "";
    document.body.innerHTML = "";
  });

  it("should load script", () => {
    const status = useScript("https://example.com/script.js");
    
    expect(status.value).toBe("loading");
    
    const script = document.querySelector('script[src="https://example.com/script.js"]');
    expect(script).toBeTruthy();

    script?.dispatchEvent(new Event("load"));

    expect(status.value).toBe("ready");
  });
});
