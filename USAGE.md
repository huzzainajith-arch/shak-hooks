# Usage Examples

Here is how to use **Shak Hooks** across different frameworks.

## React

**Install:**
```bash
npm i @shak-hooks/usehooks
```

**Usage:**
```tsx
import * as React from "react";
import { useCopyToClipboard } from "@shak-hooks/usehooks";

export default function App() {
  const randomHash = crypto.randomUUID();
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const hasCopiedText = Boolean(copiedText);

  return (
    <section>
      <h1>useCopyToClipboard</h1>
      <article>
        <label>Fake API Key</label>
        <pre>
          <code>{randomHash}</code>
          <button disabled={hasCopiedText} className="link" onClick={() => copyToClipboard(randomHash)}>
            {hasCopiedText ? "Copied" : "Copy"}
          </button>
        </pre>
      </article>
    </section>
  );
}
```

## Vue

**Install:**
```bash
npm i @shak-hooks/usehooks-vue
```

**Usage:**
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
      <button :disabled="Boolean(value)" class="link" @click="copy(randomHash)">
        {{ value ? "Copied" : "Copy" }}
      </button>
    </pre>
  </section>
</template>
```

## Angular

**Install:**
```bash
npm i @shak-hooks/usehooks-angular
```

**Usage:**
```typescript
import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { useCopyToClipboard } from "@shak-hooks/usehooks-angular";

@Component({
  selector: "app-copy-to-clipboard",
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h1>useCopyToClipboard</h1>
      <pre>
        <code>{{ randomHash() }}</code>
        <button [disabled]="Boolean(value())" class="link" (click)="copy(randomHash())">
          {{ value() ? "Copied" : "Copy" }}
        </button>
      </pre>
    </section>
  `
})
export class CopyToClipboardComponent {
  readonly randomHash = signal(crypto.randomUUID());
  readonly clipboardHook = useCopyToClipboard();
  readonly value = this.clipboardHook.value;
  readonly copy = this.clipboardHook.copy;
}
```

