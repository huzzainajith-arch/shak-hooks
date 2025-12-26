# Usage Examples

Here is how to use **Shak Hooks** across different frameworks.

## React

**Install:**
```bash
npm i @shak-hooks/react
```

**Usage:**
```tsx
import * as React from "react";
import { useMeasure } from "@shak-hooks/react";

export default function App() {
  const [ref, rect] = useMeasure();

  return (
    <section>
      <h1>useMeasure</h1>
      <article ref={ref} style={{ resize: "both", overflow: "auto", border: "1px solid #ccc", padding: "20px" }}>
        <p>Width: {Math.floor(rect.width)}</p>
        <p>Height: {Math.floor(rect.height)}</p>
      </article>
    </section>
  );
}
```

## Vue

**Install:**
```bash
npm i @shak-hooks/vue
```

**Usage:**
```vue
<script setup lang="ts">
import { useMeasure } from "@shak-hooks/vue";

const [elementRef, rect] = useMeasure();
</script>

<template>
  <section>
    <h1>useMeasure</h1>
    <article ref="elementRef" style="resize: both; overflow: auto; border: 1px solid #ccc; padding: 20px;">
      <p>Width: {{ Math.floor(rect.width) }}</p>
      <p>Height: {{ Math.floor(rect.height) }}</p>
    </article>
  </section>
</template>
```

## Angular

**Install:**
```bash
npm i @shak-hooks/angular
```

**Usage:**
```typescript
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { useMeasure } from '@shak-hooks/angular';

@Component({
  selector: 'app-measure',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h1>useMeasure</h1>
      <article #target style="resize: both; overflow: auto; border: 1px solid #ccc; padding: 20px;">
        <p>Width: {{ Math.floor(rect().width) }}</p>
        <p>Height: {{ Math.floor(rect().height) }}</p>
      </article>
    </section>
  `
})
export class MeasureComponent implements AfterViewInit {
  @ViewChild('target') target!: ElementRef;
  
  // Initialize hook
  measureHook = useMeasure();
  ref = this.measureHook[0];
  rect = this.measureHook[1];
  
  // Helper for template
  Math = Math;

  ngAfterViewInit() {
    // Connect the element to the hook
    this.ref.set(this.target);
  }
}
```

