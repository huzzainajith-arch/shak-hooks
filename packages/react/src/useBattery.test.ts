import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useBattery } from "./useBattery";

describe("React: useBattery", () => {
  const originalGetBattery = (navigator as any).getBattery;

  afterEach(() => {
    (navigator as any).getBattery = originalGetBattery;
    vi.restoreAllMocks();
  });

  it("tracks battery state", async () => {
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

    const { result, unmount } = renderHook(() => useBattery());

    await waitFor(() => {
      expect(result.current.level).toBe(0.5);
    });

    battery.level = 0.9;
    act(() => {
      listeners.get("levelchange")?.();
    });

    await waitFor(() => {
      expect(result.current.level).toBe(0.9);
    });

    unmount();
    expect(battery.removeEventListener).toHaveBeenCalled();
  });
});
