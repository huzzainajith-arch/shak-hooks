import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePreferredLanguage } from "./usePreferredLanguage";

describe("React: usePreferredLanguage", () => {
  const originalLanguage = navigator.language;

  beforeEach(() => {
    Object.defineProperty(navigator, "language", {
      value: "en-US",
      writable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(navigator, "language", {
      value: originalLanguage,
      writable: true,
    });
  });

  it("should return preferred language", () => {
    const { result } = renderHook(() => usePreferredLanguage());
    expect(result.current).toBe("en-US");
  });

  it("should update on language change", () => {
    const { result } = renderHook(() => usePreferredLanguage());
    
    act(() => {
      Object.defineProperty(navigator, "language", {
        value: "fr-FR",
        writable: true,
      });
      window.dispatchEvent(new Event("languagechange"));
    });

    expect(result.current).toBe("fr-FR");
  });
});
