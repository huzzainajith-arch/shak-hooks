import { onMounted, onUnmounted, watch, toValue, MaybeRefOrGetter } from 'vue';

export function useIntervalWhen(
  callback: () => void,
  delay: MaybeRefOrGetter<number>,
  when: MaybeRefOrGetter<boolean> = true,
  immediate: boolean = false
) {
  let id: any = null;

  const clean = () => {
    if (id) {
      clearInterval(id);
      id = null;
    }
  };

  const start = () => {
    clean();
    const shouldRun = toValue(when);
    const d = toValue(delay);
    
    if (shouldRun) {
      if (immediate) {
        callback();
      }
      id = setInterval(callback, d);
    }
  };

  watch([() => toValue(delay), () => toValue(when)], start);

  onMounted(start);
  onUnmounted(clean);
}
