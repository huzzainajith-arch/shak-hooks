import Link from "next/link";

function Code({ children }: { children: string }) {
  return (
    <pre className="bg-gray-50 border rounded p-4 overflow-auto text-sm">
      <code>{children}</code>
    </pre>
  );
}

export default function InstallPage() {
  return (
    <div className="py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Install</h1>
        <p className="text-gray-600 mt-2">
          Choose one: install from npm or copy source into your project (shadcn-style).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Option A: npm package</h2>
          <p className="text-gray-600 mb-4">
            Best when you want easy upgrades and don’t need to edit the source.
          </p>

          <div className="space-y-4">
            <div>
              <div className="text-sm font-semibold mb-2">React</div>
              <Code>{`npm i @shak-hooks/react
# or
npm i @shak-hooks/usehooks`}</Code>
            </div>
            <div>
              <div className="text-sm font-semibold mb-2">Vue</div>
              <Code>{`npm i @shak-hooks/vue
# or
npm i @shak-hooks/usehooks-vue`}</Code>
            </div>
            <div>
              <div className="text-sm font-semibold mb-2">Angular</div>
              <Code>{`npm i @shak-hooks/angular
# or
npm i @shak-hooks/usehooks-angular`}</Code>
            </div>

            <div className="text-sm text-gray-600">
              Next: <Link className="underline" href="/hooks">browse hooks</Link>.
            </div>
          </div>
        </section>

        <section className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Option B: copy source (CLI)</h2>
          <p className="text-gray-600 mb-4">
            Best when you want full control and customization.
          </p>

          <div className="space-y-4">
            <div>
              <div className="text-sm font-semibold mb-2">Init</div>
              <Code>{`pnpm dlx @shak-hooks/cli@latest init`}</Code>
              <div className="text-xs text-gray-600 mt-2">
                Default output: <code>src/shak-hooks/</code> (React/Vue),{" "}
                <code>src/app/shak-hooks/</code> (Angular)
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold mb-2">Add hooks</div>
              <Code>{`pnpm dlx @shak-hooks/cli@latest add useCopyToClipboard
pnpm dlx @shak-hooks/cli@latest add useCounter useDebounce
pnpm dlx @shak-hooks/cli@latest add all`}</Code>
            </div>

            <div>
              <div className="text-sm font-semibold mb-2">Import locally</div>
              <Code>{`// after "add", import from your local folder
import { useCopyToClipboard } from "./shak-hooks";`}</Code>
            </div>

            <div className="text-sm text-gray-600">
              More: <Link className="underline" href="https://github.com/huzzainajith-arch/shak-hooks/blob/main/CLI.md">CLI docs</Link>.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
