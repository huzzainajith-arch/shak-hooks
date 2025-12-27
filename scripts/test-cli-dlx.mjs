import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

function run(command, args, cwd) {
  const res = spawnSync(command, args, {
    cwd,
    stdio: "pipe",
    encoding: "utf8",
    shell: process.platform === "win32",
  });
  return res;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function writeJsonNoBom(filePath, obj) {
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2) + "\n", "utf8");
}

const cliPkgPath = path.join(repoRoot, "packages", "cli");
const cliPkgUrl = pathToFileURL(cliPkgPath).href;
const hooksMetaPath = path.join(cliPkgPath, "templates", "hooks.json");
assert(fs.existsSync(hooksMetaPath), "Missing CLI templates. Run: pnpm -C packages/cli build");
const hookNames = JSON.parse(fs.readFileSync(hooksMetaPath, "utf8")).hooks;
assert(Array.isArray(hookNames) && hookNames.length > 0, "hooks.json is invalid");

const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), "shak-hooks-cli-"));

const matrix = [
  { name: "react-app", deps: { react: "18.2.0" }, expectedOutDir: "src/shak-hooks" },
  { name: "vue-app", deps: { vue: "3.3.4" }, expectedOutDir: "src/shak-hooks" },
  { name: "angular-app", deps: { "@angular/core": "16.2.0" }, expectedOutDir: "src/app/shak-hooks" },
];

const results = [];

for (const entry of matrix) {
  const appDir = path.join(tmpRoot, entry.name);
  fs.mkdirSync(appDir, { recursive: true });

  writeJsonNoBom(path.join(appDir, "package.json"), {
    name: entry.name,
    private: true,
    dependencies: entry.deps,
  });

  const dlxBase = ["dlx", "--package", cliPkgUrl, "shak-hooks"];

  const initRes = run("pnpm", [...dlxBase, "init"], appDir);
  assert(
    initRes.status === 0,
    `init failed for ${entry.name}\n${initRes.error?.message ?? ""}\n${initRes.stderr ?? ""}\n${initRes.stdout ?? ""}`
  );

  const configPath = path.join(appDir, "shak-hooks.json");
  assert(fs.existsSync(configPath), `init did not create shak-hooks.json for ${entry.name}`);

  const addBatteryRes = run("pnpm", [...dlxBase, "add", "useBattery", "--yes"], appDir);
  assert(
    addBatteryRes.status === 0,
    `add useBattery failed for ${entry.name}\n${addBatteryRes.stderr}\n${addBatteryRes.stdout}`
  );

  const outDirAbs = path.join(appDir, entry.expectedOutDir);
  assert(fs.existsSync(outDirAbs), `missing outDir ${entry.expectedOutDir} for ${entry.name}`);
  assert(fs.existsSync(path.join(outDirAbs, "useBattery.ts")), `missing useBattery.ts for ${entry.name}`);
  assert(!fs.existsSync(path.join(outDirAbs, "core")), `core/ should not be created for useBattery (${entry.name})`);

  const addAllRes = run("pnpm", [...dlxBase, "add", "all", "--yes"], appDir);
  assert(
    addAllRes.status === 0,
    `add all failed for ${entry.name}\n${addAllRes.stderr}\n${addAllRes.stdout}`
  );

  assert(fs.existsSync(path.join(outDirAbs, "core", "index.ts")), `missing core/index.ts after add all for ${entry.name}`);

  const files = fs.readdirSync(outDirAbs).filter((f) => f.endsWith(".ts"));
  assert(files.includes("index.ts"), `missing barrel index.ts for ${entry.name}`);
  for (const hookName of hookNames) {
    assert(files.includes(`${hookName}.ts`), `missing ${hookName}.ts for ${entry.name}`);
    const content = fs.readFileSync(path.join(outDirAbs, `${hookName}.ts`), "utf8");
    assert(!content.includes("@shak-hooks/core"), `template still references @shak-hooks/core in ${hookName}.ts (${entry.name})`);
  }

  results.push({ app: entry.name, outDir: entry.expectedOutDir, hooks: hookNames.length });
}

fs.rmSync(tmpRoot, { recursive: true, force: true });

console.log("CLI dlx smoke test OK");
for (const r of results) {
  console.log(`- ${r.app}: ${r.hooks} hooks -> ${r.outDir}`);
}
