import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useRenderInfo } from "./useRenderInfo";

describe("React: useRenderInfo", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("logs render info on updates", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const { rerender } = renderHook(({ name }) => useRenderInfo(name), {
      initialProps: { name: "Comp" },
    });

    rerender({ name: "Comp" });

    const calls = logSpy.mock.calls.filter((c) => c[0] === "Comp rendered");
    expect(calls.length).toBeGreaterThanOrEqual(1);
    expect(calls.at(-1)?.[1]).toMatchObject({ count: expect.any(Number) });
  });
});

