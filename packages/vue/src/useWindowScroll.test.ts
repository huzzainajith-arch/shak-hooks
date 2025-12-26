import { describe, it, expect, vi, beforeEach } from "vitest";
import { useWindowScroll } from "./useWindowScroll";

// Mock onMounted/onUnmounted
vi.mock("vue", async (importOriginal) => {
  const actual = await importOriginal<typeof import("vue")>();
  return {
    ...actual,
    onMounted: (fn: () => void) => fn(),
    onUnmounted: vi.fn(),
  };
});

describe("Vue: useWindowScroll", () => {
  beforeEach(() => {
    window.scrollX = 0;
    window.scrollY = 0;
  });

  it("should return scroll position", () => {
    const { x, y } = useWindowScroll();
    expect(x.value).toBe(0);
    expect(y.value).toBe(0);
  });

  it("should update on scroll", () => {
    const { x, y } = useWindowScroll();

    window.scrollX = 100;
    window.scrollY = 200;
    window.dispatchEvent(new Event("scroll"));

    expect(x.value).toBe(100);
    expect(y.value).toBe(200);
  });
});
