import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// scripts/ lives at repo root
const repoRoot = path.resolve(__dirname, "..");

const reactIndexPath = path.join(repoRoot, "packages", "react", "src", "index.ts");
const reactIndex = fs.readFileSync(reactIndexPath, "utf8");

const hookNames = reactIndex
  .split(/\r?\n/)
  .map((line) => line.match(/export \* from "\.\/(use[^"]+)";/))
  .filter(Boolean)
  .map((m) => m[1]);

const outTemplatesDir = path.join(repoRoot, "packages", "cli", "templates");
const outCoreDir = path.join(outTemplatesDir, "core");
const outReactDir = path.join(outTemplatesDir, "react");
const outVueDir = path.join(outTemplatesDir, "vue");
const outAngularDir = path.join(outTemplatesDir, "angular");

fs.rmSync(outTemplatesDir, { recursive: true, force: true });
fs.mkdirSync(outCoreDir, { recursive: true });
fs.mkdirSync(outReactDir, { recursive: true });
fs.mkdirSync(outVueDir, { recursive: true });
fs.mkdirSync(outAngularDir, { recursive: true });

function rewriteCoreImports(content) {
  return content.replaceAll(/(['"])@shak-hooks\/core\1/g, '"./core"');
}

function copyCore() {
  const coreSrcDir = path.join(repoRoot, "packages", "core", "src");
  for (const file of fs.readdirSync(coreSrcDir)) {
    if (!file.endsWith(".ts")) continue;
    if (file.endsWith(".test.ts")) continue;
    const src = path.join(coreSrcDir, file);
    const dest = path.join(outCoreDir, file);
    fs.copyFileSync(src, dest);
  }
}

function copyHooks(framework) {
  const srcDir = path.join(repoRoot, "packages", framework, "src");
  const outDir =
    framework === "react" ? outReactDir : framework === "vue" ? outVueDir : outAngularDir;

  for (const hook of hookNames) {
    const src = path.join(srcDir, `${hook}.ts`);
    const dest = path.join(outDir, `${hook}.ts`);
    const raw = fs.readFileSync(src, "utf8");
    const rewritten = rewriteCoreImports(raw);
    fs.writeFileSync(dest, rewritten, "utf8");
  }
}

copyCore();
copyHooks("react");
copyHooks("vue");
copyHooks("angular");

fs.writeFileSync(
  path.join(outTemplatesDir, "hooks.json"),
  JSON.stringify({ hooks: hookNames }, null, 2) + "\n",
  "utf8"
);

console.log(`Generated CLI templates for ${hookNames.length} hooks into ${outTemplatesDir}`);
