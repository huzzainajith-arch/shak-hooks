"use client";

import { useCounter } from "@shak-hooks/react";
import { useMeasure } from "@shak-hooks/react";
import Link from "next/link";

export default function Home() {
  const [count, { inc, dec, reset }] = useCounter(0, { min: 0, max: 10 });
  const [measureRef, rect] = useMeasure<HTMLDivElement>();

  return (
    <div className="py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Shak Hooks</h1>
        <p className="text-xl text-gray-600">
          One hook library for React, Vue, and Angular.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/install"
            className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800"
          >
            Install
          </Link>
          <Link
            href="/examples"
            className="px-4 py-2 rounded border hover:bg-gray-50"
          >
            See examples
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Option A: npm</h2>
          <p className="text-sm text-gray-600 mb-4">
            Install and import from packages.
          </p>
          <pre className="bg-gray-50 border rounded p-4 overflow-auto text-sm">
            <code>{`npm i @shak-hooks/usehooks
npm i @shak-hooks/usehooks-vue
npm i @shak-hooks/usehooks-angular`}</code>
          </pre>
        </div>
        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Option B: copy code (CLI)</h2>
          <p className="text-sm text-gray-600 mb-4">
            Add hook source to your app and customize it.
          </p>
          <pre className="bg-gray-50 border rounded p-4 overflow-auto text-sm">
            <code>{`pnpm dlx @shak-hooks/cli@latest init
pnpm dlx @shak-hooks/cli@latest add useCopyToClipboard`}</code>
          </pre>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* useCounter Demo */}
        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">useCounter Demo</h2>
          <div className="flex items-center justify-center gap-4 mb-4">
            <button
              onClick={() => dec()}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              -
            </button>
            <span className="text-3xl font-mono font-bold w-12 text-center">
              {count}
            </span>
            <button
              onClick={() => inc()}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              +
            </button>
          </div>
          <button
            onClick={() => reset()}
            className="text-sm text-gray-500 underline"
          >
            Reset
          </button>
        </div>

        {/* useMeasure Demo */}
        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">useMeasure Demo</h2>
          <div className="mb-4 text-sm text-gray-600">
            Resize this box to see values change
          </div>
          <div
            ref={measureRef}
            className="bg-blue-50 border-2 border-blue-200 rounded p-4 overflow-auto resize"
            style={{ height: "150px" }}
          >
            <pre className="text-xs">
              {JSON.stringify(
                {
                  width: Math.floor(rect.width),
                  height: Math.floor(rect.height),
                },
                null,
                2
              )}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
