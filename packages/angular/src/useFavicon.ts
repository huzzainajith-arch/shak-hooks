import { effect, Injector } from '@angular/core';

export function useFavicon(href: () => string | string, injector?: Injector) {
  const getHref = typeof href === 'function' ? (href as () => string) : () => href as string;

  effect(() => {
    const url = getHref();
    const link: HTMLLinkElement = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
  }, { injector });
}
