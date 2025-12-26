import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useGeolocation } from "./useGeolocation";

// Mock onMounted/onUnmounted
vi.mock("vue", async (importOriginal) => {
  const actual = await importOriginal<typeof import("vue")>();
  return {
    ...actual,
    onMounted: (fn: () => void) => fn(),
    onUnmounted: vi.fn(),
  };
});

describe("Vue: useGeolocation", () => {
  const originalGeolocation = navigator.geolocation;
  let getCurrentPositionMock: any;
  let watchPositionMock: any;
  let clearWatchMock: any;

  beforeEach(() => {
    getCurrentPositionMock = vi.fn();
    watchPositionMock = vi.fn();
    clearWatchMock = vi.fn();

    const mockGeolocation = {
      getCurrentPosition: getCurrentPositionMock,
      watchPosition: watchPositionMock,
      clearWatch: clearWatchMock,
    };

    Object.defineProperty(navigator, "geolocation", {
      value: mockGeolocation,
      writable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(navigator, "geolocation", {
      value: originalGeolocation,
      writable: true,
    });
  });

  it("should get current position", () => {
    useGeolocation();
    expect(getCurrentPositionMock).toHaveBeenCalled();
    expect(watchPositionMock).toHaveBeenCalled();
  });
});
