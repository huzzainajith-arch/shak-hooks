import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    root: __dirname,
    environment: "happy-dom",
    globals: true,
    setupFiles: ["src/test-setup-zone.ts", "src/test-setup-angular.ts"],
    include: ["src/**/*.test.ts"],
  },
});
