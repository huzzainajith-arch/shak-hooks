# `@shak-hooks/angular`

Angular Signals utilities for Shak Hooks.

## Install

```bash
npm i @shak-hooks/angular
```

## Requirements

- Angular `@angular/core >=16`

## Usage

Most hooks return Angular `Signal` / `WritableSignal` values (read with `signal()` and update with `.set()` / `.update()`).

```ts
import { Component, signal } from "@angular/core";
import { useCounter } from "@shak-hooks/angular";

@Component({
  selector: "app-counter",
  standalone: true,
  template: `
    <button (click)="dec()">-</button>
    <span>{{ count() }}</span>
    <button (click)="inc()">+</button>
  `,
})
export class CounterComponent {
  readonly countHook = useCounter(0);
  readonly count = this.countHook[0];
  private readonly actions = this.countHook[1];

  inc = () => this.actions.inc();
  dec = () => this.actions.dec();
}
```

## Testing

Run only the Angular hook tests from the repo root:

```bash
pnpm test:angular
```

## Injection Context & Cleanup

Some hooks use Angular DI (`inject(DestroyRef)` / `inject(PLATFORM_ID)`) for automatic cleanup. Use them inside an injection context (e.g. a component constructor, `runInInjectionContext`, or pass an `Injector` parameter when the hook supports it).

## Hooks

- `useBattery`
- `useClickAway`
- `useContinuousRetry`
- `useCopyToClipboard`
- `useCountdown`
- `useCounter`
- `useDebounce`
- `useDefault`
- `useDocumentTitle`
- `useEventListener`
- `useFavicon`
- `useFetch`
- `useGeolocation`
- `useHistoryState`
- `useHover`
- `useIdle`
- `useIntersectionObserver`
- `useInterval`
- `useIntervalWhen`
- `useIsClient`
- `useKeyPress`
- `useList`
- `useLocalStorage`
- `useLockBodyScroll`
- `useLogger`
- `useLongPress`
- `useMap`
- `useMeasure`
- `useMediaQuery`
- `useMouse`
- `useNetworkState`
- `useObjectState`
- `useOrientation`
- `usePageLeave`
- `usePreferredLanguage`
- `usePrevious`
- `useQueue`
- `useRandomInterval`
- `useScript`
- `useSessionStorage`
- `useSet`
- `useThrottle`
- `useTimeout`
- `useToggle`
- `useVisibilityChange`
- `useWindowScroll`
- `useWindowSize`
- `useIsFirstRender`
- `useRenderCount`
- `useRenderInfo`

## API

### `useBattery`

Tracks the Battery Status API (when supported).

```ts
const { level, charging } = useBattery();
console.log(level(), charging());
```

### `useClickAway`

Calls a handler when a click happens outside the target element.

```ts
const target = signal<HTMLElement | null>(null);
useClickAway(target, () => console.log("outside"));
```

### `useContinuousRetry`

Retries an async/sync callback at a fixed interval until it returns `true` or hits `maxRetries`.

```ts
const done = useContinuousRetry(() => Boolean(localStorage.getItem("ready")), 200, { maxRetries: 10 });
```

### `useCopyToClipboard`

Copies text to the clipboard.

```ts
const { value, copy, error } = useCopyToClipboard();
await copy("hello");
console.log(value(), error());
```

### `useCountdown`

Countdown timer with controls (requires an injection context for cleanup; also supports passing an `Injector`).

```ts
const { count, start, stop, reset } = useCountdown(10);
console.log(count());
```

### `useCounter`

Counter with optional `min`/`max` and helpers.

```ts
const [count, { inc, dec, set, reset }] = useCounter(0, { min: 0, max: 10 });
```

### `useDebounce`

Debounces a `Signal<T>` and returns a `Signal<T>`.

```ts
const search = signal("");
const debounced = useDebounce(search, 250);
```

### `useDefault`

Returns a `WritableSignal` plus a computed/defaulted `Signal` value.

```ts
const [state, setState, value] = useDefault<string | null>(null, "fallback");
```

### `useDocumentTitle`

Sets `document.title` (with optional restore on destroy).

```ts
useDocumentTitle("Dashboard", { restoreOnDestroy: true });
```

### `useEventListener`

Adds an event listener to `window` (default) or a target/`Signal` target.

```ts
useEventListener("click", () => console.log("clicked"));
```

### `useFavicon`

Sets the favicon URL (supports passing an `Injector`).

```ts
const href = signal("/favicon.ico");
useFavicon(href, injector);
```

### `useFetch`

Reactive fetch helper with `data`, `error`, `loading`, `execute`, `abort`.

```ts
const url = signal("/api/health");
const { data, loading, error } = useFetch<{ ok: boolean }>(url);
```

### `useGeolocation`

Tracks the Geolocation API (when supported).

```ts
const { coords, locatedAt, error } = useGeolocation();
```

### `useHistoryState`

Stores state in `history.state` under a key.

```ts
const { state, setHistoryState } = useHistoryState({ tab: "home" }, "page-state");
```

### `useHover`

Tracks hover state for an element target.

```ts
const hovered = useHover(signal<HTMLElement | null>(null));
```

