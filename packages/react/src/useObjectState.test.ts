import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useObjectState } from "./useObjectState";

describe("React: useObjectState", () => {
  it("merges updates", () => {
    const { result } = renderHook(() => useObjectState({ a: 1, b: 2 }));

    act(() => {
      result.current[1]({ b: 3 });
    });
    expect(result.current[0]).toEqual({ a: 1, b: 3 });

    act(() => {
      result.current[1]((prev) => ({ a: prev.a + 1 }));
    });
    expect(result.current[0]).toEqual({ a: 2, b: 3 });
  });
});

