import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useLockBodyScroll } from "./useLockBodyScroll";

describe("React: useLockBodyScroll", () => {
  it("locks and restores body overflow", () => {
    const original = document.body.style.overflow;

    const { unmount } = renderHook(() => useLockBodyScroll(true));
    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).toBe(original);
  });
});

