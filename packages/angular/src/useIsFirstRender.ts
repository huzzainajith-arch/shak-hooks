import { afterNextRender, Injector, Signal, signal } from "@angular/core";

export function useIsFirstRender(injector?: Injector): Signal<boolean> {
  const isFirst = signal(true);

  // Flip to false after the first render. If no render occurs (e.g. in non-UI usage),
  // it will remain true.
  afterNextRender(() => {
    isFirst.set(false);
  }, { injector });

  return isFirst;
}

