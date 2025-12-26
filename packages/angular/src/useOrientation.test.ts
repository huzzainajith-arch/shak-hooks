import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useOrientation } from "./useOrientation";

describe("Angular: useOrientation", () => {
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
    const { angle, type } = useOrientation();
    expect(angle()).toBe(0);
    expect(type()).toBe("landscape-primary");
  });
});
