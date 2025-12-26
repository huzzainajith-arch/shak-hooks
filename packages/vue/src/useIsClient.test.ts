import { describe, it, expect, vi, afterEach } from "vitest";
import { useIsClient } from "./useIsClient";

vi.mock("vue", async (importOriginal) => {
  const actual = await importOriginal<typeof import("vue")>();
  return {
    ...actual,
    onMounted: (fn: () => void) => fn(),
  };
});

describe("Vue: useIsClient", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("is true after mount", () => {
    const isClient = useIsClient();
    expect(isClient.value).toBe(true);
  });
});

