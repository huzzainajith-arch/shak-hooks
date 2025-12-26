import { describe, it, expect, vi } from "vitest";
import { useKeyPress } from "./useKeyPress";

describe("Angular: useKeyPress", () => {
  it("should detect key press", () => {
    // Mock injector
    const mockInjector = {
      get: vi.fn().mockReturnValue({ onDestroy: vi.fn() }),
    };

    const keyPressed = useKeyPress("a", mockInjector as any);

    expect(keyPressed()).toBe(false);

    const downEvent = new KeyboardEvent("keydown", { key: "a" });
    window.dispatchEvent(downEvent);

    expect(keyPressed()).toBe(true);

    const upEvent = new KeyboardEvent("keyup", { key: "a" });
    window.dispatchEvent(upEvent);

    expect(keyPressed()).toBe(false);
  });
});
