import { describe, it, expect, vi, afterEach } from "vitest";
import { useLogger } from "./useLogger";

vi.mock("vue", async (importOriginal) => {
  const actual = await importOriginal<typeof import("vue")>();
  const mountKey = "__shak_vue_onMounted_useLogger";
  const updateKey = "__shak_vue_onUpdated_useLogger";
  const unmountKey = "__shak_vue_onUnmounted_useLogger";

  (globalThis as any)[mountKey] ??= [];
  (globalThis as any)[updateKey] ??= [];
  (globalThis as any)[unmountKey] ??= [];

  return {
    ...actual,
    onMounted: (fn: () => void) => fn(),
    onUpdated: (fn: () => void) => (globalThis as any)[updateKey].push(fn),
    onUnmounted: (fn: () => void) => (globalThis as any)[unmountKey].push(fn),
  };
});

describe("Vue: useLogger", () => {
  afterEach(() => {
    (globalThis as any).__shak_vue_onUpdated_useLogger = [];
    (globalThis as any).__shak_vue_onUnmounted_useLogger = [];
    vi.restoreAllMocks();
  });

  it("logs mount, update, and unmount", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    useLogger("Comp");
    expect(logSpy).toHaveBeenCalledWith("Comp mounted");

    for (const cb of (globalThis as any).__shak_vue_onUpdated_useLogger) cb();
    expect(logSpy).toHaveBeenCalledWith("Comp updated");

    for (const cb of (globalThis as any).__shak_vue_onUnmounted_useLogger) cb();
    expect(logSpy).toHaveBeenCalledWith("Comp unmounted");
  });
});

