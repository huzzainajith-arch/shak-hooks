import { describe, it, expect } from "vitest";
import { useToggle } from "./useToggle";

describe("Angular: useToggle", () => {
  it("should initialize with default value", () => {
    const { value } = useToggle();
    expect(value()).toBe(false);
  });

  it("should toggle value", () => {
    const { value, toggle } = useToggle(false);
    
    toggle();
    expect(value()).toBe(true);
    
    toggle();
    expect(value()).toBe(false);
  });

  it("should set specific value", () => {
    const { value, toggle } = useToggle(false);
    
    toggle(true);
    expect(value()).toBe(true);
    
    toggle(false);
    expect(value()).toBe(false);
  });
});
