import { signal, effect, WritableSignal, Signal, ElementRef } from "@angular/core";
import { Rect } from "@shak-hooks/core";

export function useMeasure(): [WritableSignal<ElementRef | HTMLElement | null>, Signal<Rect>] {
  const ref = signal<ElementRef | HTMLElement | null>(null);
  const rect = signal<Rect>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  effect((onCleanup) => {
    const elementOrRef = ref();
    const element = elementOrRef instanceof ElementRef ? elementOrRef.nativeElement : elementOrRef;

    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        rect.set(entry.contentRect);
      }
    });

    observer.observe(element);

    onCleanup(() => {
      observer.disconnect();
    });
  });

  return [ref, rect];
}
