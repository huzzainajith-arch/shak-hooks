import { describe, it, expect, vi, afterEach } from "vitest";
import { useLogger } from "./useLogger";
import { createAngularTestContext } from "./test-utils";

describe("Angular: useLogger", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("logs mount and unmount inside injection context", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const ctx = createAngularTestContext();
    ctx.run(() => useLogger("Comp", { a: 1 }));

    expect(logSpy).toHaveBeenCalledWith("Comp mounted", { a: 1 });
    expect(warnSpy).not.toHaveBeenCalled();

    ctx.destroy();
    expect(logSpy).toHaveBeenCalledWith("Comp unmounted");
  });

  it("warns when used outside injection context", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    useLogger("Comp");

    expect(logSpy).toHaveBeenCalledWith("Comp mounted");
    expect(warnSpy).toHaveBeenCalled();
  });
});

