import { describe, it, expect, vi } from "vitest";
import { useDebounce } from "./useDebounce";
import { ref, nextTick } from "vue";

describe("Vue: useDebounce", () => {
  it("should debounce value", async () => {
    vi.useFakeTimers();
    const value = ref("initial");
    const debounced = useDebounce(value, 500);

    expect(debounced.value).toBe("initial");

    value.value = "changed";
    await nextTick();
    expect(debounced.value).toBe("initial");

    vi.advanceTimersByTime(250);
    expect(debounced.value).toBe("initial");

    vi.advanceTimersByTime(250);
    expect(debounced.value).toBe("changed");

    vi.useRealTimers();
  });
});
