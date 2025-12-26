import { describe, it, expect, afterEach } from "vitest";
import { useDocumentTitle } from "./useDocumentTitle";

describe("Angular: useDocumentTitle", () => {
  const originalTitle = document.title;

  afterEach(() => {
    document.title = originalTitle;
  });

  it("should set document title", () => {
    useDocumentTitle("New Title");
    expect(document.title).toBe("New Title");
  });
});
