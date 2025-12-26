import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useWindowScroll } from "./useWindowScroll";

describe("React: useWindowScroll", () => {
  beforeEach(() => {
    window.scrollX = 0;
    window.scrollY = 0;
  });

  it("should return scroll position", () => {
    const { result } = renderHook(() => useWindowScroll());
    expect(result.current).toEqual({ x: 0, y: 0 });
  });

  it("should update on scroll", () => {
    const { result } = renderHook(() => useWindowScroll());

    act(() => {
      window.scrollX = 100;
      window.scrollY = 200;
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toEqual({ x: 100, y: 200 });
  });
});
