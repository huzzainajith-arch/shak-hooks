import { ref, Ref } from 'vue';

export function useObjectState<T extends object>(initialValue: T): { state: Ref<T>, update: (partial: Partial<T> | ((prev: T) => Partial<T>)) => void } {
  const state = ref<T>({ ...initialValue }) as Ref<T>;

  const update = (partial: Partial<T> | ((prev: T) => Partial<T>)) => {
    const changes = typeof partial === 'function' ? partial(state.value as T) : partial;
    state.value = { ...state.value, ...changes } as T;
  };

  return { state, update };
}
