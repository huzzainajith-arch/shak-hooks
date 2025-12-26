import { signal, ElementRef, effect, inject, DestroyRef, Signal } from '@angular/core';

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
  target: Signal<Element | null> | ElementRef,
  options: UseIntersectionObserverOptions = {}
) {
  const { threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false } = options;
  const entry = signal<IntersectionObserverEntry | null>(null);
  
  const isSupported = typeof window !== 'undefined' && 'IntersectionObserver' in window;

  if (isSupported) {
    let observer: IntersectionObserver | undefined;

    const cleanup = () => {
      if (observer) {
        observer.disconnect();
        observer = undefined;
      }
    };

    try {
      const destroyRef = inject(DestroyRef);
      destroyRef.onDestroy(cleanup);
    } catch (e) {}

    effect((onCleanup) => {
      cleanup();
      
      const el = target instanceof ElementRef ? target.nativeElement : target();
      if (!el) return;

      if (freezeOnceVisible && entry()?.isIntersecting) return;

      observer = new IntersectionObserver(
        ([e]) => {
          entry.set(e);
          if (freezeOnceVisible && e.isIntersecting) {
            cleanup();
          }
        },
        { threshold, root, rootMargin }
      );

      observer.observe(el);

      onCleanup(() => cleanup());
    });
  }
  
  return entry;
}
