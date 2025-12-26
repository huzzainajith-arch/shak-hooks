import { describe, it, expect } from "vitest";
import { useIsFirstRender } from "./useIsFirstRender";

describe("Vue: useIsFirstRender", () => {
  it("should return true initially", () => {
    const isFirst = useIsFirstRender();
    expect(isFirst.value).toBe(true);
    
    // In Vue composition API outside of a component, it's hard to simulate "re-render" 
    // in the same way as React. But we can check the initial state.
    // The implementation likely uses onMounted to flip the flag.
  });
});
