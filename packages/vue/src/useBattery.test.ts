import { describe, it, expect, vi, afterEach } from "vitest";
import { useBattery } from "./useBattery";

vi.mock("vue", async (importOriginal) => {
  const actual = await importOriginal<typeof import("vue")>();
  const key = "__shak_vue_unmount_useBattery";
  (globalThis as any)[key] ??= [];
  return {
    ...actual,
    onMounted: (fn: () => void) => fn(),
    onUnmounted: (fn: () => void) => (globalThis as any)[key].push(fn),
  };
});

describe("Vue: useBattery", () => {
  const originalGetBattery = (navigator as any).getBattery;

  afterEach(() => {
    (navigator as any).getBattery = originalGetBattery;
    (globalThis as any).__shak_vue_unmount_useBattery = [];
    vi.restoreAllMocks();
  });

  it("tracks battery state and cleans up listeners", async () => {
    const listeners = new Map<string, (event?: any) => void>();

    const battery = {
      charging: true,
      chargingTime: 10,
      dischargingTime: 20,
      level: 0.5,
      addEventListener: vi.fn((event: string, fn: any) => listeners.set(event, fn)),
      removeEventListener: vi.fn(),
    };

    (navigator as any).getBattery = vi.fn().mockResolvedValue(battery);

    const state = useBattery();

    await (navigator as any).getBattery.mock.results[0]!.value;
    expect(state.level.value).toBe(0.5);

    battery.level = 0.9;
    listeners.get("levelchange")?.();
    expect(state.level.value).toBe(0.9);

    for (const cb of (globalThis as any).__shak_vue_unmount_useBattery) cb();
    expect(battery.removeEventListener).toHaveBeenCalled();
  });
});

