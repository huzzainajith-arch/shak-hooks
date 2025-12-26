import { describe, it, expect, vi, beforeEach } from "vitest";
import { useMediaQuery } from "./useMediaQuery";

describe("Angular: useMediaQuery", () => {
  let matchMediaMock: any;

  beforeEach(() => {
    matchMediaMock = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: matchMediaMock,
    });
  });

  it("should return match result", () => {
    matchMediaMock.mockImplementation((query: string) => ({
      matches: true,
      media: query,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    const matches = useMediaQuery("(min-width: 1024px)");
    expect(matches()).toBe(true);
  });
});
