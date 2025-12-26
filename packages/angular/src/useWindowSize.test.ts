import { describe, it, expect } from "vitest";
import { useWindowSize } from "./useWindowSize";

describe("Angular: useWindowSize", () => {
  it("should return window size", () => {
    const { width, height } = useWindowSize();
    expect(width()).toBe(window.innerWidth);
    expect(height()).toBe(window.innerHeight);
  });

  it("should update on resize", () => {
    const { width, height } = useWindowSize();
    
    window.innerWidth = 500;
    window.innerHeight = 500;
    window.dispatchEvent(new Event("resize"));
    
    // Angular signals update synchronously when set
    expect(width()).toBe(500);
    expect(height()).toBe(500);
  });
});
