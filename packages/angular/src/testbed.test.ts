import { describe, it, expect } from "vitest";
import { createAngularTestContext } from "./test-utils";

describe("Angular: injection context", () => {
  it("runs code inside an injection context", () => {
    const ctx = createAngularTestContext();
    const result = ctx.run(() => "ok");
    ctx.destroy();
    expect(result).toBe("ok");
  });
});
