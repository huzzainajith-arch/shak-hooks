import { describe, it, expect, vi, afterEach } from "vitest";
import { useVisibilityChange } from "./useVisibilityChange";

vi.mock("vue", async (importOriginal) => {
  const actual = await importOriginal<typeof import("vue")>();
  const key = "__shak_vue_unmount_useVisibilityChange";
  (globalThis as any)[key] ??= [];
  return {
    ...actual,
    onMounted: (fn: () => void) => fn(),
    onUnmounted: (fn: () => void) => (globalThis as any)[key].push(fn),
  };
});

describe("Vue: useVisibilityChange", () => {
  afterEach(() => {
    (globalThis as any).__shak_vue_unmount_useVisibilityChange = [];
    vi.restoreAllMocks();
  });

  it("updates when document visibility changes", () => {
    let state = "visible";
    const originalDescriptor = Object.getOwnPropertyDescriptor(document, "visibilityState");
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      get: () => state,
    });

    const isVisible = useVisibilityChange();
    expect(isVisible.value).toBe(true);

    state = "hidden";
    document.dispatchEvent(new Event("visibilitychange"));
    expect(isVisible.value).toBe(false);

    for (const cb of (globalThis as any).__shak_vue_unmount_useVisibilityChange) cb();

    if (originalDescriptor) Object.defineProperty(document, "visibilityState", originalDescriptor);
  });
});

