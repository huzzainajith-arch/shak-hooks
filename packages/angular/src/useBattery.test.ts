import { describe, it, expect, vi, afterEach } from "vitest";
import { useBattery } from "./useBattery";
import { createAngularTestContext } from "./test-utils";

describe("Angular: useBattery", () => {
  const originalGetBattery = (navigator as any).getBattery;

  afterEach(() => {
    (navigator as any).getBattery = originalGetBattery;
  });

  it("tracks battery state and cleans up listeners", async () => {
    const listeners = new Map<string, (event?: any) => void>();

    const battery = {
      charging: true,
      chargingTime: 10,
      dischargingTime: 20,
      level: 0.5,
      addEventListener: vi.fn((event: string, fn: any) => listeners.set(event, fn)),
      removeEventListener: vi.fn((event: string, fn: any) => {
        expect(fn).toBe(listeners.get(event));
      }),
    };

    const getBattery = vi.fn().mockResolvedValue(battery);
    (navigator as any).getBattery = getBattery;

    const ctx = createAngularTestContext();
    const state = ctx.run(() => useBattery(ctx.injector));

    await getBattery.mock.results[0]!.value;

    expect(state.level()).toBe(0.5);
    expect(state.charging()).toBe(true);
    expect(state.chargingTime()).toBe(10);
    expect(state.dischargingTime()).toBe(20);

    battery.level = 0.9;
    listeners.get("levelchange")?.();
    expect(state.level()).toBe(0.9);

    ctx.destroy();

    expect(battery.removeEventListener).toHaveBeenCalledTimes(4);
  });
});

