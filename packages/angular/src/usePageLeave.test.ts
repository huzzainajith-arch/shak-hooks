import { describe, it, expect, vi } from "vitest";
import { usePageLeave } from "./usePageLeave";

describe("Angular: usePageLeave", () => {
  it("should call onLeave when mouse leaves page", () => {
    const onLeave = vi.fn();
    // Mock injector
    const mockInjector = {
      get: vi.fn().mockReturnValue({ onDestroy: vi.fn() }),
    };
    
    usePageLeave(onLeave, mockInjector as any);

    const event = new MouseEvent("mouseleave", {
      clientY: -1,
    });
    document.dispatchEvent(event);

    expect(onLeave).toHaveBeenCalled();
  });
});
