import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useThrottle } from "./useThrottle";
import { ref, nextTick } from "vue";
import { withSetup } from "./test-utils";

describe("Vue: useThrottle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should throttle value updates", async () => {
    const value = ref("initial");
    const { result: throttledValue } = withSetup(() => useThrottle(value, 1000));

    expect(throttledValue.value).toBe("initial");

    value.value = "updated";
    await nextTick();
    expect(throttledValue.value).toBe("initial");

    vi.advanceTimersByTime(1000);
    await nextTick();

    expect(throttledValue.value).toBe("updated");
  });
});
