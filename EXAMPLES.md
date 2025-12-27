# Examples

Practical use-cases for Shak Hooks across frameworks.

## Install

### React

```bash
npm i @shak-hooks/usehooks
```

### Vue

```bash
npm i @shak-hooks/usehooks-vue
```

### Angular

```bash
npm i @shak-hooks/usehooks-angular
```

## useCopyToClipboard (copy API key / invite code)

### React

```tsx
import * as React from "react";
import { useCopyToClipboard } from "@shak-hooks/usehooks";

const randomHash = crypto.randomUUID();

export default function App() {
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const hasCopiedText = Boolean(copiedText);

  return (
    <section>
      <h1>useCopyToClipboard</h1>
      <article>
        <label>Fake API Key</label>
        <pre>
          <code>{randomHash}</code>
          <button disabled={hasCopiedText} onClick={() => copyToClipboard(randomHash)}>
            {hasCopiedText ? "Copied" : "Copy"}
          </button>
        </pre>
      </article>
    </section>
  );
}
```

### Vue

```vue
<script setup lang="ts">
import { useCopyToClipboard } from "@shak-hooks/usehooks-vue";

const randomHash = crypto.randomUUID();
const { value, copy } = useCopyToClipboard();
</script>

<template>
  <section>
    <h1>useCopyToClipboard</h1>
    <pre>
      <code>{{ randomHash }}</code>
      <button :disabled="Boolean(value)" @click="copy(randomHash)">
        {{ value ? "Copied" : "Copy" }}
      </button>
    </pre>
  </section>
</template>
```

### Angular

```ts
import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { useCopyToClipboard } from "@shak-hooks/usehooks-angular";

@Component({
  selector: "app-copy",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h1>useCopyToClipboard</h1>
      <pre>
        <code>{{ randomHash() }}</code>
        <button [disabled]="Boolean(value())" (click)="copy(randomHash())">
          {{ value() ? "Copied" : "Copy" }}
        </button>
      </pre>
    </section>
  `,
})
export class CopyComponent {
  readonly randomHash = signal(crypto.randomUUID());
  private readonly clipboard = useCopyToClipboard();
  readonly value = this.clipboard.value;
  readonly copy = this.clipboard.copy;
}
```

## useDebounce (search input)

### React

```tsx
import * as React from "react";
import { useDebounce } from "@shak-hooks/usehooks";

export function SearchBox() {
  const [query, setQuery] = React.useState("");
  const debounced = useDebounce(query, 300);

  React.useEffect(() => {
    // call API with debounced
    // fetch(`/api/search?q=${encodeURIComponent(debounced)}`)
  }, [debounced]);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />;
}
```

### Vue

```vue
<script setup lang="ts">
import { ref, watch } from "vue";
import { useDebounce } from "@shak-hooks/usehooks-vue";

const query = ref("");
const debounced = useDebounce(query, 300);

watch(debounced, (q) => {
  // call API with q
});
</script>

<template>
  <input v-model="query" placeholder="Search..." />
</template>
```

## useClickAway (close dropdown)

### React

```tsx
import * as React from "react";
import { useClickAway } from "@shak-hooks/usehooks";

export function Dropdown() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);

  useClickAway(ref, () => setOpen(false));

  return (
    <div ref={ref}>
      <button onClick={() => setOpen((v) => !v)}>Toggle</button>
      {open && <div role="menu">Menu</div>}
    </div>
  );
}
```
