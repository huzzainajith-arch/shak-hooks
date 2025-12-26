import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useList } from "./useList";

describe("React: useList", () => {
  it("should initialize correctly", () => {
    const { result } = renderHook(() => useList([1, 2, 3]));
    expect(result.current[0]).toEqual([1, 2, 3]);
  });

  it("should push items", () => {
    const { result } = renderHook(() => useList([1]));
    act(() => {
      result.current[1].push(2, 3);
    });
    expect(result.current[0]).toEqual([1, 2, 3]);
  });

  it("should set items", () => {
    const { result } = renderHook(() => useList([1]));
    act(() => {
      result.current[1].set([4, 5]);
    });
    expect(result.current[0]).toEqual([4, 5]);
  });

  it("should update at index", () => {
    const { result } = renderHook(() => useList([1, 2, 3]));
    act(() => {
      result.current[1].updateAt(1, 5);
    });
    expect(result.current[0]).toEqual([1, 5, 3]);
  });

  it("should remove at index", () => {
    const { result } = renderHook(() => useList([1, 2, 3]));
    act(() => {
      result.current[1].removeAt(1);
    });
    expect(result.current[0]).toEqual([1, 3]);
  });

  it("should clear list", () => {
    const { result } = renderHook(() => useList([1, 2, 3]));
    act(() => {
      result.current[1].clear();
    });
    expect(result.current[0]).toEqual([]);
  });

  it("should reset list", () => {
    const { result } = renderHook(() => useList([1, 2, 3]));
    act(() => {
      result.current[1].set([4, 5]);
      result.current[1].reset();
    });
    expect(result.current[0]).toEqual([1, 2, 3]);
  });
});
