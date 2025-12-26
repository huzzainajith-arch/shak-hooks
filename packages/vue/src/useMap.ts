import { ref } from 'vue';

export function useMap<K, V>(initialValue?: Iterable<readonly [K, V]>) {
  const map = ref(new Map<K, V>(initialValue));

  const set = (key: K, value: V) => {
    map.value.set(key, value as any);
    // Trigger reactivity
    map.value = new Map(map.value);
  };

  const remove = (key: K) => {
    map.value.delete(key);
    map.value = new Map(map.value);
  };

  const clear = () => {
    map.value = new Map();
  };

  const reset = () => {
    map.value = new Map(initialValue);
  };

  return {
    map,
    set,
    remove,
    clear,
    reset,
  };
}
