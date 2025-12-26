import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useIntersectionObserver } from "./useIntersectionObserver";
import { useRef } from "react";

describe("React: useIntersectionObserver", () => {
  let observeMock: any;
  let disconnectMock: any;

  beforeEach(() => {
    observeMock = vi.fn();
    disconnectMock = vi.fn();
    
    global.IntersectionObserver = class IntersectionObserver {
      constructor(callback: any, options: any) {}
      observe = observeMock;
      disconnect = disconnectMock;
      unobserve = vi.fn();
      takeRecords = vi.fn();
      root = null;
      rootMargin = "";
      thresholds = [];
    } as any;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should observe element", () => {
    const { result } = renderHook(() => {
      const ref = useRef(document.createElement("div"));
      useIntersectionObserver(ref);
      return ref;
    });

    expect(observeMock).toHaveBeenCalledWith(result.current.current);
  });
});
