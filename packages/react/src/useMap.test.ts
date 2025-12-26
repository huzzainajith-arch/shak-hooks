import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useMap } from "./useMap";

describe("React: useMap", () => {
  it("should initialize correctly", () => {
    const { result } = renderHook(() => useMap([["key", "value"]]));
    expect(result.current[0].get("key")).toBe("value");
  });

  it("should set value", () => {
    const { result } = renderHook(() => useMap<string, string>());
    
    act(() => {
      result.current[1].set("key", "value");
    });
    expect(result.current[0].get("key")).toBe("value");
  });

  it("should remove value", () => {
    const { result } = renderHook(() => useMap([["key", "value"]]));
    
    act(() => {
      result.current[1].remove("key");
    });
    expect(result.current[0].has("key")).toBe(false);
  });

  it("should clear map", () => {
    const { result } = renderHook(() => useMap([["key", "value"]]));
    
    act(() => {
      result.current[1].clear();
    });
    expect(result.current[0].size).toBe(0);
  });
});
