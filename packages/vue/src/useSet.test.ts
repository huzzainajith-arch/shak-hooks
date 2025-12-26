import { describe, it, expect } from "vitest";
import { useSet } from "./useSet";

describe("Vue: useSet", () => {
  it("should initialize correctly", () => {
    const { set } = useSet(["value"]);
    expect(set.value.has("value")).toBe(true);
  });

  it("should add value", () => {
    const { set, add } = useSet<string>();
    
    add("value");
    expect(set.value.has("value")).toBe(true);
  });

  it("should remove value", () => {
    const { set, remove } = useSet(["value"]);
    
    remove("value");
    expect(set.value.has("value")).toBe(false);
  });

  it("should clear set", () => {
    const { set, clear } = useSet(["value"]);
    
    clear();
    expect(set.value.size).toBe(0);
  });
});
