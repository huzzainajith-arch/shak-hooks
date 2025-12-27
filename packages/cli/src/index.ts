#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

type Framework = "react" | "vue" | "angular";

type Config = {
  framework: Framework;
  outDir: string;
  barrel: boolean;
};

type ParsedArgs = {
  command: "init" | "add" | "list" | "help";
  hooks: string[];
  framework?: Framework;
  outDir?: string;
  yes?: boolean;
  noBarrel?: boolean;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatesDir = path.resolve(__dirname, "..", "templates");
const metaPath = path.join(templatesDir, "hooks.json");

function exitWithError(message: string): never {
  console.error(`shak-hooks: ${message}`);
  process.exit(1);
}

function readJson<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, "utf8");
  const withoutBom = raw.replace(/^\uFEFF/, "");
  return JSON.parse(withoutBom) as T;
}

function tryReadJson<T>(filePath: string): T | null {
  try {
    return readJson<T>(filePath);
  } catch {
    return null;
  }
}

function findUp(startDir: string, fileName: string): string | null {
  let dir = path.resolve(startDir);
  while (true) {
    const candidate = path.join(dir, fileName);
    if (fs.existsSync(candidate)) return candidate;
    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

function findProjectRoot(cwd: string): string {
  const pkg = findUp(cwd, "package.json");
  if (!pkg) return cwd;
  return path.dirname(pkg);
}

function detectFramework(projectRoot: string): Framework {
  const pkgPath = path.join(projectRoot, "package.json");
  const pkg = tryReadJson<{
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  }>(pkgPath);

  const deps = { ...(pkg?.dependencies ?? {}), ...(pkg?.devDependencies ?? {}) };
  if (deps["@angular/core"]) return "angular";
  if (deps["vue"]) return "vue";
  if (deps["react"]) return "react";
  return "react";
}

function defaultOutDir(framework: Framework): string {
  if (framework === "angular") return "src/app/shak-hooks";
  return "src/shak-hooks";
}

function readConfig(projectRoot: string): Config | null {
  const configPath = path.join(projectRoot, "shak-hooks.json");
  const raw = tryReadJson<Partial<Config>>(configPath);
  if (!raw) return null;

  if (!raw.framework) exitWithError(`Invalid config: missing "framework" in ${configPath}`);
  return {
    framework: raw.framework,
    outDir: raw.outDir ?? defaultOutDir(raw.framework),
    barrel: raw.barrel ?? true,
  };
}

function writeConfig(projectRoot: string, config: Config) {
  const configPath = path.join(projectRoot, "shak-hooks.json");
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n", "utf8");
}

function parseArgs(argv: string[]): ParsedArgs {
  const [commandRaw, ...rest] = argv;
  const command =
    commandRaw === "init" || commandRaw === "add" || commandRaw === "list"
      ? commandRaw
      : commandRaw
        ? "help"
        : "help";

  const out: ParsedArgs = { command, hooks: [] };
  let i = 0;
  while (i < rest.length) {
    const a = rest[i];
    if (a === "--framework" || a === "-f") {
      const v = rest[i + 1];
      if (!v) exitWithError("Missing value for --framework");
      if (v !== "react" && v !== "vue" && v !== "angular") exitWithError(`Invalid framework: ${v}`);
      out.framework = v;
      i += 2;
      continue;
    }
    if (a === "--out-dir" || a === "-d") {
      const v = rest[i + 1];
      if (!v) exitWithError("Missing value for --out-dir");
      out.outDir = v;
      i += 2;
      continue;
    }
    if (a === "--yes" || a === "-y") {
      out.yes = true;
      i += 1;
      continue;
    }
    if (a === "--no-barrel") {
      out.noBarrel = true;
      i += 1;
      continue;
    }
    if (a.startsWith("-")) {
      exitWithError(`Unknown flag: ${a}`);
    }
    out.hooks.push(a);
    i += 1;
  }

  return out;
}

function printHelp() {
  console.log(
    [
      "shak-hooks (CLI)",
      "",
      "Init (creates shak-hooks.json):",
      "  pnpm dlx @shak-hooks/cli@latest init",
      "  pnpm dlx @shak-hooks/cli@latest init --framework react",
      "",
      "Add hook source to your project:",
      "  pnpm dlx @shak-hooks/cli@latest add useCopyToClipboard",
      "  pnpm dlx @shak-hooks/cli@latest add useCounter useDebounce",
      "  pnpm dlx @shak-hooks/cli@latest add all",
      "",
      "List available hooks:",
      "  pnpm dlx @shak-hooks/cli@latest list",
      "",
      "Options:",
      "  -f, --framework <react|vue|angular>   Override detected/configured framework",
      "  -d, --out-dir <path>                  Override output directory",
      "  -y, --yes                             Overwrite existing files",
      "  --no-barrel                           Do not create/update index.ts barrel",
    ].join("\n")
  );
}

function ensureDir(dirPath: string) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readTemplate(framework: Framework, fileName: string): string {
  const p = path.join(templatesDir, framework, fileName);
  if (!fs.existsSync(p)) exitWithError(`Template not found: ${p}`);
  return fs.readFileSync(p, "utf8");
}

function copyFile({ from, to, overwrite }: { from: string; to: string; overwrite: boolean }) {
  if (fs.existsSync(to) && !overwrite) return;
  ensureDir(path.dirname(to));
  fs.copyFileSync(from, to);
}

function writeFile({ to, content, overwrite }: { to: string; content: string; overwrite: boolean }) {
  if (fs.existsSync(to) && !overwrite) return;
  ensureDir(path.dirname(to));
  fs.writeFileSync(to, content, "utf8");
}

function getMeta(): { hooks: string[] } {
  const meta = readJson<{ hooks: string[] }>(metaPath);
  return meta;
}

function normalizeHookName(h: string): string {
  if (h === "all") return "all";
  if (!h.startsWith("use")) return `use${h[0].toUpperCase()}${h.slice(1)}`;
  return h;
}

function updateBarrel({
  outDirAbs,
  hooksAdded,
  includeCore,
}: {
  outDirAbs: string;
  hooksAdded: string[];
  includeCore: boolean;
}) {
  const indexPath = path.join(outDirAbs, "index.ts");
  const existing = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, "utf8") : "";

  const lines = new Set(
    existing
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean)
  );

  if (includeCore) {
    lines.add('export * from "./core";');
  }
  for (const hook of hooksAdded) {
    lines.add(`export * from "./${hook}";`);
  }

  const ordered = Array.from(lines).sort((a, b) => a.localeCompare(b));
  fs.writeFileSync(indexPath, ordered.join("\n") + "\n", "utf8");
}

