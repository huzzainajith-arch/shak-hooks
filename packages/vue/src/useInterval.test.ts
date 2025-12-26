import { describe, it, expect, vi } from "vitest";
import { useInterval } from "./useInterval";

// Mock onMounted/onUnmounted
vi.mock("vue", async (importOriginal) => {
  const actual = await importOriginal<typeof import("vue")>();
  return {
    ...actual,
    onMounted: (fn: () => void) => fn(),
    onUnmounted: vi.fn(),
  };
});

describe("Vue: useInterval", () => {
  it("should call callback repeatedly", () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    useInterval(callback, 1000);

    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
  });
});
