"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { hooks } from "../data/hooks";

export default function HooksPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return hooks;
    return hooks.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.description.toLowerCase().includes(q) ||
        h.useCases.some((u) => u.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className="py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Hooks</h1>
        <p className="text-gray-600 mt-2">
          Install:{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">
            npm i @shak-hooks/usehooks
          </code>{" "}
          (React) |{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">
            npm i @shak-hooks/usehooks-vue
          </code>{" "}
          (Vue) |{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">
            npm i @shak-hooks/usehooks-angular
          </code>{" "}
          (Angular)
        </p>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <input
          className="w-full max-w-xl border rounded px-3 py-2"
          placeholder="Search hooks (name, description, use-cases)…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Link className="text-sm underline text-gray-600" href="/examples">
          Examples
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((h) => (
          <div key={h.name} className="border rounded-lg p-5 shadow-sm">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-mono text-lg font-semibold">{h.name}</h2>
              <span className="text-xs text-gray-500">React · Vue · Angular</span>
            </div>
            <p className="text-gray-700 mt-2">{h.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {h.useCases.map((u) => (
                <span
                  key={u}
                  className="text-xs bg-gray-100 border border-gray-200 rounded-full px-2 py-1"
                >
                  {u}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-gray-600 mt-8">No hooks match that search.</div>
      )}
    </div>
  );
}
