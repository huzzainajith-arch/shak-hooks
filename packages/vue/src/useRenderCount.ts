import { ref, onUpdated } from 'vue';

export function useRenderCount() {
  const count = ref(1);

  onUpdated(() => {
    count.value++;
  });

  return count;
}
