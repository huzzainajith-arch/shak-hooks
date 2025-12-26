import { describe, it, expect, vi, afterEach } from "vitest";
import { useEventListener } from "./useEventListener";

vi.mock("vue", async (importOriginal) => {
  const actual = await importOriginal<typeof import("vue")>();
  return {
    ...actual,
    onMounted: (fn: () => void) => fn(),
    onUnmounted: vi.fn(),
  };
});

describe("Vue: useEventListener", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("listens to window events and can be stopped", () => {
    const handler = vi.fn();
    const stop = useEventListener("click", handler);

    window.dispatchEvent(new Event("click"));
    expect(handler).toHaveBeenCalledTimes(1);

    stop();
    window.dispatchEvent(new Event("click"));
    expect(handler).toHaveBeenCalledTimes(1);
  });
});

