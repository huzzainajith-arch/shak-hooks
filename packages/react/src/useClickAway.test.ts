import { describe, it, expect, vi } from "vitest";
import { renderHook, fireEvent } from "@testing-library/react";
import { useClickAway } from "./useClickAway";
import { useRef } from "react";

describe("React: useClickAway", () => {
  it("should call handler when clicking outside", () => {
    const handler = vi.fn();
    const { result } = renderHook(() => {
      const ref = useRef(document.createElement("div"));
      useClickAway(ref, handler);
      return ref;
    });

    // Click outside
    fireEvent.mouseDown(document.body);
    expect(handler).toHaveBeenCalled();
  });

  it("should not call handler when clicking inside", () => {
    const handler = vi.fn();
    const { result } = renderHook(() => {
      const ref = useRef(document.createElement("div"));
      useClickAway(ref, handler);
      return ref;
    });

    // Click inside
    fireEvent.mouseDown(result.current.current);
    expect(handler).not.toHaveBeenCalled();
  });
});
