import { describe, it, expect } from "vitest";
import { useToggle } from "./useToggle";

describe("Vue: useToggle", () => {
  it("should initialize with default value", () => {
    const [value] = useToggle();
    expect(value.value).toBe(false);
  });

  it("should toggle value", () => {
    const [value, toggle] = useToggle(false);
    
    toggle();
    expect(value.value).toBe(true);
    
    toggle();
    expect(value.value).toBe(false);
  });

  it("should set specific value", () => {
    const [value, toggle] = useToggle(false);
    
    toggle(true);
    expect(value.value).toBe(true);
    
    toggle(false);
    expect(value.value).toBe(false);
  });
});