### `useIdle`

Becomes `true` after `ms` of no activity; resets on user activity (supports passing an `Injector`).

```ts
const idle = useIdle(60_000);
console.log(idle());
```

### `useIntersectionObserver`

IntersectionObserver wrapper (returns a `Signal<IntersectionObserverEntry | null>`).

```ts
const target = signal<Element | null>(null);
const entry = useIntersectionObserver(target, { threshold: 0.1 });
```

### `useInterval`

Interval runner with `delay: number | null` (pass `null` to pause).

```ts
useInterval(() => console.log("tick"), 1000);
```

### `useIntervalWhen`

Interval runner gated by a boolean condition.

```ts
useIntervalWhen(() => console.log("tick"), 1000, true, true);
```

### `useIsClient`

Checks the Angular `PLATFORM_ID` (`true` when `PLATFORM_ID === "browser"`).

```ts
const isClient = useIsClient();
```

### `useKeyPress`

Tracks whether a specific key is currently pressed.

```ts
const pressed = useKeyPress("Escape");
```

### `useList`

List state with helper actions.

```ts
const [list, actions] = useList<string>(["a"]);
actions.push("b");
```

### `useLocalStorage`

LocalStorage-backed `WritableSignal<T>`.

```ts
const value = useLocalStorage("theme", "light");
```

### `useLockBodyScroll`

Locks body scroll (sets `body.style.overflow = "hidden"`) and restores on destroy (supports passing an `Injector`).

```ts
const locked = signal(true);
useLockBodyScroll(locked, injector);
```

### `useLogger`

Console logging helper (logs mount; logs unmount when used inside an injection context).

```ts
useLogger("MyComponent", { debug: true });
```

### `useLongPress`

Long-press detection for mouse/touch with callbacks.

```ts
const handlers = useLongPress(() => console.log("long press"), { delay: 500 });
```

### `useMap`

`Map` state with helper actions.

```ts
const [map, actions] = useMap<string, number>([["a", 1]]);
actions.set("b", 2);
```

### `useMeasure`

Element measurement via `ResizeObserver`.

```ts
const [ref, rect] = useMeasure();
```

### `useMediaQuery`

Tracks a media query match.

```ts
const matches = useMediaQuery("(min-width: 768px)");
```

### `useMouse`

Tracks mouse position.

```ts
const { x, y } = useMouse();
```

### `useNetworkState`

Tracks network status (online/offline + connection info where available).

```ts
const state = useNetworkState();
```

### `useObjectState`

Object state with merge update.

```ts
const { state, update } = useObjectState({ a: 1, b: 2 });
update({ b: 3 });
```

### `useOrientation`

Tracks device orientation events (where available).

```ts
const state = useOrientation();
```

### `usePageLeave`

Calls a callback when the mouse leaves the page viewport (supports passing an `Injector`).

```ts
usePageLeave(() => console.log("left page"));
```

### `usePreferredLanguage`

Returns the user’s preferred language (when available).

```ts
const lang = usePreferredLanguage();
```

### `usePrevious`

Returns the previous value of a `Signal<T>`.

```ts
const prev = usePrevious(currentSignal);
```

### `useQueue`

Queue state with helper actions.

```ts
const [queue, actions] = useQueue<number>([1, 2]);
actions.add(3);
```

### `useRandomInterval`

Runs a callback at random intervals between `minDelay` and `maxDelay`.

```ts
const cleanup = useRandomInterval(() => console.log("tick"), 500, 1500);
cleanup();
```

### `useIsFirstRender`

`Signal<boolean>` that flips to `false` after the first render.

```ts
const isFirst = useIsFirstRender(injector);
console.log(isFirst());
```

### `useRenderCount`

`Signal<number>` that increments after each render.

```ts
const renderCount = useRenderCount(injector);
console.log(renderCount());
```

### `useRenderInfo`

Logs basic render timing information after each render.

```ts
useRenderInfo("MyComponent", injector);
```

### `useScript`

Loads an external script and returns its status signal.

```ts
const status = useScript("https://example.com/sdk.js");
console.log(status());
```

### `useSessionStorage`

SessionStorage-backed `WritableSignal<T>`.

```ts
const value = useSessionStorage("draft", "");
```

### `useSet`

`Set` state with helper actions.

```ts
const [set, actions] = useSet<string>(["a"]);
actions.add("b");
```

### `useThrottle`

Throttles a rapidly changing value/signal.

```ts
const value = signal("a");
const throttled = useThrottle(value, 250);
```

### `useTimeout`

Runs a callback after `delay` (pass `null` to disable).

```ts
useTimeout(() => console.log("done"), 1000);
```

### `useToggle`

Boolean toggle with helper actions.

```ts
const [on, actions] = useToggle(false);
actions.toggle();
```

### `useVisibilityChange`

Tracks whether the document is visible.

```ts
const visible = useVisibilityChange();
```

### `useWindowScroll`

Tracks window scroll position.

```ts
const { x, y } = useWindowScroll();
```

### `useWindowSize`

Tracks window size.

```ts
const { width, height } = useWindowSize();
```
