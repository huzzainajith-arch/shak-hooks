import { describe, it, expect, vi } from "vitest";
import { useMouse } from "./useMouse";
import { nextTick } from "vue";

// Mock onMounted/onUnmounted
vi.mock("vue", async (importOriginal) => {
  const actual = await importOriginal<typeof import("vue")>();
  return {
    ...actual,
    onMounted: (fn: () => void) => fn(),
    onUnmounted: vi.fn(),
  };
});

describe("Vue: useMouse", () => {
  it("should track mouse position", async () => {
    const { x, y } = useMouse();
    
    await nextTick(); // Wait for listener to attach

    expect(x.value).toBe(0);
    expect(y.value).toBe(0);

    const event = new MouseEvent("mousemove", {
      clientX: 100,
      clientY: 200,
    });
    Object.defineProperty(event, 'pageX', { value: 100 });
    Object.defineProperty(event, 'pageY', { value: 200 });
    
    window.dispatchEvent(event);

    expect(x.value).toBe(100);
    expect(y.value).toBe(200);
  });
});
