import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useKeyPress } from "./useKeyPress";

describe("React: useKeyPress", () => {
  it("should detect key press", () => {
    const { result } = renderHook(() => useKeyPress("a"));

    expect(result.current).toBe(false);

    act(() => {
      const event = new KeyboardEvent("keydown", { key: "a" });
      window.dispatchEvent(event);
    });

    expect(result.current).toBe(true);

    act(() => {
      const event = new KeyboardEvent("keyup", { key: "a" });
      window.dispatchEvent(event);
    });

    expect(result.current).toBe(false);
  });
});
