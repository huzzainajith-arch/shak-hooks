# `@shak-hooks/vue`

Vue 3 composables for Shak Hooks.

## Install

```bash
npm i @shak-hooks/vue
```

## Requirements

- Vue `>=3`

## Usage

```vue
<script setup lang="ts">
import { useCounter } from "@shak-hooks/vue";

const [count, { inc, dec }] = useCounter(0);
</script>

<template>
  <button @click="dec()">-</button>
  <span>{{ count }}</span>
  <button @click="inc()">+</button>
</template>
```

## Testing

Run only the Vue composable tests from the repo root:

```bash
pnpm test:vue
```

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
- `useIsFirstRender`
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
- `useRenderCount`
- `useRenderInfo`
- `useScript`
- `useSessionStorage`
- `useSet`
- `useThrottle`
- `useTimeout`
- `useToggle`
- `useVisibilityChange`
- `useWindowScroll`
- `useWindowSize`

## API

### `useBattery`

Tracks the Battery Status API (when supported).

```ts
const { level, charging } = useBattery();
```

### `useClickAway`

Calls a handler when a click happens outside the target element ref.

```ts
const el = ref<HTMLElement | null>(null);
useClickAway(el, () => (open.value = false));
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
```

### `useCountdown`

Countdown timer with controls.

```ts
const { count, start, stop, reset } = useCountdown(10);
```

### `useCounter`

Counter with optional `min`/`max` and helpers.

```ts
const [count, { inc, dec, set, reset }] = useCounter(0, { min: 0, max: 10 });
```

### `useDebounce`

Debounces a value/ref and returns a `Ref` of the debounced value.

```ts
const debounced = useDebounce(search, 250);
```

### `useDefault`

Returns a computed default when the internal state is `null`/`undefined`.

```ts
const { value, state } = useDefault<string | null>(null, "fallback");
```

### `useDocumentTitle`

Sets `document.title` (with optional restore on unmount).

```ts
useDocumentTitle(() => `Page: ${route.name}`, { restoreOnUnmount: true });
```

### `useEventListener`

Adds an event listener to `window` (default) or a provided target/ref target. Returns a `stop()` cleanup function.

```ts
const stop = useEventListener("keydown", (e) => console.log(e));
stop();
```

### `useFavicon`

Sets the favicon URL.

```ts
useFavicon("/favicon.ico");
```

### `useFetch`

Reactive fetch helper with `data`, `error`, `loading`, `execute`, `abort`.

```ts
const { data, loading, error } = useFetch<{ ok: boolean }>("/api/health");
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

Tracks hover state for an element ref.

```ts
const el = ref<HTMLElement | null>(null);
const hovered = useHover(el);
```

### `useIdle`

Becomes `true` after `ms` of no activity; resets on user activity.

```ts
const idle = useIdle(60_000);
```

### `useIntersectionObserver`

IntersectionObserver wrapper.

```ts
const el = ref<HTMLElement | null>(null);
const entry = useIntersectionObserver(el, { threshold: 0.1 });
```

### `useInterval`

Interval runner with a reactive delay (pass `null` to pause).

```ts
useInterval(() => tick.value++, delay);
```

### `useIntervalWhen`

Interval runner gated by a boolean condition.

```ts
useIntervalWhen(() => tick.value++, 1000, enabled, true);
```

### `useIsClient`

Returns `true` after the component mounts.

```ts
const isClient = useIsClient();
```

### `useIsFirstRender`

Returns `true` on the first render, then `false`.

```ts
const isFirst = useIsFirstRender();
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

LocalStorage-backed state.

```ts
const [value, setValue] = useLocalStorage("theme", "light");
```

### `useLockBodyScroll`

Locks body scroll (sets `body.style.overflow = "hidden"`).

```ts
useLockBodyScroll(true);
```

### `useLogger`

Console logging lifecycle helper (mount/update/unmount).

```ts
useLogger("MyComponent", { debug: true });
```

### `useLongPress`

Long-press detection for mouse/touch with callbacks.

```ts
const bind = useLongPress(() => console.log("long press"), { delay: 500 });
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
const [el, rect] = useMeasure();
```

### `useMediaQuery`

Tracks a media query match.

```ts
const isWide = useMediaQuery("(min-width: 768px)");
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

Calls a callback when the mouse leaves the page viewport.

```ts
usePageLeave(() => console.log("left page"));
```

### `usePreferredLanguage`

Returns the user’s preferred language (when available).

```ts
const lang = usePreferredLanguage();
```

### `usePrevious`

Returns the previous value of a ref/getter.

```ts
const prev = usePrevious(() => value.value);
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
useRandomInterval(() => console.log("tick"), 500, 1500);
```

### `useRenderCount`

Returns the current render count.

```ts
const renders = useRenderCount();
```

### `useRenderInfo`

Logs render timing information to the console.

```ts
useRenderInfo("MyComponent");
```

### `useScript`

Loads an external script and returns its status ref.

```ts
const status = useScript("https://example.com/sdk.js");
```

### `useSessionStorage`

SessionStorage-backed state.

```ts
const [value, setValue] = useSessionStorage("draft", "");
```

### `useSet`

`Set` state with helper actions.

```ts
const { set, add, remove, has, toggle, reset } = useSet<string>(["a"]);
add("b");
```

### `useThrottle`

Throttles a rapidly changing value/ref.

```ts
const throttled = useThrottle(value, 250);
```

### `useTimeout`

Runs a callback after a reactive delay (pass `null` to disable).

```ts
useTimeout(() => console.log("done"), delay);
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
