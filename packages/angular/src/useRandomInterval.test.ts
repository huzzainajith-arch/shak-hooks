import { describe, it, expect, vi } from "vitest";
import { useRandomInterval } from "./useRandomInterval";

describe("Angular: useRandomInterval", () => {
  it("should run callback within random interval", () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0); // always min delay
    const clean = useRandomInterval(callback, 100, 200);

    vi.advanceTimersByTime(99);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);

    clean();
    randomSpy.mockRestore();
    vi.clearAllTimers();
    vi.useRealTimers();
  });
});