function runList() {
  const { hooks } = getMeta();
  hooks.forEach((h) => console.log(h));
}

function runInit(args: ParsedArgs) {
  const projectRoot = findProjectRoot(process.cwd());
  const framework = args.framework ?? detectFramework(projectRoot);
  const outDir = args.outDir ?? defaultOutDir(framework);
  const barrel = args.noBarrel ? false : true;

  writeConfig(projectRoot, { framework, outDir, barrel });
  console.log(`Created ${path.join(projectRoot, "shak-hooks.json")}`);
}

function runAdd(args: ParsedArgs) {
  const projectRoot = findProjectRoot(process.cwd());
  const config = readConfig(projectRoot);
  const framework = args.framework ?? config?.framework ?? detectFramework(projectRoot);
  const outDir = args.outDir ?? config?.outDir ?? defaultOutDir(framework);
  const barrel = args.noBarrel ? false : (config?.barrel ?? true);
  const overwrite = Boolean(args.yes);

  const meta = getMeta();
  const wanted = args.hooks.length ? args.hooks : [];
  if (!wanted.length) exitWithError('No hook specified. Example: shak-hooks add useCopyToClipboard');

  const normalized = wanted.map(normalizeHookName);
  const hooksToAdd = normalized.includes("all") ? meta.hooks : normalized;

  for (const h of hooksToAdd) {
    if (!meta.hooks.includes(h)) {
      exitWithError(`Unknown hook "${h}". Run: shak-hooks list`);
    }
  }

  const outDirAbs = path.resolve(projectRoot, outDir);
  ensureDir(outDirAbs);

  const hookTemplates = new Map<string, string>();
  const needsCore = hooksToAdd.some((hook) => {
    const content = readTemplate(framework, `${hook}.ts`);
    hookTemplates.set(hook, content);
    return (
      /from\s+["']\.\/core(?:\/[^"']+)?["']/.test(content) ||
      /import\s+["']\.\/core(?:\/[^"']+)?["']/.test(content)
    );
  });

  if (needsCore) {
    const coreTemplateDir = path.join(templatesDir, "core");
    const coreOutDir = path.join(outDirAbs, "core");
    ensureDir(coreOutDir);
    for (const file of fs.readdirSync(coreTemplateDir)) {
      copyFile({
        from: path.join(coreTemplateDir, file),
        to: path.join(coreOutDir, file),
        overwrite,
      });
    }
  }

  const hooksAdded: string[] = [];
  for (const hook of hooksToAdd) {
    const content = hookTemplates.get(hook) ?? readTemplate(framework, `${hook}.ts`);
    const outPath = path.join(outDirAbs, `${hook}.ts`);
    writeFile({ to: outPath, content, overwrite });
    hooksAdded.push(hook);
  }

  if (barrel) {
    updateBarrel({ outDirAbs, hooksAdded, includeCore: needsCore });
  }

  console.log(`Added ${hooksAdded.length} hook(s) to ${path.relative(projectRoot, outDirAbs)}`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!fs.existsSync(templatesDir) || !fs.existsSync(metaPath)) {
    exitWithError(
      "CLI templates are missing. If you are developing locally, run `pnpm -C packages/cli build`."
    );
  }

  switch (args.command) {
    case "help":
      printHelp();
      return;
    case "list":
      runList();
      return;
    case "init":
      runInit(args);
      return;
    case "add":
      runAdd(args);
      return;
    default:
      printHelp();
  }
}

main();
