import { ref, watch, unref } from "vue";
import type { Ref } from "vue";

export function useDebounce<T>(value: Ref<T> | T, delay: number): Ref<T> {
  const initialValue = unref(value);
  const debouncedValue = ref<T>(initialValue) as Ref<T>;

  let timer: ReturnType<typeof setTimeout> | undefined;

  watch(
    () => unref(value),
    (newValue) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        debouncedValue.value = newValue;
      }, delay);
    }
  );

  return debouncedValue;
}
