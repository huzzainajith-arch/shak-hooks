import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useRenderCount } from "./useRenderCount";

describe("React: useRenderCount", () => {
  it("increments on rerender", () => {
    const { result, rerender } = renderHook(() => useRenderCount());
    expect(result.current).toBe(1);

    rerender();
    expect(result.current).toBe(2);

    rerender();
    expect(result.current).toBe(3);
  });
});

