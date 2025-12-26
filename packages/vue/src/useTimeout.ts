import { onMounted, onUnmounted, watch, toValue, MaybeRefOrGetter } from 'vue';

export function useTimeout(callback: () => void, delay: MaybeRefOrGetter<number | null>) {
  let id: any = null;

  const clean = () => {
    if (id) {
      clearTimeout(id);
      id = null;
    }
  };

  const start = () => {
    clean();
    const d = toValue(delay);
    if (d !== null) {
      id = setTimeout(callback, d);
    }
  };

  watch(() => toValue(delay), start);

  onMounted(start);
  onUnmounted(clean);
}
