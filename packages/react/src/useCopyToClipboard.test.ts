import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCopyToClipboard } from "./useCopyToClipboard";

describe("React: useCopyToClipboard", () => {
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
    const { result } = renderHook(() => useCopyToClipboard());
    const [value, copy] = result.current;

    await act(async () => {
      await copy("test text");
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("test text");
    expect(result.current[0]).toBe("test text");
  });
});
