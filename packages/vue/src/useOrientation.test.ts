import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useOrientation } from "./useOrientation";

// Mock onMounted/onUnmounted
vi.mock("vue", async (importOriginal) => {
  const actual = await importOriginal<typeof import("vue")>();
  return {
    ...actual,
    onMounted: (fn: () => void) => fn(),
    onUnmounted: vi.fn(),
  };
});

describe("Vue: useOrientation", () => {
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
    expect(angle.value).toBe(0);
    expect(type.value).toBe("landscape-primary");
  });
});
