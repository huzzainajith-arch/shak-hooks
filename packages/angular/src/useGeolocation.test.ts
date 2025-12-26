import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useGeolocation } from "./useGeolocation";

describe("Angular: useGeolocation", () => {
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
    // Mock injector to avoid error
    const mockInjector = {
      get: vi.fn().mockReturnValue({ onDestroy: vi.fn() }),
    };
    
    useGeolocation(undefined, mockInjector as any);
    expect(getCurrentPositionMock).toHaveBeenCalled();
    expect(watchPositionMock).toHaveBeenCalled();
  });
});
