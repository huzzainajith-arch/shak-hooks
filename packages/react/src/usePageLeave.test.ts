import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePageLeave } from "./usePageLeave";

describe("React: usePageLeave", () => {
  it("should call onLeave when mouse leaves page", () => {
    const onLeave = vi.fn();
    renderHook(() => usePageLeave(onLeave));

    act(() => {
      const event = new MouseEvent("mouseleave", {
        clientY: -1,
      });
      document.dispatchEvent(event);
    });

    expect(onLeave).toHaveBeenCalled();
  });
});
