import { onMounted, onUnmounted } from 'vue';

export function usePageLeave(onLeave: () => void) {
  const handler = (event: MouseEvent) => {
    if (
      event.clientY <= 0 ||
      event.clientX <= 0 ||
      event.clientX >= window.innerWidth ||
      event.clientY >= window.innerHeight
    ) {
      onLeave();
    }
  };

  onMounted(() => {
    document.addEventListener('mouseleave', handler);
  });

  onUnmounted(() => {
    document.removeEventListener('mouseleave', handler);
  });
}
