import { ref, Ref } from 'vue';

export function useList<T>(initialValue: T[] = []) {
  const list = ref<T[]>([...initialValue]) as Ref<T[]>;

  const set = (newList: T[]) => {
    list.value = newList as any;
  };
  const push = (...items: T[]) => {
    list.value.push(...(items as any[]));
  };
  const updateAt = (index: number, item: T) => {
    list.value[index] = item as any;
  };
  const insertAt = (index: number, item: T) => {
    list.value.splice(index, 0, item as any);
  };
  const update = (predicate: (a: T, b: T) => boolean, newItem: T) => {
    const index = list.value.findIndex((e) => predicate(e as unknown as T, newItem));
    if (index !== -1) list.value[index] = newItem as any;
  };
  const removeAt = (index: number) => {
    list.value.splice(index, 1);
  };
  const clear = () => {
    list.value = [] as any;
  };
  const reset = () => {
    list.value = [...initialValue] as any;
  };

  return {
    list,
    set,
    push,
    updateAt,
    insertAt,
    update,
    removeAt,
    clear,
    reset,
  };
}
