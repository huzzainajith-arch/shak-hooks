import { describe, it, expect, vi } from "vitest";
import { useClickAway } from "./useClickAway";
import { ref } from "vue";

// Mock onMounted/onUnmounted
vi.mock("vue", async (importOriginal) => {
  const actual = await importOriginal<typeof import("vue")>();
  return {
    ...actual,
    onMounted: (fn: () => void) => fn(),
    onUnmounted: vi.fn(),
  };
});

describe("Vue: useClickAway", () => {
  it("should call handler when clicking outside", () => {
    const handler = vi.fn();
    const target = ref(document.createElement("div"));
    
    useClickAway(target, handler);

    // Click outside
    const event = new MouseEvent("mousedown", { bubbles: true });
    window.dispatchEvent(event);
    
    expect(handler).toHaveBeenCalled();
  });

  it("should not call handler when clicking inside", () => {
    const handler = vi.fn();
    const target = ref(document.createElement("div"));
    
    useClickAway(target, handler);

    // Click inside
    const event = new MouseEvent("mousedown", { bubbles: true });
    Object.defineProperty(event, 'target', { value: target.value });
    Object.defineProperty(event, 'composedPath', { value: () => [target.value] });
    
    window.dispatchEvent(event);
    
    expect(handler).not.toHaveBeenCalled();
  });
});
