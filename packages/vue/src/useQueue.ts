import { ref, computed } from 'vue';

export function useQueue<T>(initialValue: T[] = []) {
  const queue = ref<T[]>([...initialValue]);

  const add = (element: T) => {
    queue.value.push(element as any);
  };

  const remove = () => {
    return queue.value.shift();
  };

  const clear = () => {
    queue.value = [];
  };

  const first = computed(() => queue.value[0]);
  const last = computed(() => queue.value[queue.value.length - 1]);
  const size = computed(() => queue.value.length);

  return {
    queue,
    add,
    remove,
    clear,
    first,
    last,
    size,
  };
}
