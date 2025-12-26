import { describe, it, expect, vi } from "vitest";
import { usePageLeave } from "./usePageLeave";

// Mock onMounted/onUnmounted
vi.mock("vue", async (importOriginal) => {
  const actual = await importOriginal<typeof import("vue")>();
  return {
    ...actual,
    onMounted: (fn: () => void) => fn(),
    onUnmounted: vi.fn(),
  };
});

describe("Vue: usePageLeave", () => {
  it("should call onLeave when mouse leaves page", () => {
    const onLeave = vi.fn();
    usePageLeave(onLeave);

    const event = new MouseEvent("mouseleave", {
      clientY: -1,
    });
    document.dispatchEvent(event);

    expect(onLeave).toHaveBeenCalled();
  });
});
