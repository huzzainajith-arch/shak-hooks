import { describe, it, expect } from "vitest";
import { usePrevious } from "./usePrevious";
import { ref, nextTick } from "vue";

describe("Vue: usePrevious", () => {
  it("should return undefined initially", () => {
    const value = ref("initial");
    const prev = usePrevious(value);
    expect(prev.value).toBeUndefined();
  });

  it("should return previous value after update", async () => {
    const value = ref("initial");
    const prev = usePrevious(value);
    
    value.value = "updated";
    await nextTick();
    expect(prev.value).toBe("initial");
    
    value.value = "updated again";
    await nextTick();
    expect(prev.value).toBe("updated");
  });
});
