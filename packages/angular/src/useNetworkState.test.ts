import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useNetworkState } from "./useNetworkState";

describe("Angular: useNetworkState", () => {
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
    const state = useNetworkState();
    expect(state().online).toBe(true);
  });

  it("should update on offline/online events", () => {
    const state = useNetworkState();

    Object.defineProperty(navigator, "onLine", {
      value: false,
      writable: true,
    });
    window.dispatchEvent(new Event("offline"));

    expect(state().online).toBe(false);

    Object.defineProperty(navigator, "onLine", {
      value: true,
      writable: true,
    });
    window.dispatchEvent(new Event("online"));

    expect(state().online).toBe(true);
  });
});
