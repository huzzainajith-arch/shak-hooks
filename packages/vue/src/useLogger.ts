import { onMounted, onUpdated, onUnmounted } from 'vue';

export function useLogger(name: string, ...rest: any[]) {
  onMounted(() => {
    console.log(`${name} mounted`, ...rest);
  });

  onUpdated(() => {
    console.log(`${name} updated`, ...rest);
  });

  onUnmounted(() => {
    console.log(`${name} unmounted`);
  });
}
