import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useWindowSize } from "./useWindowSize";

describe("React: useWindowSize", () => {
  it("should return window size", () => {
    const { result } = renderHook(() => useWindowSize());
    expect(result.current.width).toBe(window.innerWidth);
    expect(result.current.height).toBe(window.innerHeight);
  });

  it("should update on resize", () => {
    const { result } = renderHook(() => useWindowSize());
    
    act(() => {
      window.innerWidth = 500;
      window.innerHeight = 500;
      window.dispatchEvent(new Event("resize"));
    });
    
    expect(result.current.width).toBe(500);
    expect(result.current.height).toBe(500);
  });
});
