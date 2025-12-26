import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useQueue } from "./useQueue";

describe("React: useQueue", () => {
  it("should initialize correctly", () => {
    const { result } = renderHook(() => useQueue([1, 2]));
    expect(result.current.queue).toEqual([1, 2]);
    expect(result.current.size).toBe(2);
  });

  it("should add element", () => {
    const { result } = renderHook(() => useQueue<number>());
    
    act(() => {
      result.current.add(1);
    });
    expect(result.current.queue).toEqual([1]);
  });

  it("should remove element", () => {
    const { result } = renderHook(() => useQueue([1, 2]));
    
    act(() => {
      const removed = result.current.remove();
      expect(removed).toBe(1);
    });
    expect(result.current.queue).toEqual([2]);
  });

  it("should clear queue", () => {
    const { result } = renderHook(() => useQueue([1, 2]));
    
    act(() => {
      result.current.clear();
    });
    expect(result.current.queue).toEqual([]);
  });
});
