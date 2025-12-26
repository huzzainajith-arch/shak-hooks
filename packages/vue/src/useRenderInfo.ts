import { onUpdated, onMounted } from 'vue';

export function useRenderInfo(name: string = 'Component') {
  let count = 0;
  let lastRender = Date.now();

  onMounted(() => {
    count++;
    console.log(`${name} mounted`, { count, timestamp: Date.now() });
  });

  onUpdated(() => {
    const now = Date.now();
    count++;
    console.log(`${name} updated`, {
      count,
      sinceLast: now - lastRender,
      timestamp: now,
    });
    lastRender = now;
  });
}
