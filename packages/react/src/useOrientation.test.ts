import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useOrientation } from "./useOrientation";

describe("React: useOrientation", () => {
  let originalScreen: any;

  beforeEach(() => {
    originalScreen = window.screen;
    Object.defineProperty(window, "screen", {
      value: {
        orientation: {
          angle: 0,
          type: "landscape-primary",
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        },
      },
      writable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, "screen", {
      value: originalScreen,
      writable: true,
    });
  });

  it("should return orientation state", () => {
    const { result } = renderHook(() => useOrientation());
    expect(result.current.angle).toBe(0);
    expect(result.current.type).toBe("landscape-primary");
  });
});
