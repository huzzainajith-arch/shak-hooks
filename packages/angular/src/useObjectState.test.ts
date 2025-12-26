import { describe, it, expect } from "vitest";
import { useObjectState } from "./useObjectState";

describe("Angular: useObjectState", () => {
  it("merges updates", () => {
    const { state, update } = useObjectState({ a: 1, b: 2 });

    update({ b: 3 });
    expect(state()).toEqual({ a: 1, b: 3 });

    update((prev) => ({ a: prev.a + 1 }));
    expect(state()).toEqual({ a: 2, b: 3 });
  });
});

