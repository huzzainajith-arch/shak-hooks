import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useHover } from "./useHover";
import { useRef } from "react";

describe("React: useHover", () => {
  it("should detect hover", () => {
    let ref: any;
    const { result } = renderHook(() => {
      ref = useRef(document.createElement("div"));
      return useHover(ref);
    });

    expect(result.current).toBe(false);

    act(() => {
      const event = new MouseEvent("mouseenter");
      ref.current.dispatchEvent(event);
    });
    
    expect(result.current).toBe(true);

    act(() => {
      const event = new MouseEvent("mouseleave");
      ref.current.dispatchEvent(event);
    });

    expect(result.current).toBe(false);
  });
});
