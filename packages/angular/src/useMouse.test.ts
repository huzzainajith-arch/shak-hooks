import { describe, it, expect, vi } from "vitest";
import { useMouse } from "./useMouse";

describe("Angular: useMouse", () => {
  it("should track mouse position", () => {
    const { x, y } = useMouse();

    expect(x()).toBe(0);
    expect(y()).toBe(0);

    const event = new MouseEvent("mousemove", {
      clientX: 100,
      clientY: 200,
    });
    Object.defineProperty(event, 'pageX', { value: 100 });
    Object.defineProperty(event, 'pageY', { value: 200 });
    
    window.dispatchEvent(event);

    expect(x()).toBe(100);
    expect(y()).toBe(200);
  });
});
