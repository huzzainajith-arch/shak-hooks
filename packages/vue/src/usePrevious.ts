import { ref, watch, readonly, Ref } from 'vue';

export function usePrevious<T>(value: Ref<T> | (() => T)): Ref<T | undefined> {
  const previous = ref<T | undefined>();
  
  watch(value, (_, oldVal) => {
    previous.value = oldVal;
  }, { flush: 'sync' });
  
  return readonly(previous) as Ref<T | undefined>;
}
