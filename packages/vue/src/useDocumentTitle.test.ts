import { describe, it, expect, afterEach, vi } from "vitest";
import { useDocumentTitle } from "./useDocumentTitle";
import { ref, nextTick } from "vue";

// Mock onUnmounted
vi.mock("vue", async (importOriginal) => {
  const actual = await importOriginal<typeof import("vue")>();
  return {
    ...actual,
    onUnmounted: vi.fn(),
  };
});

describe("Vue: useDocumentTitle", () => {
  const originalTitle = document.title;

  afterEach(() => {
    document.title = originalTitle;
  });

  it("should set document title", async () => {
    const title = ref("New Title");
    useDocumentTitle(title);
    
    await nextTick();
    expect(document.title).toBe("New Title");
  });
});
