import { describe, it, expect, vi } from "vitest";
import { useHover } from "./useHover";

describe("Angular: useHover", () => {
  it("should detect hover", () => {
    const target = document.createElement("div");
    const isHovered = useHover(target);

    expect(isHovered()).toBe(false);

    const enterEvent = new MouseEvent("mouseenter");
    target.dispatchEvent(enterEvent);
    
    expect(isHovered()).toBe(true);

    const leaveEvent = new MouseEvent("mouseleave");
    target.dispatchEvent(leaveEvent);

    expect(isHovered()).toBe(false);
  });
});
