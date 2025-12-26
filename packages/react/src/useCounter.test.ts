import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";

describe("React: useCounter", () => {
  it("should initialize correctly", () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current[0]).toBe(10);
  });

  it("should increment", () => {
    const { result } = renderHook(() => useCounter(0));
    act(() => {
      result.current[1].inc();
    });
    expect(result.current[0]).toBe(1);
  });

  it("should respect min/max", () => {
    const { result } = renderHook(() => useCounter(0, { min: 0, max: 5 }));
    act(() => {
      result.current[1].set(10);
    });
    expect(result.current[0]).toBe(5);
  });
});
