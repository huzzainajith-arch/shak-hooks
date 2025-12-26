import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useMeasure } from "./useMeasure";
import { ref, nextTick } from "vue";

describe("Vue: useMeasure", () => {
  let observeMock: any;
  let disconnectMock: any;

  beforeEach(() => {
    observeMock = vi.fn();
    disconnectMock = vi.fn();
    global.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: observeMock,
      disconnect: disconnectMock,
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with default rect", () => {
    const [elementRef, rect] = useMeasure();
    expect(rect.value).toEqual({
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    });
  });
});
