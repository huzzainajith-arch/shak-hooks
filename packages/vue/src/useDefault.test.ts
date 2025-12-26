import { describe, it, expect } from "vitest";
import { useDefault } from "./useDefault";
import { ref } from "vue";

describe("Vue: useDefault", () => {
  it("should return initial value if not null/undefined", () => {
    const { value } = useDefault("initial", "default");
    expect(value.value).toBe("initial");
  });

  it("should return default value if state is null", () => {
    // Note: useDefault in Vue implementation takes an initial value, not a ref.
    // It creates its own internal ref.
    const { value } = useDefault(null, "default");
    expect(value.value).toBe("default");
  });

  it("should return default value if state is undefined", () => {
    const { value } = useDefault(undefined, "default");
    expect(value.value).toBe("default");
  });

  it("should update state", () => {
    const { value, state } = useDefault<string | null>("initial", "default");
    
    state.value = "new value";
    expect(value.value).toBe("new value");
    
    state.value = null;
    expect(value.value).toBe("default");
  });
});
