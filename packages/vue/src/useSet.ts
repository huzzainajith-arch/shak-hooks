import { ref, Ref } from 'vue';

export function useSet<K>(initialValue?: Iterable<K>): {
  set: Ref<Set<K>>;
  add: (key: K) => void;
  remove: (key: K) => void;
  clear: () => void;
  reset: () => void;
} {
  const set = ref(new Set<K>(initialValue)) as Ref<Set<K>>;

  const add = (key: K) => {
    set.value.add(key);
    set.value = new Set(set.value);
  };

  const remove = (key: K) => {
    set.value.delete(key);
    set.value = new Set(set.value);
  };

  const clear = () => {
    set.value = new Set();
  };

  const reset = () => {
    set.value = new Set(initialValue);
  };

  return {
    set,
    add,
    remove,
    clear,
    reset,
  };
}
