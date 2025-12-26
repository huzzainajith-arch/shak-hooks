import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useGeolocation } from "./useGeolocation";

describe("React: useGeolocation", () => {
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
    const { unmount } = renderHook(() => useGeolocation());
    expect(getCurrentPositionMock).toHaveBeenCalled();
    expect(watchPositionMock).toHaveBeenCalled();
    unmount();
  });
});
