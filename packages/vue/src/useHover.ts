import { ref, readonly, Ref } from 'vue';
import { useEventListener, MaybeRef } from './useEventListener';

export function useHover(target: MaybeRef<HTMLElement | null | undefined>): Ref<boolean> {
  const isHovered = ref(false);

  useEventListener(target, 'mouseenter', () => {
    isHovered.value = true;
  });

  useEventListener(target, 'mouseleave', () => {
    isHovered.value = false;
  });

  return readonly(isHovered);
}
