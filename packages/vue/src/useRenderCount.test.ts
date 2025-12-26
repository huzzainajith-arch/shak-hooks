import { describe, it, expect, vi, afterEach } from "vitest";
import { useRenderCount } from "./useRenderCount";

vi.mock("vue", async (importOriginal) => {
  const actual = await importOriginal<typeof import("vue")>();
  const key = "__shak_vue_onUpdated_useRenderCount";
  (globalThis as any)[key] ??= [];
  return {
    ...actual,
    onUpdated: (fn: () => void) => (globalThis as any)[key].push(fn),
  };
});

describe("Vue: useRenderCount", () => {
  afterEach(() => {
    (globalThis as any).__shak_vue_onUpdated_useRenderCount = [];
    vi.restoreAllMocks();
  });

  it("increments on updates", () => {
    const count = useRenderCount();
    expect(count.value).toBe(1);

    for (const cb of (globalThis as any).__shak_vue_onUpdated_useRenderCount) cb();
    expect(count.value).toBe(2);

    for (const cb of (globalThis as any).__shak_vue_onUpdated_useRenderCount) cb();
    expect(count.value).toBe(3);
  });
});

