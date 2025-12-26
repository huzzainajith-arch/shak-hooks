import { describe, it, expect, vi } from "vitest";
import { nextTick, ref } from "vue";

// Mock onMounted before importing the hook
vi.mock("vue", async (importOriginal) => {
  const actual = await importOriginal<typeof import("vue")>();
  return {
    ...actual,
    onMounted: (fn: () => void) => fn(),
    onUnmounted: vi.fn(),
  };
});

import { useWindowSize } from "./useWindowSize";

describe("Vue: useWindowSize", () => {
  it("should return window size", () => {
    const { width, height } = useWindowSize();
    expect(width.value).toBe(window.innerWidth);
    expect(height.value).toBe(window.innerHeight);
  });

  it("should update on resize", async () => {
    const { width, height } = useWindowSize();
    
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 });
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 500 });
    
    window.dispatchEvent(new Event("resize"));
    await nextTick();
    
    expect(width.value).toBe(500);
    expect(height.value).toBe(500);
  });
});
