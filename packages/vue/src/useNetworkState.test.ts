import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useNetworkState } from "./useNetworkState";

// Mock onMounted/onUnmounted
vi.mock("vue", async (importOriginal) => {
  const actual = await importOriginal<typeof import("vue")>();
  return {
    ...actual,
    onMounted: (fn: () => void) => fn(),
    onUnmounted: vi.fn(),
  };
});

describe("Vue: useNetworkState", () => {
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
    expect(state.value.online).toBe(true);
  });

  it("should update on offline/online events", () => {
    const state = useNetworkState();

    Object.defineProperty(navigator, "onLine", {
      value: false,
      writable: true,
    });
    window.dispatchEvent(new Event("offline"));

    expect(state.value.online).toBe(false);

    Object.defineProperty(navigator, "onLine", {
      value: true,
      writable: true,
    });
    window.dispatchEvent(new Event("online"));

    expect(state.value.online).toBe(true);
  });
});
