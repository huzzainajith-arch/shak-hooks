import { afterRender, Injector, Signal, signal } from "@angular/core";

export function useRenderCount(injector?: Injector): Signal<number> {
  const count = signal(0);

  afterRender(() => {
    count.update((c) => c + 1);
  }, { injector });

  return count;
}

