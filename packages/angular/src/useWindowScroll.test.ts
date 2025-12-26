import { describe, it, expect, vi, beforeEach } from "vitest";
import { useWindowScroll } from "./useWindowScroll";

describe("Angular: useWindowScroll", () => {
  beforeEach(() => {
    window.scrollX = 0;
    window.scrollY = 0;
  });

  it("should return scroll position", () => {
    const { x, y } = useWindowScroll();
    expect(x()).toBe(0);
    expect(y()).toBe(0);
  });

  it("should update on scroll", () => {
    const { x, y } = useWindowScroll();

    window.scrollX = 100;
    window.scrollY = 200;
    window.dispatchEvent(new Event("scroll"));

    expect(x()).toBe(100);
    expect(y()).toBe(200);
  });
});
