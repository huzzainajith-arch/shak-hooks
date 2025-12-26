import { describe, it, expect, vi } from "vitest";
import { useClickAway } from "./useClickAway";

describe("Angular: useClickAway", () => {
  it("should call handler when clicking outside", () => {
    const handler = vi.fn();
    const target = document.createElement("div");
    
    useClickAway(target, handler);

    // Click outside
    const event = new MouseEvent("mousedown", { bubbles: true });
    window.dispatchEvent(event);
    
    expect(handler).toHaveBeenCalled();
  });
});
