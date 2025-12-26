import { ref, computed, Ref, ComputedRef } from 'vue';

export function useDefault<T>(initialValue: T, defaultValue: T): { value: ComputedRef<T>; state: Ref<T | undefined | null> } {
  const state = ref(initialValue) as Ref<T | undefined | null>;
  const value = computed(() => {
      const s = state.value;
      return (s === undefined || s === null ? defaultValue : s) as T;
  });
  return { value, state };
}
