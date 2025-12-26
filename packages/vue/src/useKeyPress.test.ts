import { describe, it, expect, vi } from "vitest";
import { useKeyPress } from "./useKeyPress";

// Mock onMounted/onUnmounted
vi.mock("vue", async (importOriginal) => {
  const actual = await importOriginal<typeof import("vue")>();
  return {
    ...actual,
    onMounted: (fn: () => void) => fn(),
    onUnmounted: vi.fn(),
  };
});

describe("Vue: useKeyPress", () => {
  it("should detect key press", () => {
    const keyPressed = useKeyPress("a");

    expect(keyPressed.value).toBe(false);

    const downEvent = new KeyboardEvent("keydown", { key: "a" });
    window.dispatchEvent(downEvent);

    expect(keyPressed.value).toBe(true);

    const upEvent = new KeyboardEvent("keyup", { key: "a" });
    window.dispatchEvent(upEvent);

    expect(keyPressed.value).toBe(false);
  });
});
