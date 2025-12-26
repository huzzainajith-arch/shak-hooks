import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useLogger } from "./useLogger";

describe("React: useLogger", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("logs mount, update, and unmount", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const { rerender, unmount } = renderHook(({ name }) => useLogger(name), {
      initialProps: { name: "Comp" },
    });

    expect(logSpy).toHaveBeenCalledWith("Comp mounted");

    rerender({ name: "Comp" });
    expect(logSpy).toHaveBeenCalledWith("Comp updated");

    unmount();
    expect(logSpy).toHaveBeenCalledWith("Comp unmounted");
  });
});

