import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();

const FALLBACK_TEXT = "N/A";

function readUtf8(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function writeUtf8(filePath, contents) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, contents, "utf8");
}

function parseHookListFromIndex(indexPath) {
  const text = readUtf8(indexPath);
  const hooks = [];
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^export \* from "\.\/(use[^"]+)";\s*$/);
    if (match) hooks.push(match[1]);
  }
  return hooks;
}

function parseDescriptionsFromHooksTable(hooksMdPath) {
  const text = readUtf8(hooksMdPath);
  const start = text.indexOf("## Available Hooks");
  const end = text.indexOf("## Detailed API Reference");
  const table = start === -1 || end === -1 ? "" : text.slice(start, end);
  const lines = table.split(/\r?\n/).filter((l) => l.trim().startsWith("|"));
  const rows = lines.slice(2);
  const map = new Map();
  for (const row of rows) {
    const parts = row
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);
    if (parts.length >= 2) {
      const hook = parts[0].replace(/`/g, "");
      const desc = parts[1];
      map.set(hook, desc);
    }
  }
  return map;
}

function readHookSource(srcDir, hookName) {
  return readUtf8(path.join(srcDir, `${hookName}.ts`));
}

function extractSignature(text, hookName) {
  const lines = text.split(/\r?\n/);
  const start = lines.findIndex((l) => l.includes(`export function ${hookName}`));
  if (start === -1) return null;

  const signatureLines = [];
  for (let i = start; i < lines.length; i++) {
    const line = lines[i];
    signatureLines.push(line);
    if (/\)\s*(?::[\s\S]*)?\s*\{/.test(line)) break;
    if (signatureLines.length > 30) break;
  }

  const joined = signatureLines.join("\n").replace(/\s*\{\s*$/, "").trim();
  return joined;
}

function extractReturnShape(text) {
  const mObj = text.match(/return\s+\{\s*([^}]+?)\s*\};/s);
  if (mObj) {
    const inner = mObj[1];
    const keys = [];
    for (const part of inner.split(",")) {
      const raw = part.trim();
      if (!raw) continue;
      const keyMatch =
        raw.match(/^([A-Za-z_$][A-Za-z0-9_$]*)\s*:/) ||
        raw.match(/^([A-Za-z_$][A-Za-z0-9_$]*)\s*$/);
      if (keyMatch) keys.push(keyMatch[1]);
    }
    if (keys.length) return `{ ${keys.join(", ")} }`;
  }

  const mArr = text.match(/return\s+\[\s*([\s\S]+?)\s*\]\s*(?:as const)?\s*;/);
  if (mArr) {
    const inner = mArr[1]
      .split(/\r?\n/)
      .map((l) => l.trim())
      .join(" ");
    const compact = inner.replace(/\s+/g, " ").replace(/,\s*/g, ", ").trim();
    return `[ ${compact} ]`;
  }

  return null;
}

function inferNotes({ sourceText, framework }) {
  const notes = [];

  const browserApis = [];
  if (/\bdocument\b/.test(sourceText)) browserApis.push("document");
  if (/\bwindow\b/.test(sourceText)) browserApis.push("window");
  if (/\bnavigator\b/.test(sourceText)) browserApis.push("navigator");
  if (/\bIntersectionObserver\b/.test(sourceText)) browserApis.push("IntersectionObserver");
  if (/\bResizeObserver\b/.test(sourceText)) browserApis.push("ResizeObserver");
  if (/\bGeolocation\b|\bnavigator\.geolocation\b/.test(sourceText)) browserApis.push("Geolocation API");
  if (/\bnavigator\.clipboard\b/.test(sourceText)) browserApis.push("Clipboard API");

  if (browserApis.length) {
    notes.push(`Browser-only behavior (uses ${Array.from(new Set(browserApis)).join(", ")}).`);
  }

  if (framework === "angular") {
    if (/\binject\(/.test(sourceText)) notes.push("Use inside an injection context or pass an `Injector` when supported.");
    if (/\bafterRender\b|\bafterNextRender\b/.test(sourceText)) notes.push("Runs via Angular render hooks (`afterRender` / `afterNextRender`).");
  }

  if (/\bsetInterval\b|\bsetTimeout\b/.test(sourceText)) {
    notes.push("Timer-based; clears pending timers during cleanup.");
  }

  return notes;
}

function parseFirstCodeBlockFromReadmeSection(sectionText) {
  const match = sectionText.match(/```[a-zA-Z]*\s*[\s\S]*?\n```/);
  return match ? match[0].trim() : null;
}

function parsePerHookReadmeSections(readmePath) {
  const text = readUtf8(readmePath);
  const lines = text.split(/\r?\n/);
  const map = new Map();

  let current = null;
  let buffer = [];
  for (const line of lines) {
    const m = line.match(/^### `(?<hook>use[A-Za-z0-9_]+)`\s*$/);
    if (m) {
      if (current) map.set(current, buffer.join("\n").trim());
      current = m.groups.hook;
      buffer = [];
      continue;
    }
    if (current) buffer.push(line);
  }
  if (current) map.set(current, buffer.join("\n").trim());
  return map;
}

function mdEscape(text) {
  return text.replace(/\r?\n/g, " ").trim();
}

function splitTopLevel(text, delimiterChar = ",") {
  const parts = [];
  let start = 0;
  let depthParen = 0;
  let depthAngle = 0;
  let depthBracket = 0;
  let depthBrace = 0;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (!inDouble && !inTemplate && ch === "'" && text[i - 1] !== "\\") inSingle = !inSingle;
    else if (!inSingle && !inTemplate && ch === '"' && text[i - 1] !== "\\") inDouble = !inDouble;
    else if (!inSingle && !inDouble && ch === "`" && text[i - 1] !== "\\") inTemplate = !inTemplate;

    if (inSingle || inDouble || inTemplate) continue;

    if (ch === "(") depthParen++;
    else if (ch === ")") depthParen = Math.max(0, depthParen - 1);
    else if (ch === "<") depthAngle++;
    else if (ch === ">" && text[i - 1] !== "=") depthAngle = Math.max(0, depthAngle - 1); // ignore "=>"
    else if (ch === "[") depthBracket++;
    else if (ch === "]") depthBracket = Math.max(0, depthBracket - 1);
    else if (ch === "{") depthBrace++;
    else if (ch === "}") depthBrace = Math.max(0, depthBrace - 1);

    if (
      ch === delimiterChar &&
      depthParen === 0 &&
      depthAngle === 0 &&
      depthBracket === 0 &&
      depthBrace === 0
    ) {
      parts.push(text.slice(start, i).trim());
      start = i + 1;
    }
  }

  const last = text.slice(start).trim();
  if (last) parts.push(last);
  return parts;
}

function parseFunctionSignature(signature, hookName) {
  if (!signature) return null;
  const start = signature.indexOf(`export function ${hookName}`);
  if (start === -1) return null;

  const openParen = signature.indexOf("(", start);
  if (openParen === -1) return null;

  let closeParen = -1;
  let depth = 0;
  for (let i = openParen; i < signature.length; i++) {
    const ch = signature[i];
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (depth === 0) {
      closeParen = i;
      break;
    }
  }
  if (closeParen === -1) return null;

  const paramsText = signature.slice(openParen + 1, closeParen).trim();
  const after = signature.slice(closeParen + 1).trim();
  const returnTypeMatch = after.match(/^:\s*([^=]+?)\s*$/);
  const returnType = returnTypeMatch ? returnTypeMatch[1].trim() : null;

  const params = paramsText
    ? splitTopLevel(paramsText).map((raw) => {
        const param = raw.trim().replace(/\s+/g, " ");
        const rest = param.startsWith("...");
        const cleaned = rest ? param.slice(3) : param;
        const [namePart, ...typeParts] = cleaned.split(":");
        const nameRaw = (namePart ?? "").trim();
        const optional = nameRaw.endsWith("?");
        const name = nameRaw.replace(/\?$/, "");
        const rawType = typeParts.length ? typeParts.join(":").trim() : null;
        const type =
          rawType && !rawType.includes("=>") ? rawType.replace(/\s*=\s*[\s\S]*$/, "").trim() : rawType;
        return { name, optional, rest, type, raw: param };
      })
    : [];

  return { params, returnType };
}

function describeParam({ hook, paramName, framework }) {
  const byName = {
    callback: "Callback function invoked by the hook.",
    delay: "Delay in milliseconds.",
    defaultValue: "Fallback value used when the current value is null/undefined.",
    element: "DOM element (or element ref) the hook should observe.",
    event: "Event name to listen for.",
    events: "Event names to listen for.",
    handler: "Event handler callback.",
    initialSeconds: "Initial duration in seconds.",
    initialValue: "Initial value for the internal state.",
    interval: "Interval duration in milliseconds.",
    key: "Storage key.",
    max: "Maximum allowed value.",
    maxRetries: "Maximum retry attempts.",
    min: "Minimum allowed value.",
    ms: "Duration in milliseconds.",
    options: "Optional configuration object.",
    target: "Target element or ref used by the hook.",
    value: "Input value tracked by the hook.",
  };

  if (hook === "useDebounce" && paramName === "value") {
    return framework === "react"
      ? "The value to debounce. Changes restart the timer."
      : "The reactive source to debounce. Changes restart the timer.";
  }
  if (hook === "useDebounce" && paramName === "delay") return "Debounce delay in milliseconds.";

  if (hook === "useCopyToClipboard" && paramName === "text") {
    return "Text to copy into the clipboard.";
  }

  return byName[paramName] ?? "Parameter used by the hook.";
}

function describeReturn({ hook, nameOrIndex }) {
  const byFieldName = {
    actions: "Helper actions to update the state.",
    add: "Adds an item/value.",
    append: "Appends an item/value.",
    charging: "Whether the device is currently charging.",
    chargingTime: "Seconds until the battery is fully charged (if available).",
    clear: "Clears the data/state.",
    clearQueue: "Clears the queue.",
    count: "Current count value.",
    data: "Response data (or null/undefined while loading).",
    dec: "Decrements the value.",
    dequeue: "Removes the next item from the queue.",
    dischargingTime: "Seconds until the battery is discharged (if available).",
    element: "Observed/measured element reference.",
    enqueue: "Adds an item to the queue.",
    error: "Last error (or null).",
    height: "Current height value.",
    inc: "Increments the value.",
    isClient: "Whether the code is running in a browser environment.",
    isFirstRender: "Whether this is the first render/update.",
    isHovered: "Whether the target element is currently hovered.",
    isIdle: "Whether the user is currently idle.",
    isIntersecting: "Whether the target is intersecting the viewport.",
    isOnline: "Whether the browser is currently online.",
    level: "Battery level from 0 to 1 (if available).",
    loading: "Whether an async operation is in progress.",
    orientation: "Current device orientation information.",
    pop: "Removes the last item/value.",
    push: "Adds an item/value.",
    queue: "Current queued items.",
    rect: "Latest measured rectangle data.",
    reset: "Resets state back to its initial value.",
    run: "Runs the underlying callback/action.",
    set: "Sets the value directly.",
    size: "Current size values.",
    start: "Starts the timer/process.",
    stop: "Stops the timer/process.",
    state: "Current state value.",
    toggle: "Toggles a boolean state.",
    value: "Current value.",
    width: "Current width value.",
    x: "Current X coordinate.",
    y: "Current Y coordinate.",
  };

  if (hook === "useCopyToClipboard") {
    if (nameOrIndex === "value") return "Last successfully copied text (or null).";
    if (nameOrIndex === "copy") return "Async function that attempts to copy text; resolves to true/false.";
    if (nameOrIndex === "error") return "Last copy error (or null).";
    if (nameOrIndex === "0") return "Last successfully copied text (or null).";
    if (nameOrIndex === "1") return "Async function that attempts to copy text; resolves to true/false.";
    if (nameOrIndex === "2") return "Last copy error (or null).";
  }
  if (hook === "useDebounce") return "Debounced version of the input value.";
  return byFieldName[nameOrIndex] ?? "Value returned by the hook.";
}

function toTitle(framework) {
  if (framework === "react") return "React Hooks";
  if (framework === "vue") return "Vue Composables";
  if (framework === "angular") return "Angular Signals";
  return framework;
}

function packageName(framework) {
  return `@shak-hooks/${framework}`;
}

function languageForFramework(framework) {
  if (framework === "react") return "tsx";
  if (framework === "vue") return "ts";
  return "ts";
}

function installBlock(framework) {
  return [
    "```bash",
    `npm i ${packageName(framework)}`,
    "```",
    "",
  ].join("\n");
}

function importBlock(framework, hook) {
  return [
    "```ts",
    `import { ${hook} } from "${packageName(framework)}";`,
    "```",
  ].join("\n");
}

function makeToc(hooks) {
  return hooks.map((h) => `- [\`${h}\`](#${h.toLowerCase()})`).join("\n");
}

function extractReturnItems(sourceText) {
  const objectMatch = sourceText.match(/return\s+\{\s*([^}]+?)\s*\};/s);
  if (objectMatch) {
    const inner = objectMatch[1];
    const keys = [];
    for (const part of inner.split(",")) {
      const raw = part.trim();
      if (!raw) continue;
      const keyMatch =
        raw.match(/^([A-Za-z_$][A-Za-z0-9_$]*)\s*:/) ||
        raw.match(/^([A-Za-z_$][A-Za-z0-9_$]*)\s*$/);
      if (keyMatch) keys.push(keyMatch[1]);
    }
    return { kind: "object", items: Array.from(new Set(keys)) };
  }

  const tupleMatch = sourceText.match(/return\s+\[\s*([\s\S]+?)\s*\]\s*(?:as const)?\s*;/);
  if (tupleMatch) {
    const inner = tupleMatch[1]
      .split(/\r?\n/)
      .map((l) => l.trim())
      .join(" ");
    const parts = splitTopLevel(inner).map((p) => p.trim()).filter(Boolean);
    return { kind: "tuple", items: parts };
  }

  return null;
}

