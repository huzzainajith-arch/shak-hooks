import { describe, it, expect, vi } from "vitest";
import { useTimeout } from "./useTimeout";

// Mock onMounted/onUnmounted
vi.mock("vue", async (importOriginal) => {
  const actual = await importOriginal<typeof import("vue")>();
  return {
    ...actual,
    onMounted: (fn: () => void) => fn(),
    onUnmounted: vi.fn(),
  };
});

describe("Vue: useTimeout", () => {
  it("should call callback after delay", () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    useTimeout(callback, 1000);

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });
});
