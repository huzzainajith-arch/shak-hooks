import Link from "next/link";

export default function ExamplesPage() {
  return (
    <div className="py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Examples</h1>
        <p className="text-gray-600 mt-2">
          Practical snippets for React, Vue, and Angular.
        </p>
      </div>

      <div className="space-y-10">
        <section className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">useCopyToClipboard</h2>
          <p className="text-gray-600 mb-4">Copy API keys, invite codes, share links.</p>
          <pre className="bg-gray-50 border rounded p-4 overflow-auto text-sm">
            <code>{`import { useCopyToClipboard } from "@shak-hooks/usehooks";

const [copiedText, copyToClipboard] = useCopyToClipboard();
await copyToClipboard("hello");`}</code>
          </pre>
        </section>

        <section className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">useDebounce</h2>
          <p className="text-gray-600 mb-4">Debounced search input / autosave.</p>
          <pre className="bg-gray-50 border rounded p-4 overflow-auto text-sm">
            <code>{`import * as React from "react";
import { useDebounce } from "@shak-hooks/usehooks";

const [q, setQ] = React.useState("");
const debounced = useDebounce(q, 300);`}</code>
          </pre>
        </section>

        <section className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">More</h2>
          <p className="text-gray-600">
            Full examples live in the repo:{" "}
            <Link className="underline" href="https://github.com/huzzainajith-arch/shak-hooks">
              GitHub
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