function renderHookSection({ framework, hook, description, signature, example, returnShape, notes, sourceText }) {
  const out = [];
  const parsedSignature = parseFunctionSignature(signature, hook);
  const returnItems = extractReturnItems(sourceText);

  out.push(`## ${hook}`);
  out.push("");

  out.push("### Overview");
  out.push(description ? mdEscape(description) : FALLBACK_TEXT);
  out.push("");

  out.push("### Usage");
  if (hook === "useDebounce") {
    out.push(
      framework === "react"
        ? "Use this when you want to delay updates to a rapidly-changing value (like a text input) before using it in expensive work (fetching, filtering, analytics)."
        : "Use this when you want to delay updates to a reactive source (Signal/Ref) before using it in expensive work (fetching, filtering, analytics)."
    );
  } else if (hook === "useCopyToClipboard") {
    out.push(
      "Use this to implement a copy button that reports whether the copy succeeded and exposes the last copied value and error state."
    );
  } else {
    out.push("Use this hook to reduce boilerplate around this behavior and keep logic reusable.");
  }
  out.push("");

  out.push("### Import");
  out.push(importBlock(framework, hook));
  out.push("");

  out.push("### Reference");
  if (signature) {
    out.push("**Signature**");
    out.push("");
    out.push("```ts");
    out.push(signature);
    out.push("```");
    out.push("");
  }
  if (parsedSignature?.params?.length) {
    out.push("**Parameters**");
    out.push("");
    out.push("| Name | Type | Description |");
    out.push("|------|------|-------------|");
    for (const p of parsedSignature.params) {
      const name = `\`${p.rest ? "..." : ""}${p.name}${p.optional ? "?" : ""}\``;
      const type = p.type ? `\`${p.type}\`` : `\`${FALLBACK_TEXT}\``;
      const desc = mdEscape(describeParam({ hook, paramName: p.name, framework }));
      out.push(`| ${name} | ${type} | ${desc} |`);
    }
    out.push("");
  }

  if (returnShape) {
    out.push("**Returns**");
    out.push("");
    out.push("```ts");
    out.push(returnShape);
    out.push("```");
    out.push("");

    if (returnItems?.kind === "object" && returnItems.items.length) {
      out.push("| Field | Description |");
      out.push("|-------|-------------|");
      for (const key of returnItems.items) {
        out.push(`| \`${key}\` | ${mdEscape(describeReturn({ hook, nameOrIndex: key }))} |`);
      }
      out.push("");
    }

    if (returnItems?.kind === "tuple" && returnItems.items.length) {
      out.push("| Index | Value | Description |");
      out.push("|-------|-------|-------------|");
      returnItems.items.forEach((item, idx) => {
        const compactItem = mdEscape(item);
        const identifierMatch = compactItem.match(/^[A-Za-z_$][A-Za-z0-9_$]*$/);
        const descKey = identifierMatch ? identifierMatch[0] : String(idx);
        const desc =
          compactItem.startsWith("{") ? "Helper actions to update the state." : describeReturn({ hook, nameOrIndex: descKey });
        out.push(`| \`${idx}\` | \`${compactItem}\` | ${mdEscape(desc)} |`);
      });
      out.push("");
    }
  }

  out.push("### Example");
  if (example) {
    out.push(example);
  } else {
    out.push("```" + languageForFramework(framework));
    out.push(`const result = ${hook}();`);
    out.push("```");
  }
  out.push("");

  out.push("### Notes");
  if (notes.length) {
    for (const n of notes) out.push(`- ${n}`);
  } else {
    out.push("- None.");
  }
  out.push("");

  return out.join("\n");
}

