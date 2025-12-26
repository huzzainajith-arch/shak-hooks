import { describe, it, expect } from "vitest";
import { useHistoryState } from "./useHistoryState";

describe("Angular: useHistoryState", () => {
  it("should initialize correctly", () => {
    const { state } = useHistoryState("initial", "key");
    expect(state()).toBe("initial");
  });

  it("should set state and update history", () => {
    const { state, setHistoryState } = useHistoryState("initial", "key");
    
    setHistoryState("new");
    expect(state()).toBe("new");
    expect(window.history.state.key).toBe("new");
  });
});
