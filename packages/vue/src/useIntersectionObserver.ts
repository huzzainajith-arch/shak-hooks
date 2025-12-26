import { ref, onUnmounted, Ref, watch } from 'vue';

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
  target: Ref<Element | null | undefined>,
  options: UseIntersectionObserverOptions = {}
) {
  const { threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false } = options;
  const entry = ref<IntersectionObserverEntry | null>(null);
  const isSupported = typeof window !== 'undefined' && 'IntersectionObserver' in window;

  let observer: IntersectionObserver | undefined;

  const stop = () => {
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
  };

  const start = () => {
    stop();
    if (!isSupported || !target.value) return;
    if (freezeOnceVisible && entry.value?.isIntersecting) return;

    observer = new IntersectionObserver(
      ([e]) => {
        entry.value = e;
        if (freezeOnceVisible && e.isIntersecting) {
          stop();
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(target.value);
  };

  watch(target, start, { immediate: true, flush: 'post' });
  
  onUnmounted(stop);

  return { entry, stop };
}