function generateFrameworkDoc({ framework, indexPath, srcDir, readmePath, outPath, descriptionMap }) {
  const hooks = parseHookListFromIndex(indexPath);
  if (hooks.length !== 50) {
    throw new Error(`${framework}: expected 50 hooks, got ${hooks.length}`);
  }

  const readmeSections = parsePerHookReadmeSections(readmePath);
  const sortedHooks = [...hooks].sort((a, b) => a.localeCompare(b));

  const doc = [];
  doc.push(`# ${toTitle(framework)} (${packageName(framework)})`);
  doc.push("");
  doc.push("## Install");
  doc.push("");
  doc.push(installBlock(framework).trimEnd());
  doc.push("");
  doc.push("## Hooks (A-Z)");
  doc.push("");
  doc.push(makeToc(sortedHooks));
  doc.push("");

  for (const hook of sortedHooks) {
    const sourceText = readHookSource(srcDir, hook);
    const signature = extractSignature(sourceText, hook) ?? undefined;
    const returnShape = extractReturnShape(sourceText) ?? undefined;

    const readmeSection = readmeSections.get(hook) ?? "";
    const example = parseFirstCodeBlockFromReadmeSection(readmeSection) ?? undefined;

    const notes = inferNotes({ sourceText, framework });

    doc.push(
      renderHookSection({
        framework,
        hook,
        description: descriptionMap.get(hook),
        signature,
        example,
        returnShape,
        notes,
        sourceText,
      })
    );
  }

  writeUtf8(outPath, doc.join("\n"));
}

