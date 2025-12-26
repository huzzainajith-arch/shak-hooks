import { describe, it, expect } from "vitest";
import { useMap } from "./useMap";

describe("Vue: useMap", () => {
  it("should initialize correctly", () => {
    const { map } = useMap([["key", "value"]]);
    expect(map.value.get("key")).toBe("value");
  });

  it("should set value", () => {
    const { map, set } = useMap<string, string>();
    
    set("key", "value");
    expect(map.value.get("key")).toBe("value");
  });

  it("should remove value", () => {
    const { map, remove } = useMap([["key", "value"]]);
    
    remove("key");
    expect(map.value.has("key")).toBe(false);
  });

  it("should clear map", () => {
    const { map, clear } = useMap([["key", "value"]]);
    
    clear();
    expect(map.value.size).toBe(0);
  });
});
