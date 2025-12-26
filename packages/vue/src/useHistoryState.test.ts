import { describe, it, expect } from "vitest";
import { useHistoryState } from "./useHistoryState";

describe("Vue: useHistoryState", () => {
  it("should initialize correctly", () => {
    const { state } = useHistoryState("initial", "key");
    expect(state.value).toBe("initial");
  });

  it("should set state and update history", () => {
    const { state, setHistoryState } = useHistoryState("initial", "key");
    
    setHistoryState("new");
    expect(state.value).toBe("new");
    expect(window.history.state.key).toBe("new");
  });
});
