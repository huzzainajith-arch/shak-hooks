import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useRandomInterval } from "./useRandomInterval";
import { withSetup } from "./test-utils";

describe("Vue: useRandomInterval", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should run callback within random interval", () => {
    const callback = vi.fn();
    withSetup(() => useRandomInterval(callback, 100, 200));

    vi.advanceTimersByTime(200);

    expect(callback).toHaveBeenCalled();
  });
});
