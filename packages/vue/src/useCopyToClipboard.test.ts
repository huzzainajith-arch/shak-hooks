import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useCopyToClipboard } from "./useCopyToClipboard";

describe("Vue: useCopyToClipboard", () => {
  const originalClipboard = navigator.clipboard;

  beforeEach(() => {
    const mockClipboard = {
      writeText: vi.fn().mockResolvedValue(undefined),
    };
    Object.defineProperty(navigator, "clipboard", {
      value: mockClipboard,
      writable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: originalClipboard,
      writable: true,
    });
  });

  it("should copy text to clipboard", async () => {
    const { value, copy } = useCopyToClipboard();

    await copy("test text");

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("test text");
    expect(value.value).toBe("test text");
  });
});
