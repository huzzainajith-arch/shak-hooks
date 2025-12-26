import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

describe("React: useDebounce", () => {
  it("should debounce value", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: "initial", delay: 500 },
    });

    expect(result.current).toBe("initial");

    rerender({ value: "changed", delay: 500 });
    expect(result.current).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(result.current).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(result.current).toBe("changed");

    vi.useRealTimers();
  });
});
