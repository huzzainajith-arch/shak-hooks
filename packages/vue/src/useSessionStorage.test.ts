import { describe, it, expect, vi, beforeEach } from "vitest";
import { useSessionStorage } from "./useSessionStorage";
import { nextTick } from "vue";

describe("Vue: useSessionStorage", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("should return initial value", () => {
    const state = useSessionStorage("key", "initial");
    expect(state.value).toBe("initial");
  });

  it("should update session storage", async () => {
    const state = useSessionStorage("key", "initial");
    
    state.value = "new";
    await nextTick();

    expect(state.value).toBe("new");
    expect(window.sessionStorage.getItem("key")).toBe(JSON.stringify("new"));
  });

  it("should initialize from session storage", () => {
    window.sessionStorage.setItem("key", JSON.stringify("existing"));
    const state = useSessionStorage("key", "initial");
    expect(state.value).toBe("existing");
  });
});
