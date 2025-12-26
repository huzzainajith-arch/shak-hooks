import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useHistoryState } from "./useHistoryState";

describe("React: useHistoryState", () => {
  it("should initialize correctly", () => {
    const { result } = renderHook(() => useHistoryState("initial", "key"));
    expect(result.current[0]).toBe("initial");
  });

  it("should set state and update history", () => {
    const { result } = renderHook(() => useHistoryState("initial", "key"));
    
    act(() => {
      result.current[1]("new");
    });
    expect(result.current[0]).toBe("new");
    expect(window.history.state.key).toBe("new");
  });
});
