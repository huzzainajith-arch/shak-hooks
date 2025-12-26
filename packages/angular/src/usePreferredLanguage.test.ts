import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { usePreferredLanguage } from "./usePreferredLanguage";

describe("Angular: usePreferredLanguage", () => {
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
    expect(language()).toBe("en-US");
  });

  it("should update on language change", () => {
    const language = usePreferredLanguage();
    
    Object.defineProperty(navigator, "language", {
      value: "fr-FR",
      writable: true,
    });
    window.dispatchEvent(new Event("languagechange"));

    expect(language()).toBe("fr-FR");
  });
});
