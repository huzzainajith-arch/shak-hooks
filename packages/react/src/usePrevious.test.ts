import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePrevious } from "./usePrevious";

describe("React: usePrevious", () => {
  it("should return undefined initially", () => {
    const { result } = renderHook(() => usePrevious("initial"));
    expect(result.current).toBeUndefined();
  });

  it("should return previous value after update", () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: "initial" },
    });
    
    expect(result.current).toBeUndefined();
    
    rerender({ value: "updated" });
    expect(result.current).toBe("initial");
    
    rerender({ value: "updated again" });
    expect(result.current).toBe("updated");
  });
});
