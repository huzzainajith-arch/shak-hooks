import { describe, it, expect, vi, afterEach } from "vitest";
import { useIdle } from "./useIdle";

vi.mock("vue", async (importOriginal) => {
  const actual = await importOriginal<typeof import("vue")>();
  const key = "__shak_vue_unmount_useIdle";
  (globalThis as any)[key] ??= [];
  return {
    ...actual,
    onMounted: (fn: () => void) => fn(),
    onUnmounted: (fn: () => void) => (globalThis as any)[key].push(fn),
  };
});

describe("Vue: useIdle", () => {
  afterEach(() => {
    (globalThis as any).__shak_vue_unmount_useIdle = [];
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("becomes idle after timeout and resets on activity", () => {
    vi.useFakeTimers();

    const idle = useIdle(1000);
    expect(idle.value).toBe(false);

    vi.advanceTimersByTime(1000);
    expect(idle.value).toBe(true);

    window.dispatchEvent(new Event("mousemove"));
    expect(idle.value).toBe(false);

    for (const cb of (globalThis as any).__shak_vue_unmount_useIdle) cb();
  });
});

