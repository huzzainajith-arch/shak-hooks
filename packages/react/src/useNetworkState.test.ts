import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useNetworkState } from "./useNetworkState";

describe("React: useNetworkState", () => {
  const originalOnLine = navigator.onLine;

  beforeEach(() => {
    Object.defineProperty(navigator, "onLine", {
      value: true,
      writable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(navigator, "onLine", {
      value: originalOnLine,
      writable: true,
    });
  });

  it("should return online status", () => {
    const { result } = renderHook(() => useNetworkState());
    expect(result.current.online).toBe(true);
  });

  it("should update on offline/online events", () => {
    const { result } = renderHook(() => useNetworkState());

    act(() => {
      Object.defineProperty(navigator, "onLine", {
        value: false,
        writable: true,
      });
      window.dispatchEvent(new Event("offline"));
    });

    expect(result.current.online).toBe(false);

    act(() => {
      Object.defineProperty(navigator, "onLine", {
        value: true,
        writable: true,
      });
      window.dispatchEvent(new Event("online"));
    });

    expect(result.current.online).toBe(true);
  });
});
