import { describe, it, expect } from "vitest";
import { useQueue } from "./useQueue";

describe("Angular: useQueue", () => {
  it("should initialize correctly", () => {
    const { queue, size } = useQueue([1, 2]);
    expect(queue()).toEqual([1, 2]);
    expect(size()).toBe(2);
  });

  it("should add element", () => {
    const { queue, add } = useQueue<number>();
    
    add(1);
    expect(queue()).toEqual([1]);
  });

  it("should remove element", () => {
    const { queue, remove } = useQueue([1, 2]);
    
    const removed = remove();
    expect(removed).toBe(1);
    expect(queue()).toEqual([2]);
  });

  it("should clear queue", () => {
    const { queue, clear } = useQueue([1, 2]);
    
    clear();
    expect(queue()).toEqual([]);
  });
});
