import { describe, it, expect, vi, afterEach } from "vitest";
import { signal } from "@angular/core";
import { useFetch } from "./useFetch";
import { createAngularTestContext, flushAngularEffects } from "./test-utils";

const flushPromises = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

describe("Angular: useFetch", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("does not fetch when immediate is false", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    ) as any;

    const ctx = createAngularTestContext();
    const fetchState = ctx.run(() => useFetch<{ ok: boolean }>("https://example.com", { immediate: false }));

    expect(globalThis.fetch).not.toHaveBeenCalled();

    await fetchState.execute();
    expect(fetchState.data()).toEqual({ ok: true });

    ctx.destroy();
  });

  it("reacts to Signal url changes", async () => {
    globalThis.fetch = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ v: 1 }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ v: 2 }), { status: 200 })) as any;

    const url = signal("https://example.com/1");

    const ctx = createAngularTestContext();
    const fetchState = ctx.run(() => useFetch<{ v: number }>(url));
    flushAngularEffects(ctx.injector);

    await flushPromises();
    expect(fetchState.data()).toEqual({ v: 1 });

    url.set("https://example.com/2");
    flushAngularEffects(ctx.injector);

    await flushPromises();
    expect(fetchState.data()).toEqual({ v: 2 });

    ctx.destroy();
  });
});

