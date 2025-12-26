import { describe, it, expect, vi, afterEach } from "vitest";
import { ref } from "vue";
import { useFetch } from "./useFetch";

vi.mock("vue", async (importOriginal) => {
  const actual = await importOriginal<typeof import("vue")>();
  return {
    ...actual,
    onUnmounted: vi.fn(),
  };
});

const flushPromises = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

describe("Vue: useFetch", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("fetches immediately by default", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    ) as any;

    const url = ref("https://example.com");
    const state = useFetch<{ ok: boolean }>(url);

    await flushPromises();
    expect(state.data.value).toEqual({ ok: true });
  });

  it("does not fetch when immediate is false", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    ) as any;

    const state = useFetch<{ ok: boolean }>("https://example.com", { immediate: false });

    expect(globalThis.fetch).not.toHaveBeenCalled();
    await state.execute();
    expect(state.data.value).toEqual({ ok: true });
  });
});

