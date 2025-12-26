import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useMouse } from "./useMouse";

describe("React: useMouse", () => {
  it("should track mouse position", () => {
    const { result } = renderHook(() => useMouse());

    expect(result.current.x).toBe(0);
    expect(result.current.y).toBe(0);

    act(() => {
      const event = new MouseEvent("mousemove", {
        clientX: 100,
        clientY: 200,
      });
      // Mock pageX/pageY because MouseEvent constructor might not set them identical to clientX/Y in JSDOM?
      // Actually JSDOM sets pageX/Y if not provided?
      // Let's define them explicitly.
      Object.defineProperty(event, 'pageX', { value: 100 });
      Object.defineProperty(event, 'pageY', { value: 200 });
      
      document.dispatchEvent(event);
    });

    expect(result.current.x).toBe(100);
    expect(result.current.y).toBe(200);
  });
});
