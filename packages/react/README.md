# `@shak-hooks/react`

React hooks for Shak Hooks.

## Install

```bash
npm i @shak-hooks/react
```

## Requirements

- React `>=16.8`

## Usage

```tsx
import { useCounter } from "@shak-hooks/react";

export function Counter() {
  const [count, { inc, dec }] = useCounter(0);
  return (
    <div>
      <button onClick={() => dec()}>-</button>
      <span>{count}</span>
      <button onClick={() => inc()}>+</button>
    </div>
  );
}
```

## Testing

Run only the React hook tests from the repo root:

```bash
pnpm test:react
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

```tsx
const { level, charging } = useBattery();
```

### `useClickAway`

Calls a handler when a click happens outside the target element.

```tsx
const ref = useRef<HTMLDivElement>(null);
useClickAway(ref, () => setOpen(false));
```

### `useContinuousRetry`

Retries an async/sync callback at a fixed interval until it returns `true` or hits `maxRetries`.

```tsx
const done = useContinuousRetry(() => Boolean(localStorage.getItem("ready")), 200, { maxRetries: 10 });
```

### `useCopyToClipboard`

Copies text to the clipboard.

```tsx
const [value, copy, error] = useCopyToClipboard();
await copy("hello");
```

### `useCountdown`

Countdown timer with controls.

```tsx
const { count, start, stop, reset } = useCountdown(10);
```

### `useCounter`

Counter with optional `min`/`max` and helpers.

```tsx
const [count, { inc, dec, set, reset }] = useCounter(0, { min: 0, max: 10 });
```

### `useDebounce`

Debounces a value and returns the debounced value.

```tsx
const debounced = useDebounce(value, 250);
```

### `useDefault`

Returns `defaultValue` when `initialValue` is `null`/`undefined`.

```tsx
const [state, setState, value] = useDefault<string | null>(null, "fallback");
```

### `useDocumentTitle`

Sets `document.title` (with optional restore on unmount).

```tsx
useDocumentTitle("Dashboard", { restoreOnUnmount: true });
```

### `useEventListener`

Adds an event listener to `window` (default) or a provided `EventTarget`.

```tsx
useEventListener("keydown", (e) => console.log(e));
useEventListener("click", () => {}, document);
```

### `useFavicon`

Sets the favicon URL.

```tsx
useFavicon("/favicon.ico");
```

### `useFetch`

Reactive fetch helper with `data`, `error`, `loading`, `execute`, `abort`.

```tsx
const { data, loading, error, execute } = useFetch<{ ok: boolean }>("/api/health", { immediate: true });
```

### `useGeolocation`

Tracks the Geolocation API (when supported).

```tsx
const { coords, locatedAt, error } = useGeolocation();
```

### `useHistoryState`

Stores state in `history.state` under a key.

```tsx
const [value, setValue] = useHistoryState({ tab: "home" }, "page-state");
```

### `useHover`

Tracks hover state for an element ref.

```tsx
const ref = useRef<HTMLDivElement>(null);
const hovered = useHover(ref);
```

### `useIdle`

Becomes `true` after `ms` of no activity; resets on user activity.

```tsx
const idle = useIdle(60_000);
```

### `useIntersectionObserver`

IntersectionObserver wrapper.

```tsx
const ref = useRef<HTMLElement>(null);
const entry = useIntersectionObserver(ref, { threshold: 0.1 });
```

### `useInterval`

Interval runner with `delay: number | null` (pass `null` to pause).

```tsx
useInterval(() => setTick((t) => t + 1), 1000);
```

### `useIntervalWhen`

Interval runner gated by a boolean condition.

```tsx
useIntervalWhen(() => setTick((t) => t + 1), 1000, enabled, true);
```

### `useIsClient`

Returns `true` after the component mounts.

```tsx
const isClient = useIsClient();
```

### `useIsFirstRender`

Returns `true` on the first render, then `false`.

```tsx
const isFirst = useIsFirstRender();
```

### `useKeyPress`

Tracks whether a specific key is currently pressed.

```tsx
const pressed = useKeyPress("Escape");
```

### `useList`

List state with helper actions.

```tsx
const [list, actions] = useList<string>(["a"]);
actions.push("b");
```

### `useLocalStorage`

LocalStorage-backed state.

```tsx
const [value, setValue] = useLocalStorage("theme", "light");
```

### `useLockBodyScroll`

Locks body scroll (sets `body.style.overflow = "hidden"`).

```tsx
useLockBodyScroll(true);
```

### `useLogger`

Console logging lifecycle helper (mount/update/unmount).

```tsx
useLogger("MyComponent", { debug: true });
```

### `useLongPress`

Long-press detection for mouse/touch with callbacks.

```tsx
const bind = useLongPress(() => console.log("long press"), { delay: 500 });
```

### `useMap`

`Map` state with helper actions.

```tsx
const [map, actions] = useMap<string, number>([["a", 1]]);
actions.set("b", 2);
```

### `useMeasure`

Element measurement via `ResizeObserver`.

```tsx
const [ref, rect] = useMeasure();
```

### `useMediaQuery`

Tracks a media query match.

```tsx
const isWide = useMediaQuery("(min-width: 768px)");
```

### `useMouse`

Tracks mouse position.

```tsx
const { x, y } = useMouse();
```

### `useNetworkState`

Tracks network status (online/offline + connection info where available).

```tsx
const state = useNetworkState();
```

### `useObjectState`

Object state with merge update.

```tsx
const [obj, update] = useObjectState({ a: 1, b: 2 });
update({ b: 3 });
```

### `useOrientation`

Tracks device orientation events (where available).

```tsx
const state = useOrientation();
```

### `usePageLeave`

Calls a callback when the mouse leaves the page viewport.

```tsx
usePageLeave(() => console.log("left page"));
```

### `usePreferredLanguage`

Returns the user’s preferred language (when available).

```tsx
const lang = usePreferredLanguage();
```

### `usePrevious`

Returns the previous value of a state/prop.

```tsx
const prev = usePrevious(value);
```

### `useQueue`

Queue state with helper actions.

```tsx
const [queue, actions] = useQueue<number>([1, 2]);
actions.add(3);
```

### `useRandomInterval`

Runs a callback at random intervals between `minDelay` and `maxDelay`.

```tsx
useRandomInterval(() => console.log("tick"), 500, 1500);
```

### `useRenderCount`

Returns the current render count.

```tsx
const renders = useRenderCount();
```

### `useRenderInfo`

Logs render timing information to the console.

```tsx
useRenderInfo("MyComponent");
```

### `useScript`

Loads an external script and returns its status.

```tsx
const status = useScript("https://example.com/sdk.js");
```

### `useSessionStorage`

SessionStorage-backed state.

```tsx
const [value, setValue] = useSessionStorage("draft", "");
```

### `useSet`

`Set` state with helper actions.

```tsx
const [set, actions] = useSet<string>(["a"]);
actions.add("b");
```

### `useThrottle`

Throttles a rapidly changing value.

```tsx
const throttled = useThrottle(value, 250);
```

### `useTimeout`

Runs a callback after `delay` (pass `null` to disable).

```tsx
useTimeout(() => console.log("done"), 1000);
```

### `useToggle`

Boolean toggle with helper actions.

```tsx
const [on, actions] = useToggle(false);
actions.toggle();
```

### `useVisibilityChange`

Tracks whether the document is visible.

```tsx
const visible = useVisibilityChange();
```

### `useWindowScroll`

Tracks window scroll position.

```tsx
const { x, y } = useWindowScroll();
```

### `useWindowSize`

Tracks window size.

```tsx
const { width, height } = useWindowSize();
```
