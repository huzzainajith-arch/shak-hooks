import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSet } from "./useSet";

describe("React: useSet", () => {
  it("should initialize correctly", () => {
    const { result } = renderHook(() => useSet(["value"]));
    expect(result.current[0].has("value")).toBe(true);
  });

  it("should add value", () => {
    const { result } = renderHook(() => useSet<string>());
    
    act(() => {
      result.current[1].add("value");
    });
    expect(result.current[0].has("value")).toBe(true);
  });

  it("should remove value", () => {
    const { result } = renderHook(() => useSet(["value"]));
    
    act(() => {
      result.current[1].remove("value");
    });
    expect(result.current[0].has("value")).toBe(false);
  });

  it("should clear set", () => {
    const { result } = renderHook(() => useSet(["value"]));
    
    act(() => {
      result.current[1].clear();
    });
    expect(result.current[0].size).toBe(0);
  });
});
