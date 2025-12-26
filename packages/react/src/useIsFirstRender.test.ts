import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useIsFirstRender } from "./useIsFirstRender";

describe("React: useIsFirstRender", () => {
  it("should return true on first render and false on subsequent renders", () => {
    const { result, rerender } = renderHook(() => useIsFirstRender());
    
    expect(result.current).toBe(true);
    
    rerender();
    expect(result.current).toBe(false);
    
    rerender();
    expect(result.current).toBe(false);
  });
});
