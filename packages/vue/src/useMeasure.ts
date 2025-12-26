import { ref, onMounted, onUnmounted, Ref } from "vue";
import { Rect } from "@shak-hooks/core";

export function useMeasure(): [Ref<HTMLElement | null>, Ref<Rect>] {
  const elementRef = ref<HTMLElement | null>(null);
  const rect = ref<Rect>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  let observer: ResizeObserver | undefined;

  onMounted(() => {
    if (elementRef.value) {
      observer = new ResizeObserver(([entry]) => {
        if (entry) {
          rect.value = entry.contentRect;
        }
      });
      observer.observe(elementRef.value);
    }
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  return [elementRef, rect];
}
