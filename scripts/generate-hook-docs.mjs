import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const repoRoot = path.resolve(process.cwd());

const reactIndexPath = path.join(repoRoot, "packages", "react", "src", "index.ts");
const reactIndex = fs.readFileSync(reactIndexPath, "utf8");

const hookNames = reactIndex
  .split(/\r?\n/)
  .map((line) => line.match(/export \* from "\.\/(use[^"]+)";/))
  .filter(Boolean)
  .map((m) => m[1]);

const frameworks = [
  {
    key: "react",
    label: "React",
    importFrom: "@shak-hooks/usehooks",
    srcDir: path.join(repoRoot, "packages", "react", "src"),
    fileExt: ".ts",
    readValueHint: "Use values directly (React state).",
  },
  {
    key: "vue",
    label: "Vue",
    importFrom: "@shak-hooks/usehooks-vue",
    srcDir: path.join(repoRoot, "packages", "vue", "src"),
    fileExt: ".ts",
    readValueHint: "Read reactive values via `.value` (Vue refs).",
  },
  {
    key: "angular",
    label: "Angular",
    importFrom: "@shak-hooks/usehooks-angular",
    srcDir: path.join(repoRoot, "packages", "angular", "src"),
    fileExt: ".ts",
    readValueHint: "Read reactive values by calling signals: `value()`.",
  },
];

function hasExportModifier(node) {
  return (
    Array.isArray(node.modifiers) &&
    node.modifiers.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
  );
}

function printNode(sourceFile, node) {
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  return printer.printNode(ts.EmitHint.Unspecified, node, sourceFile).trim();
}

function buildSignature(sourceFile, fn) {
  const name = fn.name?.text ?? "anonymous";
  const typeParams =
    fn.typeParameters?.length > 0
      ? `<${fn.typeParameters.map((tp) => printNode(sourceFile, tp)).join(", ")}>`
      : "";
  const params = fn.parameters.map((p) => printNode(sourceFile, p)).join(", ");
  const returnType = fn.type ? `: ${printNode(sourceFile, fn.type)}` : "";
  return `export function ${name}${typeParams}(${params})${returnType}`;
}

function getExportedTypes(sourceFile) {
  const exported = [];
  sourceFile.forEachChild((node) => {
    if (!hasExportModifier(node)) return;
    if (
      ts.isInterfaceDeclaration(node) ||
      ts.isTypeAliasDeclaration(node) ||
      ts.isEnumDeclaration(node)
    ) {
      exported.push(printNode(sourceFile, node));
    }
  });
  return exported.join("\n\n");
}

function getFunctionDoc(sourcePath, hookName) {
  const sourceText = fs.readFileSync(sourcePath, "utf8");
  const sourceFile = ts.createSourceFile(
    sourcePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  );

  /** @type {ts.FunctionDeclaration | undefined} */
  let fn;
  sourceFile.forEachChild((node) => {
    if (!ts.isFunctionDeclaration(node)) return;
    if (!hasExportModifier(node)) return;
    if (node.name?.text !== hookName) return;
    fn = node;
  });

  if (!fn) {
    throw new Error(`Could not find exported function ${hookName} in ${sourcePath}`);
  }

  const params = fn.parameters.map((p) => {
    const name = printNode(sourceFile, p.name);
    const type = p.type ? printNode(sourceFile, p.type) : "unknown";
    const optional = Boolean(p.questionToken) || Boolean(p.initializer);
    const defaultValue = p.initializer ? printNode(sourceFile, p.initializer) : null;
    return { name, type, optional, defaultValue };
  });

  const returns = fn.type ? printNode(sourceFile, fn.type) : "unknown";

  return {
    signature: buildSignature(sourceFile, fn),
    params,
    returns,
    exportedTypes: getExportedTypes(sourceFile),
  };
}

function buildUsageSnippet({ hookName, importFrom, params, returns, valueHint }) {
  const argList =
    params.length === 0
      ? ""
      : params
          .map((p) => {
            if (p.optional) return "undefined";
            if (p.type.includes("string")) return '"..."';
            if (p.type.includes("number")) return "0";
            if (p.type.includes("boolean")) return "false";
            if (p.type.includes("HTMLElement") || p.type.includes("Element")) return "null";
            return "undefined";
          })
          .join(", ");

  return [
    `import { ${hookName} } from "${importFrom}";`,
    "",
    `const result = ${hookName}(${argList});`,
    `// result: ${returns}`,
    `// ${valueHint}`,
  ].join("\n");
}

/** @type {Record<string, any>} */
const docs = {};

for (const hookName of hookNames) {
  docs[hookName] = {};
  for (const framework of frameworks) {
    const sourcePath = path.join(framework.srcDir, `${hookName}${framework.fileExt}`);
    const info = getFunctionDoc(sourcePath, hookName);
    docs[hookName][framework.key] = {
      ...info,
      importFrom: framework.importFrom,
      usage: buildUsageSnippet({
        hookName,
        importFrom: framework.importFrom,
        params: info.params,
        returns: info.returns,
        valueHint: framework.readValueHint,
      }),
      sourcePath: path.relative(repoRoot, sourcePath).replaceAll("\\", "/"),
    };
  }
}

const outPath = path.join(repoRoot, "apps", "docs", "app", "data", "hookDocs.generated.ts");
const out = `/* This file is generated by scripts/generate-hook-docs.mjs. Do not edit by hand. */

export type HookParam = {
  name: string;
  type: string;
  optional: boolean;
  defaultValue: string | null;
};

export type HookFrameworkDoc = {
  importFrom: string;
  signature: string;
  params: HookParam[];
  returns: string;
  exportedTypes: string;
  usage: string;
  sourcePath: string;
};

export type HookDocs = Record<
  string,
  {
    react: HookFrameworkDoc;
    vue: HookFrameworkDoc;
    angular: HookFrameworkDoc;
  }
>;

export const hookDocs: HookDocs = ${JSON.stringify(docs, null, 2)};
`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, out, "utf8");

console.log(`Generated ${outPath}`);

