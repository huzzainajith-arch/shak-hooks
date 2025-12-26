import { describe, it, expect } from "vitest";
import { useList } from "./useList";

describe("Angular: useList", () => {
  it("should initialize correctly", () => {
    const { list } = useList([1, 2, 3]);
    expect(list()).toEqual([1, 2, 3]);
  });

  it("should push items", () => {
    const { list, push } = useList([1]);
    push(2, 3);
    expect(list()).toEqual([1, 2, 3]);
  });

  it("should set items", () => {
    const { list, set } = useList([1]);
    set([4, 5]);
    expect(list()).toEqual([4, 5]);
  });

  it("should update at index", () => {
    const { list, updateAt } = useList([1, 2, 3]);
    updateAt(1, 5);
    expect(list()).toEqual([1, 5, 3]);
  });

  it("should remove at index", () => {
    const { list, removeAt } = useList([1, 2, 3]);
    removeAt(1);
    expect(list()).toEqual([1, 3]);
  });

  it("should clear list", () => {
    const { list, clear } = useList([1, 2, 3]);
    clear();
    expect(list()).toEqual([]);
  });

  it("should reset list", () => {
    const { list, set, reset } = useList([1, 2, 3]);
    set([4, 5]);
    reset();
    expect(list()).toEqual([1, 2, 3]);
  });
});
