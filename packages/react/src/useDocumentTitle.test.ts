import { describe, it, expect, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useDocumentTitle } from "./useDocumentTitle";

describe("React: useDocumentTitle", () => {
  const originalTitle = document.title;

  afterEach(() => {
    document.title = originalTitle;
  });

  it("should set document title", () => {
    renderHook(() => useDocumentTitle("New Title"));
    expect(document.title).toBe("New Title");
  });

  it("should restore title on unmount", () => {
    document.title = "Old Title";
    const { unmount } = renderHook(() => useDocumentTitle("New Title", { restoreOnUnmount: true }));
    expect(document.title).toBe("New Title");
    unmount();
    expect(document.title).toBe("Old Title");
  });
});
