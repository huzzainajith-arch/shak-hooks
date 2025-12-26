import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useFetch } from "./useFetch";

describe("React: useFetch", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("does not fetch when immediate is false", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    ) as any;

    const { result } = renderHook(() => useFetch<{ ok: boolean }>("https://example.com", { immediate: false }));

    expect(globalThis.fetch).not.toHaveBeenCalled();

    await act(async () => {
      await result.current.execute();
    });

    expect(result.current.data).toEqual({ ok: true });
  });

  it("fetches immediately by default", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    ) as any;

    const { result } = renderHook(() => useFetch<{ ok: boolean }>("https://example.com"));

    await waitFor(() => {
      expect(result.current.data).toEqual({ ok: true });
    });
  });
});

