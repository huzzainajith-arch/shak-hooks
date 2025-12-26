import { describe, it, expect, beforeEach } from "vitest";
import { useLocalStorage } from "./useLocalStorage";
import { nextTick } from "vue";

describe("Vue: useLocalStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("should initialize with default value", () => {
    const state = useLocalStorage("test-key", "default");
    expect(state.value).toBe("default");
  });

  it("should initialize with value from localStorage", () => {
    window.localStorage.setItem("test-key", JSON.stringify("stored"));
    const state = useLocalStorage("test-key", "default");
    expect(state.value).toBe("stored");
  });

  it("should update localStorage when state changes", async () => {
    const state = useLocalStorage("test-key", "default");
    
    state.value = "new value";
    await nextTick();
    
    expect(window.localStorage.getItem("test-key")).toBe(JSON.stringify("new value"));
  });
});
