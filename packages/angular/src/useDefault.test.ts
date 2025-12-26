import { describe, it, expect } from "vitest";
import { useDefault } from "./useDefault";
import { signal } from "@angular/core";

describe("Angular: useDefault", () => {
  it("should return initial value if not null/undefined", () => {
    const { value } = useDefault("initial", "default");
    expect(value()).toBe("initial");
  });

  it("should return default value if state is null", () => {
    // Note: useDefault in Angular implementation takes an initial value, not a signal.
    // It creates its own internal signal.
    const { value, state } = useDefault(null, "default");
    expect(value()).toBe("default");
  });

  it("should return default value if state is undefined", () => {
    const { value } = useDefault(undefined, "default");
    expect(value()).toBe("default");
  });

  it("should update state", () => {
    const { value, state } = useDefault<string | null>("initial", "default");
    
    state.set("new value");
    expect(value()).toBe("new value");
    
    state.set(null);
    expect(value()).toBe("default");
  });
});
