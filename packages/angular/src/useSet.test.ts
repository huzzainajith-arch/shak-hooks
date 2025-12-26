import { describe, it, expect } from "vitest";
import { useSet } from "./useSet";

describe("Angular: useSet", () => {
  it("should initialize correctly", () => {
    const { set } = useSet(["value"]);
    expect(set().has("value")).toBe(true);
  });

  it("should add value", () => {
    const { set, add } = useSet<string>();
    
    add("value");
    expect(set().has("value")).toBe(true);
  });

  it("should remove value", () => {
    const { set, remove } = useSet(["value"]);
    
    remove("value");
    expect(set().has("value")).toBe(false);
  });

  it("should clear set", () => {
    const { set, clear } = useSet(["value"]);
    
    clear();
    expect(set().size).toBe(0);
  });
});
