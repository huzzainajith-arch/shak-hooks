import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useIsClient } from "./useIsClient";

describe("React: useIsClient", () => {
  it("is true after mount", async () => {
    const { result } = renderHook(() => useIsClient());
    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });
});
