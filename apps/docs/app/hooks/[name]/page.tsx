import Link from "next/link";
import { notFound } from "next/navigation";

import { hooks } from "../../data/hooks";
import { hookDocs } from "../../data/hookDocs.generated";

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-gray-50 border rounded p-4 overflow-auto text-sm">
      <code>{code}</code>
    </pre>
  );
}

function ParamsTable({
  params,
}: {
  params: {
    name: string;
    type: string;
    optional: boolean;
    defaultValue: string | null;
  }[];
}) {
  if (!params.length) return <div className="text-sm text-gray-600">No parameters.</div>;

  return (
    <div className="overflow-auto border rounded">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-2">Param</th>
            <th className="text-left p-2">Type</th>
            <th className="text-left p-2">Optional</th>
            <th className="text-left p-2">Default</th>
          </tr>
        </thead>
        <tbody>
          {params.map((p) => (
            <tr key={p.name} className="border-t">
              <td className="p-2 font-mono">{p.name}</td>
              <td className="p-2 font-mono">{p.type}</td>
              <td className="p-2">{p.optional ? "Yes" : "No"}</td>
              <td className="p-2 font-mono">{p.defaultValue ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function HookDetailPage({ params }: { params: { name: string } }) {
  const hookName = params.name;
  const info = hooks.find((h) => h.name === hookName);
  const api = hookDocs[hookName];

  if (!info || !api) notFound();

  const cliCommands = `pnpm dlx @shak-hooks/cli@latest init
pnpm dlx @shak-hooks/cli@latest add ${hookName}`;

  return (
    <div className="py-10">
      <div className="mb-8">
        <div className="text-sm text-gray-600">
          <Link className="underline" href="/hooks">
            Hooks
          </Link>{" "}
          / <span className="font-mono">{hookName}</span>
        </div>

        <h1 className="text-3xl font-bold mt-2 font-mono">{hookName}</h1>
        <p className="text-gray-700 mt-2">{info.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {info.useCases.map((u) => (
            <span
              key={u}
              className="text-xs bg-gray-100 border border-gray-200 rounded-full px-2 py-1"
            >
              {u}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-10">
        <section className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Get It</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="text-sm font-semibold mb-2">Option A: npm</div>
              <div className="text-sm text-gray-600 mb-2">
                Import from the published packages.
              </div>
              <CodeBlock
                code={`// React\nimport { ${hookName} } from "@shak-hooks/react";\n// or\nimport { ${hookName} } from "@shak-hooks/usehooks";\n\n// Vue\nimport { ${hookName} } from "@shak-hooks/vue";\n// or\nimport { ${hookName} } from "@shak-hooks/usehooks-vue";\n\n// Angular\nimport { ${hookName} } from "@shak-hooks/angular";\n// or\nimport { ${hookName} } from "@shak-hooks/usehooks-angular";`}
              />
            </div>
            <div>
              <div className="text-sm font-semibold mb-2">Option B: copy source (CLI)</div>
              <div className="text-sm text-gray-600 mb-2">
                Copy hook code into your app and customize it.
              </div>
              <CodeBlock code={cliCommands} />
              <div className="text-xs text-gray-600 mt-2">
                Default output: <code>src/shak-hooks/</code> (React/Vue),{" "}
                <code>src/app/shak-hooks/</code> (Angular)
              </div>
            </div>
          </div>
        </section>

        <section className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">React</h2>
          <div className="text-sm text-gray-600 mb-3">
            Install: <code className="bg-gray-100 px-2 py-1 rounded">npm i @shak-hooks/usehooks</code>
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-sm font-semibold mb-2">Usage</div>
              <CodeBlock code={api.react.usage} />
            </div>
            <div>
              <div className="text-sm font-semibold mb-2">Signature</div>
              <CodeBlock code={api.react.signature} />
            </div>
            <div>
              <div className="text-sm font-semibold mb-2">Parameters</div>
              <ParamsTable params={api.react.params} />
            </div>
            <div>
              <div className="text-sm font-semibold mb-2">Returns</div>
              <CodeBlock code={api.react.returns} />
            </div>
            {api.react.exportedTypes ? (
              <div>
                <div className="text-sm font-semibold mb-2">Types</div>
                <CodeBlock code={api.react.exportedTypes} />
              </div>
            ) : null}
            <div className="text-sm text-gray-600">
              Source: <code className="bg-gray-100 px-2 py-1 rounded">{api.react.sourcePath}</code>
            </div>
          </div>
        </section>

        <section className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Vue</h2>
          <div className="text-sm text-gray-600 mb-3">
            Install:{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">
              npm i @shak-hooks/usehooks-vue
            </code>
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-sm font-semibold mb-2">Usage</div>
              <CodeBlock code={api.vue.usage} />
            </div>
            <div>
              <div className="text-sm font-semibold mb-2">Signature</div>
              <CodeBlock code={api.vue.signature} />
            </div>
            <div>
              <div className="text-sm font-semibold mb-2">Parameters</div>
              <ParamsTable params={api.vue.params} />
            </div>
            <div>
              <div className="text-sm font-semibold mb-2">Returns</div>
              <CodeBlock code={api.vue.returns} />
            </div>
            {api.vue.exportedTypes ? (
              <div>
                <div className="text-sm font-semibold mb-2">Types</div>
                <CodeBlock code={api.vue.exportedTypes} />
              </div>
            ) : null}
            <div className="text-sm text-gray-600">
              Source: <code className="bg-gray-100 px-2 py-1 rounded">{api.vue.sourcePath}</code>
            </div>
          </div>
        </section>

        <section className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Angular</h2>
          <div className="text-sm text-gray-600 mb-3">
            Install:{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">
              npm i @shak-hooks/usehooks-angular
            </code>
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-sm font-semibold mb-2">Usage</div>
              <CodeBlock code={api.angular.usage} />
            </div>
            <div>
              <div className="text-sm font-semibold mb-2">Signature</div>
              <CodeBlock code={api.angular.signature} />
            </div>
            <div>
              <div className="text-sm font-semibold mb-2">Parameters</div>
              <ParamsTable params={api.angular.params} />
            </div>
            <div>
              <div className="text-sm font-semibold mb-2">Returns</div>
              <CodeBlock code={api.angular.returns} />
            </div>
            {api.angular.exportedTypes ? (
              <div>
                <div className="text-sm font-semibold mb-2">Types</div>
                <CodeBlock code={api.angular.exportedTypes} />
              </div>
            ) : null}
            <div className="text-sm text-gray-600">
              Source:{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">{api.angular.sourcePath}</code>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
