import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDefault } from "./useDefault";

describe("React: useDefault", () => {
  it("should return initial value if not null/undefined", () => {
    const { result } = renderHook(() => useDefault("initial", "default"));
    expect(result.current[0]).toBe("initial");
  });

  it("should return default value if state is null", () => {
    const { result } = renderHook(() => useDefault(null, "default"));
    expect(result.current[0]).toBe("default");
  });

  it("should return default value if state is undefined", () => {
    const { result } = renderHook(() => useDefault(undefined, "default"));
    expect(result.current[0]).toBe("default");
  });

  it("should update state", () => {
    const { result } = renderHook(() => useDefault<string | null>("initial", "default"));
    
    act(() => {
      result.current[1]("new value");
    });
    expect(result.current[0]).toBe("new value");
    
    act(() => {
      result.current[1](null);
    });
    expect(result.current[0]).toBe("default");
  });
});
