import { watch, onMounted, onUnmounted, ref, unref } from 'vue';
import { MaybeRef } from './useEventListener';

export function useLockBodyScroll(locked: MaybeRef<boolean> = true) {
  const originalStyle = ref('');

  const lock = () => {
    if (unref(locked)) {
      originalStyle.value = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalStyle.value;
    }
  };

  const unlock = () => {
    document.body.style.overflow = originalStyle.value;
  };

  onMounted(() => {
    originalStyle.value = window.getComputedStyle(document.body).overflow;
    lock();
  });
  
  watch(() => unref(locked), lock);
  
  onUnmounted(unlock);
}
