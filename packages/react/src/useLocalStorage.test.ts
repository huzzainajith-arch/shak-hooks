import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

describe("React: useLocalStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("should initialize with default value", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "default"));
    expect(result.current[0]).toBe("default");
  });

  it("should initialize with value from localStorage", () => {
    window.localStorage.setItem("test-key", JSON.stringify("stored"));
    const { result } = renderHook(() => useLocalStorage("test-key", "default"));
    expect(result.current[0]).toBe("stored");
  });

  it("should update localStorage when state changes", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "default"));
    
    act(() => {
      result.current[1]("new value");
    });
    
    expect(result.current[0]).toBe("new value");
    expect(window.localStorage.getItem("test-key")).toBe(JSON.stringify("new value"));
  });
});
