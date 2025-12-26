import { describe, it, expect, vi, afterEach } from "vitest";
import { ref, nextTick } from "vue";
import { useLockBodyScroll } from "./useLockBodyScroll";

vi.mock("vue", async (importOriginal) => {
  const actual = await importOriginal<typeof import("vue")>();
  const key = "__shak_vue_unmount_useLockBodyScroll";
  (globalThis as any)[key] ??= [];
  return {
    ...actual,
    onMounted: (fn: () => void) => fn(),
    onUnmounted: (fn: () => void) => (globalThis as any)[key].push(fn),
  };
});

describe("Vue: useLockBodyScroll", () => {
  afterEach(() => {
    (globalThis as any).__shak_vue_unmount_useLockBodyScroll = [];
    vi.restoreAllMocks();
  });

  it("locks and unlocks body overflow", async () => {
    const original = document.body.style.overflow;
    const locked = ref(true);

    useLockBodyScroll(locked);
    expect(document.body.style.overflow).toBe("hidden");

    locked.value = false;
    await nextTick();
    expect(document.body.style.overflow).toBe(original);

    for (const cb of (globalThis as any).__shak_vue_unmount_useLockBodyScroll) cb();
    expect(document.body.style.overflow).toBe(original);
  });
});

