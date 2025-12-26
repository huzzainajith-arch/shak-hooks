import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useIntersectionObserver } from "./useIntersectionObserver";
import { ref, nextTick } from "vue";

// Mock onMounted/onUnmounted
vi.mock("vue", async (importOriginal) => {
  const actual = await importOriginal<typeof import("vue")>();
  return {
    ...actual,
    onMounted: (fn: () => void) => fn(), // Run immediately
    onUnmounted: vi.fn(),
  };
});

describe("Vue: useIntersectionObserver", () => {
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

  it("should observe element", async () => {
    const target = ref(document.createElement("div"));
    useIntersectionObserver(target);
    
    await nextTick(); // Wait for watch to trigger
    expect(observeMock).toHaveBeenCalledWith(target.value);
  });
});
