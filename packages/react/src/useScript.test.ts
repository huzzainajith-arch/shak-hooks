import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useScript } from "./useScript";

describe("React: useScript", () => {
  afterEach(() => {
    document.head.innerHTML = "";
    document.body.innerHTML = "";
  });

  it("should load script", () => {
    const { result } = renderHook(() => useScript("https://example.com/script.js"));
    
    expect(result.current).toBe("loading");
    
    const script = document.querySelector('script[src="https://example.com/script.js"]');
    expect(script).toBeTruthy();

    act(() => {
      script?.dispatchEvent(new Event("load"));
    });

    expect(result.current).toBe("ready");
  });
});
