import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useEventListener } from "./useEventListener";

describe("React: useEventListener", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("listens to window events", () => {
    const handler = vi.fn();
    renderHook(() => useEventListener("click", handler));

    window.dispatchEvent(new Event("click"));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("attaches to a provided element", () => {
    const handler = vi.fn();
    const el = document.createElement("div");

    renderHook(() => useEventListener("click", handler, el));

    el.dispatchEvent(new Event("click"));
    expect(handler).toHaveBeenCalledTimes(1);
  });
});

