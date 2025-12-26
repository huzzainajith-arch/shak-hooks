import { describe, it, expect, vi, afterEach } from "vitest";
import { useRenderInfo } from "./useRenderInfo";

vi.mock("vue", async (importOriginal) => {
  const actual = await importOriginal<typeof import("vue")>();
  const updateKey = "__shak_vue_onUpdated_useRenderInfo";
  (globalThis as any)[updateKey] ??= [];
  return {
    ...actual,
    onMounted: (fn: () => void) => fn(),
    onUpdated: (fn: () => void) => (globalThis as any)[updateKey].push(fn),
  };
});

describe("Vue: useRenderInfo", () => {
  afterEach(() => {
    (globalThis as any).__shak_vue_onUpdated_useRenderInfo = [];
    vi.restoreAllMocks();
  });

  it("logs render info on mount and updates", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    useRenderInfo("Comp");
    expect(logSpy).toHaveBeenCalledWith("Comp mounted", expect.any(Object));

    for (const cb of (globalThis as any).__shak_vue_onUpdated_useRenderInfo) cb();
    for (const cb of (globalThis as any).__shak_vue_onUpdated_useRenderInfo) cb();

    const updateCalls = logSpy.mock.calls.filter((c) => c[0] === "Comp updated");
    expect(updateCalls.length).toBeGreaterThanOrEqual(1);
    expect(updateCalls.at(-1)?.[1]).toMatchObject({ count: expect.any(Number) });
  });
});

