import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useVisibilityChange } from "./useVisibilityChange";

describe("React: useVisibilityChange", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("updates when document visibility changes", () => {
    let state = "visible";
    const originalDescriptor = Object.getOwnPropertyDescriptor(document, "visibilityState");
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      get: () => state,
    });

    const { result } = renderHook(() => useVisibilityChange());
    expect(result.current).toBe(true);

    act(() => {
      state = "hidden";
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(result.current).toBe(false);

    if (originalDescriptor) Object.defineProperty(document, "visibilityState", originalDescriptor);
  });
});

