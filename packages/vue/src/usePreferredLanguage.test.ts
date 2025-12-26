import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { usePreferredLanguage } from "./usePreferredLanguage";

// Mock onMounted/onUnmounted
vi.mock("vue", async (importOriginal) => {
  const actual = await importOriginal<typeof import("vue")>();
  return {
    ...actual,
    onMounted: (fn: () => void) => fn(),
    onUnmounted: vi.fn(),
  };
});

describe("Vue: usePreferredLanguage", () => {
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
    const language = usePreferredLanguage();
    expect(language.value).toBe("en-US");
  });

  it("should update on language change", () => {
    const language = usePreferredLanguage();
    
    Object.defineProperty(navigator, "language", {
      value: "fr-FR",
      writable: true,
    });
    window.dispatchEvent(new Event("languagechange"));

    expect(language.value).toBe("fr-FR");
  });
});
