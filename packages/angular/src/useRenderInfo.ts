import { afterRender, Injector } from "@angular/core";

export function useRenderInfo(name: string = "Component", injector?: Injector) {
  let count = 0;
  let lastRender = Date.now();

  afterRender(() => {
    const now = Date.now();
    count++;
    console.log(`${name} rendered`, {
      count,
      sinceLast: now - lastRender,
      timestamp: now,
    });
    lastRender = now;
  }, { injector });
}