const descriptions = parseDescriptionsFromHooksTable(path.join(repoRoot, "HOOKS.md"));
descriptions.set("useIsFirstRender", "Indicates whether this is the first render.");
descriptions.set("useRenderCount", "Tracks how many times a component has rendered/updated.");
descriptions.set("useRenderInfo", "Logs render/update timing information.");

generateFrameworkDoc({
  framework: "react",
  indexPath: path.join(repoRoot, "packages/react/src/index.ts"),
  srcDir: path.join(repoRoot, "packages/react/src"),
  readmePath: path.join(repoRoot, "packages/react/README.md"),
  outPath: path.join(repoRoot, "react-hooks.md"),
  descriptionMap: descriptions,
});

generateFrameworkDoc({
  framework: "vue",
  indexPath: path.join(repoRoot, "packages/vue/src/index.ts"),
  srcDir: path.join(repoRoot, "packages/vue/src"),
  readmePath: path.join(repoRoot, "packages/vue/README.md"),
  outPath: path.join(repoRoot, "vue-hooks.md"),
  descriptionMap: descriptions,
});

generateFrameworkDoc({
  framework: "angular",
  indexPath: path.join(repoRoot, "packages/angular/src/index.ts"),
  srcDir: path.join(repoRoot, "packages/angular/src"),
  readmePath: path.join(repoRoot, "packages/angular/README.md"),
  outPath: path.join(repoRoot, "angular-hooks.md"),
  descriptionMap: descriptions,
});

console.log("Generated: react-hooks.md, vue-hooks.md, angular-hooks.md");
