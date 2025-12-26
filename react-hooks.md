# React Hooks (@shak-hooks/react)

## Install

```bash
npm i @shak-hooks/react
```

## Hooks (A-Z)

- [`useBattery`](#usebattery)
- [`useClickAway`](#useclickaway)
- [`useContinuousRetry`](#usecontinuousretry)
- [`useCopyToClipboard`](#usecopytoclipboard)
- [`useCountdown`](#usecountdown)
- [`useCounter`](#usecounter)
- [`useDebounce`](#usedebounce)
- [`useDefault`](#usedefault)
- [`useDocumentTitle`](#usedocumenttitle)
- [`useEventListener`](#useeventlistener)
- [`useFavicon`](#usefavicon)
- [`useFetch`](#usefetch)
- [`useGeolocation`](#usegeolocation)
- [`useHistoryState`](#usehistorystate)
- [`useHover`](#usehover)
- [`useIdle`](#useidle)
- [`useIntersectionObserver`](#useintersectionobserver)
- [`useInterval`](#useinterval)
- [`useIntervalWhen`](#useintervalwhen)
- [`useIsClient`](#useisclient)
- [`useIsFirstRender`](#useisfirstrender)
- [`useKeyPress`](#usekeypress)
- [`useList`](#uselist)
- [`useLocalStorage`](#uselocalstorage)
- [`useLockBodyScroll`](#uselockbodyscroll)
- [`useLogger`](#uselogger)
- [`useLongPress`](#uselongpress)
- [`useMap`](#usemap)
- [`useMeasure`](#usemeasure)
- [`useMediaQuery`](#usemediaquery)
- [`useMouse`](#usemouse)
- [`useNetworkState`](#usenetworkstate)
- [`useObjectState`](#useobjectstate)
- [`useOrientation`](#useorientation)
- [`usePageLeave`](#usepageleave)
- [`usePreferredLanguage`](#usepreferredlanguage)
- [`usePrevious`](#useprevious)
- [`useQueue`](#usequeue)
- [`useRandomInterval`](#userandominterval)
- [`useRenderCount`](#userendercount)
- [`useRenderInfo`](#userenderinfo)
- [`useScript`](#usescript)
- [`useSessionStorage`](#usesessionstorage)
- [`useSet`](#useset)
- [`useThrottle`](#usethrottle)
- [`useTimeout`](#usetimeout)
- [`useToggle`](#usetoggle)
- [`useVisibilityChange`](#usevisibilitychange)
- [`useWindowScroll`](#usewindowscroll)
- [`useWindowSize`](#usewindowsize)

## useBattery

### Overview
Tracks device battery state.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useBattery } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useBattery()
```

### Example
```tsx
const { level, charging } = useBattery();
```

### Notes
- Browser-only behavior (uses navigator).

## useClickAway

### Overview
Triggers a callback when clicking outside a target element.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useClickAway } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useClickAway<T extends Event = Event>(
  ref: RefObject<HTMLElement | null>,
  handler: (event: T) => void,
  events: string[] = ['mousedown', 'touchstart']
)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `ref` | `RefObject<HTMLElement | null>` | Parameter used by the hook. |
| `handler` | `(event: T) => void` | Event handler callback. |
| `events` | `string[]` | Event names to listen for. |

### Example
```tsx
const ref = useRef<HTMLDivElement>(null);
useClickAway(ref, () => setOpen(false));
```

### Notes
- Browser-only behavior (uses document).

## useContinuousRetry

### Overview
Continuously retries a callback until it returns true or max retries reached.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useContinuousRetry } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useContinuousRetry(
  callback: () => boolean | Promise<boolean>,
  interval: number = 100,
  options: { maxRetries?: number } = {}
)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `callback` | `() => boolean | Promise<boolean>` | Callback function invoked by the hook. |
| `interval` | `number` | Interval duration in milliseconds. |
| `options` | `{ maxRetries?: number }` | Optional configuration object. |

### Example
```tsx
const done = useContinuousRetry(() => Boolean(localStorage.getItem("ready")), 200, { maxRetries: 10 });
```

### Notes
- Timer-based; clears pending timers during cleanup.

## useCopyToClipboard

### Overview
Copies text to the clipboard.

### Usage
Use this to implement a copy button that reports whether the copy succeeded and exposes the last copied value and error state.

### Import
```ts
import { useCopyToClipboard } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useCopyToClipboard()
```

**Returns**

```ts
[ value, copy, error ]
```

| Index | Value | Description |
|-------|-------|-------------|
| `0` | `value` | Last successfully copied text (or null). |
| `1` | `copy` | Async function that attempts to copy text; resolves to true/false. |
| `2` | `error` | Last copy error (or null). |

### Example
```tsx
const [value, copy, error] = useCopyToClipboard();
await copy("hello");
```

### Notes
- Browser-only behavior (uses navigator, Clipboard API).

## useCountdown

### Overview
Manages a countdown timer.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useCountdown } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useCountdown(initialSeconds: number)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `initialSeconds` | `number` | Initial duration in seconds. |

**Returns**

```ts
{ count, start, stop, reset }
```

| Field | Description |
|-------|-------------|
| `count` | Current count value. |
| `start` | Starts the timer/process. |
| `stop` | Stops the timer/process. |
| `reset` | Resets state back to its initial value. |

### Example
```tsx
const { count, start, stop, reset } = useCountdown(10);
```

### Notes
- Timer-based; clears pending timers during cleanup.

## useCounter

### Overview
Manages a counter with min/max limits.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useCounter } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useCounter(
  initialValue: number = 0,
  options: CounterOptions = {}
): UseCounterReturn
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `initialValue` | `number` | Initial value for the internal state. |
| `options` | `CounterOptions` | Optional configuration object. |

**Returns**

```ts
[ count, { inc, dec, get, set, reset } ]
```

| Index | Value | Description |
|-------|-------|-------------|
| `0` | `count` | Current count value. |
| `1` | `{ inc, dec, get, set, reset }` | Helper actions to update the state. |

### Example
```tsx
const [count, { inc, dec, set, reset }] = useCounter(0, { min: 0, max: 10 });
```

### Notes
- None.

## useDebounce

### Overview
Debounces a value.

### Usage
Use this when you want to delay updates to a rapidly-changing value (like a text input) before using it in expensive work (fetching, filtering, analytics).

### Import
```ts
import { useDebounce } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useDebounce<T>(value: T, delay: number): T
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `value` | `T` | The value to debounce. Changes restart the timer. |
| `delay` | `number` | Debounce delay in milliseconds. |

### Example
```tsx
const debounced = useDebounce(value, 250);
```

### Notes
- Timer-based; clears pending timers during cleanup.

## useDefault

### Overview
Returns a default value if the state is null or undefined.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useDefault } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useDefault<T>(initialValue: T, defaultValue: T)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `initialValue` | `T` | Initial value for the internal state. |
| `defaultValue` | `T` | Fallback value used when the current value is null/undefined. |

**Returns**

```ts
[ state === undefined || state === null ? defaultValue : state, setState ]
```

| Index | Value | Description |
|-------|-------|-------------|
| `0` | `state === undefined || state === null ? defaultValue : state` | Value returned by the hook. |
| `1` | `setState` | Value returned by the hook. |

### Example
```tsx
const [state, setState, value] = useDefault<string | null>(null, "fallback");
```

### Notes
- None.

## useDocumentTitle

### Overview
Manages the document title.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useDocumentTitle } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useDocumentTitle(title: string, options: UseDocumentTitleOptions = {})
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `title` | `string` | Parameter used by the hook. |
| `options` | `UseDocumentTitleOptions` | Optional configuration object. |

### Example
```tsx
useDocumentTitle("Dashboard", { restoreOnUnmount: true });
```

### Notes
- Browser-only behavior (uses document).

## useEventListener

### Overview
Manages event listeners.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useEventListener } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useEventListener(
  eventName: string,
  handler: (event: any) => void,
  element?: EventTarget | null
)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `eventName` | `string` | Parameter used by the hook. |
| `handler` | `(event: any) => void` | Event handler callback. |
| `element?` | `EventTarget | null` | DOM element (or element ref) the hook should observe. |

### Example
```tsx
useEventListener("keydown", (e) => console.log(e));
useEventListener("click", () => {}, document);
```

### Notes
- Browser-only behavior (uses window).

## useFavicon

### Overview
Manages the document favicon.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useFavicon } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useFavicon(href: string)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `href` | `string` | Parameter used by the hook. |

### Example
```tsx
useFavicon("/favicon.ico");
```

### Notes
- Browser-only behavior (uses document).

## useFetch

### Overview
reactive fetch client.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useFetch } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useFetch<T = any>(
  url: string,
  options: UseFetchOptions = {}
): UseFetchReturn<T>
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `url` | `string` | Parameter used by the hook. |
| `options` | `UseFetchOptions` | Optional configuration object. |

**Returns**

```ts
{ data, error, loading, execute, abort }
```

| Field | Description |
|-------|-------------|
| `data` | Response data (or null/undefined while loading). |
| `error` | Last error (or null). |
| `loading` | Whether an async operation is in progress. |
| `execute` | Value returned by the hook. |
| `abort` | Value returned by the hook. |

### Example
```tsx
const { data, loading, error, execute } = useFetch<{ ok: boolean }>("/api/health", { immediate: true });
```

### Notes
- None.

## useGeolocation

### Overview
Tracks user geolocation.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useGeolocation } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useGeolocation(options?: PositionOptions)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `options?` | `PositionOptions` | Optional configuration object. |

### Example
```tsx
const { coords, locatedAt, error } = useGeolocation();
```

### Notes
- Browser-only behavior (uses navigator, Geolocation API).

## useHistoryState

### Overview
Manages history state.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useHistoryState } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useHistoryState<T>(initialValue: T, key: string)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `initialValue` | `T` | Initial value for the internal state. |
| `key` | `string` | Storage key. |

**Returns**

```ts
[ state, setHistoryState ]
```

| Index | Value | Description |
|-------|-------|-------------|
| `0` | `state` | Current state value. |
| `1` | `setHistoryState` | Value returned by the hook. |

### Example
```tsx
const [value, setValue] = useHistoryState({ tab: "home" }, "page-state");
```

### Notes
- Browser-only behavior (uses window).

## useHover

### Overview
Tracks if an element is being hovered.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useHover } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useHover<T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T>
): boolean
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `elementRef` | `RefObject<T>` | Parameter used by the hook. |

### Example
```tsx
const ref = useRef<HTMLDivElement>(null);
const hovered = useHover(ref);
```

### Notes
- None.

## useIdle

### Overview
Tracks user idle state.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useIdle } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useIdle(ms: number = 60000)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `ms` | `number` | Duration in milliseconds. |

### Example
```tsx
const idle = useIdle(60_000);
```

### Notes
- Browser-only behavior (uses window).
- Timer-based; clears pending timers during cleanup.

## useIntersectionObserver

### Overview
Tracks element intersection.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useIntersectionObserver } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useIntersectionObserver(
  elementRef: RefObject<Element>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
  }: UseIntersectionObserverOptions = {}
): IntersectionObserverEntry | undefined
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `elementRef` | `RefObject<Element>` | Parameter used by the hook. |
| `{ threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false, }` | `UseIntersectionObserverOptions` | Parameter used by the hook. |

### Example
```tsx
const ref = useRef<HTMLElement>(null);
const entry = useIntersectionObserver(ref, { threshold: 0.1 });
```

### Notes
- Browser-only behavior (uses window, IntersectionObserver).

## useInterval

### Overview
Manages intervals.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useInterval } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useInterval(callback: () => void, delay: number | null)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `callback` | `() => void` | Callback function invoked by the hook. |
| `delay` | `number | null` | Delay in milliseconds. |

### Example
```tsx
useInterval(() => setTick((t) => t + 1), 1000);
```

### Notes
- Timer-based; clears pending timers during cleanup.

## useIntervalWhen

### Overview
Manages intervals with a condition.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useIntervalWhen } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useIntervalWhen(
  callback: () => void,
  delay: number,
  when: boolean = true,
  immediate: boolean = false
)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `callback` | `() => void` | Callback function invoked by the hook. |
| `delay` | `number` | Delay in milliseconds. |
| `when` | `boolean` | Parameter used by the hook. |
| `immediate` | `boolean` | Parameter used by the hook. |

### Example
```tsx
useIntervalWhen(() => setTick((t) => t + 1), 1000, enabled, true);
```

### Notes
- Timer-based; clears pending timers during cleanup.

## useIsClient

### Overview
Checks if code is running on the client.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useIsClient } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useIsClient()
```

### Example
```tsx
const isClient = useIsClient();
```

### Notes
- None.

## useIsFirstRender

### Overview
Indicates whether this is the first render.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useIsFirstRender } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useIsFirstRender()
```

### Example
```tsx
const isFirst = useIsFirstRender();
```

### Notes
- None.

## useKeyPress

### Overview
Tracks key press events.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useKeyPress } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useKeyPress(targetKey: string)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `targetKey` | `string` | Parameter used by the hook. |

### Example
```tsx
const pressed = useKeyPress("Escape");
```

### Notes
- Browser-only behavior (uses window).

## useList

### Overview
Manages a list state.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useList } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useList<T>(initialValue: T[] = [])
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `initialValue` | `T[]` | Initial value for the internal state. |

**Returns**

```ts
[ list, actions ]
```

| Index | Value | Description |
|-------|-------|-------------|
| `0` | `list` | Value returned by the hook. |
| `1` | `actions` | Helper actions to update the state. |

### Example
```tsx
const [list, actions] = useList<string>(["a"]);
actions.push("b");
```

### Notes
- None.

## useLocalStorage

### Overview
Manages localStorage.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useLocalStorage } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: StorageOptions<T> = {}
)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `key` | `string` | Storage key. |
| `initialValue` | `T` | Initial value for the internal state. |
| `options` | `StorageOptions<T>` | Optional configuration object. |

**Returns**

```ts
[ storedValue, setValue ]
```

| Index | Value | Description |
|-------|-------|-------------|
| `0` | `storedValue` | Value returned by the hook. |
| `1` | `setValue` | Value returned by the hook. |

### Example
```tsx
const [value, setValue] = useLocalStorage("theme", "light");
```

### Notes
- Browser-only behavior (uses window).

## useLockBodyScroll

### Overview
Locks body scroll.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useLockBodyScroll } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useLockBodyScroll(locked: boolean = true)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `locked` | `boolean` | Parameter used by the hook. |

### Example
```tsx
useLockBodyScroll(true);
```

### Notes
- Browser-only behavior (uses document, window).

## useLogger

### Overview
Logger utility.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useLogger } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useLogger(name: string, ...rest: any[])
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | Parameter used by the hook. |
| `...rest` | `any[]` | Parameter used by the hook. |

### Example
```tsx
useLogger("MyComponent", { debug: true });
```

### Notes
- None.

## useLongPress

### Overview
Tracks long press events.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useLongPress } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useLongPress(
  callback: (e: any) => void,
  options: { threshold?: number; onStart?: (e: any) => void; onFinish?: (e: any) => void; onCancel?: (e: any) => void } = {}
)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `callback` | `(e: any) => void` | Callback function invoked by the hook. |
| `options` | `{ threshold?: number; onStart?: (e: any) => void; onFinish?: (e: any) => void; onCancel?: (e: any) => void } = {}` | Optional configuration object. |

**Returns**

```ts
{ onMouseDown, onMouseUp, onMouseLeave, onTouchStart, onTouchEnd }
```

| Field | Description |
|-------|-------------|
| `onMouseDown` | Value returned by the hook. |
| `onMouseUp` | Value returned by the hook. |
| `onMouseLeave` | Value returned by the hook. |
| `onTouchStart` | Value returned by the hook. |
| `onTouchEnd` | Value returned by the hook. |

### Example
```tsx
const bind = useLongPress(() => console.log("long press"), { delay: 500 });
```

### Notes
- Timer-based; clears pending timers during cleanup.

## useMap

### Overview
Manages a Map state.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useMap } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useMap<K, V>(initialValue?: Iterable<readonly [K, V]>)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `initialValue?` | `Iterable<readonly [K, V]>` | Initial value for the internal state. |

**Returns**

```ts
[ map, actions ]
```

| Index | Value | Description |
|-------|-------|-------------|
| `0` | `map` | Value returned by the hook. |
| `1` | `actions` | Helper actions to update the state. |

### Example
```tsx
const [map, actions] = useMap<string, number>([["a", 1]]);
actions.set("b", 2);
```

### Notes
- None.

## useMeasure

### Overview
Measures element size and position.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useMeasure } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useMeasure<T extends HTMLElement = HTMLElement>(): [
  MutableRefObject<T | null>,
  Rect
] {
  const ref = useRef<T | null>(null);
  const [rect, setRect] = useState<Rect>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  useLayoutEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(([entry]) => {
      if (entry)
```

**Returns**

```ts
[ ref, rect ]
```

| Index | Value | Description |
|-------|-------|-------------|
| `0` | `ref` | Value returned by the hook. |
| `1` | `rect` | Latest measured rectangle data. |

### Example
```tsx
const [ref, rect] = useMeasure();
```

### Notes
- Browser-only behavior (uses ResizeObserver).

## useMediaQuery

### Overview
Tracks media queries.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useMediaQuery } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useMediaQuery(query: string): boolean
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `query` | `string` | Parameter used by the hook. |

### Example
```tsx
const isWide = useMediaQuery("(min-width: 768px)");
```

### Notes
- Browser-only behavior (uses window).

## useMouse

### Overview
Tracks mouse position.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useMouse } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useMouse()
```

### Example
```tsx
const { x, y } = useMouse();
```

### Notes
- Browser-only behavior (uses document).

## useNetworkState

### Overview
Tracks network connection state.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useNetworkState } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useNetworkState(): NetworkState
```

**Returns**

```ts
{ online, downlink, downlinkMax, effectiveType, rtt, saveData, type }
```

| Field | Description |
|-------|-------------|
| `online` | Value returned by the hook. |
| `downlink` | Value returned by the hook. |
| `downlinkMax` | Value returned by the hook. |
| `effectiveType` | Value returned by the hook. |
| `rtt` | Value returned by the hook. |
| `saveData` | Value returned by the hook. |
| `type` | Value returned by the hook. |

### Example
```tsx
const state = useNetworkState();
```

### Notes
- Browser-only behavior (uses window, navigator).

## useObjectState

### Overview
Manages an object state.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useObjectState } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useObjectState<T extends object>(initialValue: T)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `initialValue` | `T` | Initial value for the internal state. |

**Returns**

```ts
[ state, update ]
```

### Example
```tsx
const [obj, update] = useObjectState({ a: 1, b: 2 });
update({ b: 3 });
```

### Notes
- None.

## useOrientation

### Overview
Tracks device orientation.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useOrientation } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useOrientation(): OrientationState
```

### Example
```tsx
const state = useOrientation();
```

### Notes
- Browser-only behavior (uses window).

## usePageLeave

### Overview
Triggers when the mouse leaves the page.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { usePageLeave } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function usePageLeave(onLeave: () => void)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `onLeave` | `() => void` | Parameter used by the hook. |

### Example
```tsx
usePageLeave(() => console.log("left page"));
```

### Notes
- Browser-only behavior (uses document, window).

## usePreferredLanguage

### Overview
Tracks preferred language.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { usePreferredLanguage } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function usePreferredLanguage(): string
```

### Example
```tsx
const lang = usePreferredLanguage();
```

### Notes
- Browser-only behavior (uses window, navigator).

## usePrevious

### Overview
Tracks the previous value of a state.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { usePrevious } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function usePrevious<T>(value: T): T | undefined
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `value` | `T` | Input value tracked by the hook. |

### Example
```tsx
const prev = usePrevious(value);
```

### Notes
- None.

## useQueue

### Overview
Manages a queue.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useQueue } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useQueue<T>(initialValue: T[] = [])
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `initialValue` | `T[]` | Initial value for the internal state. |

**Returns**

```ts
{ queue, add, remove, clear, first, last, size }
```

| Field | Description |
|-------|-------------|
| `queue` | Current queued items. |
| `add` | Adds an item/value. |
| `remove` | Value returned by the hook. |
| `clear` | Clears the data/state. |
| `first` | Value returned by the hook. |
| `last` | Value returned by the hook. |
| `size` | Current size values. |

### Example
```tsx
const [queue, actions] = useQueue<number>([1, 2]);
actions.add(3);
```

### Notes
- None.

## useRandomInterval

### Overview
Runs a callback at random intervals.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useRandomInterval } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useRandomInterval(
  callback: () => void,
  minDelay: number | null,
  maxDelay: number | null
)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `callback` | `() => void` | Callback function invoked by the hook. |
| `minDelay` | `number | null` | Parameter used by the hook. |
| `maxDelay` | `number | null` | Parameter used by the hook. |

### Example
```tsx
useRandomInterval(() => console.log("tick"), 500, 1500);
```

### Notes
- Browser-only behavior (uses window).
- Timer-based; clears pending timers during cleanup.

## useRenderCount

### Overview
Tracks how many times a component has rendered/updated.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useRenderCount } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useRenderCount()
```

### Example
```tsx
const renders = useRenderCount();
```

### Notes
- None.

## useRenderInfo

### Overview
Logs render/update timing information.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useRenderInfo } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useRenderInfo(name: string = 'Component')
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | Parameter used by the hook. |

### Example
```tsx
useRenderInfo("MyComponent");
```

### Notes
- None.

## useScript

### Overview
Loads external scripts.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useScript } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useScript(src: string, options: UseScriptOptions = {}): ScriptStatus
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `src` | `string` | Parameter used by the hook. |
| `options` | `UseScriptOptions` | Optional configuration object. |

### Example
```tsx
const status = useScript("https://example.com/sdk.js");
```

### Notes
- Browser-only behavior (uses document).

## useSessionStorage

### Overview
Manages sessionStorage.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useSessionStorage } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useSessionStorage<T>(
  key: string,
  initialValue: T,
  options: StorageOptions<T> = {}
)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `key` | `string` | Storage key. |
| `initialValue` | `T` | Initial value for the internal state. |
| `options` | `StorageOptions<T>` | Optional configuration object. |

**Returns**

```ts
[ storedValue, setValue ]
```

| Index | Value | Description |
|-------|-------|-------------|
| `0` | `storedValue` | Value returned by the hook. |
| `1` | `setValue` | Value returned by the hook. |

### Example
```tsx
const [value, setValue] = useSessionStorage("draft", "");
```

### Notes
- Browser-only behavior (uses window).

## useSet

### Overview
Manages a Set state.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useSet } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useSet<K>(initialValue?: Iterable<K>)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `initialValue?` | `Iterable<K>` | Initial value for the internal state. |

**Returns**

```ts
[ set, actions ]
```

| Index | Value | Description |
|-------|-------|-------------|
| `0` | `set` | Sets the value directly. |
| `1` | `actions` | Helper actions to update the state. |

### Example
```tsx
const [set, actions] = useSet<string>(["a"]);
actions.add("b");
```

### Notes
- None.

## useThrottle

### Overview
Throttles a value.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useThrottle } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useThrottle<T>(value: T, interval: number = 500): T
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `value` | `T` | Input value tracked by the hook. |
| `interval` | `number` | Interval duration in milliseconds. |

### Example
```tsx
const throttled = useThrottle(value, 250);
```

### Notes
- Timer-based; clears pending timers during cleanup.

## useTimeout

### Overview
Manages timeouts.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useTimeout } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useTimeout(callback: () => void, delay: number | null)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `callback` | `() => void` | Callback function invoked by the hook. |
| `delay` | `number | null` | Delay in milliseconds. |

### Example
```tsx
useTimeout(() => console.log("done"), 1000);
```

### Notes
- Timer-based; clears pending timers during cleanup.

## useToggle

### Overview
Manages a boolean toggle state.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useToggle } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useToggle(initialValue: boolean = false)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `initialValue` | `boolean` | Initial value for the internal state. |

**Returns**

```ts
[ value, toggle ]
```

| Index | Value | Description |
|-------|-------|-------------|
| `0` | `value` | Current value. |
| `1` | `toggle` | Toggles a boolean state. |

### Example
```tsx
const [on, actions] = useToggle(false);
actions.toggle();
```

### Notes
- None.

## useVisibilityChange

### Overview
Tracks document visibility.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useVisibilityChange } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useVisibilityChange(): boolean
```

### Example
```tsx
const visible = useVisibilityChange();
```

### Notes
- Browser-only behavior (uses document).

## useWindowScroll

### Overview
Tracks window scroll position.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useWindowScroll } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useWindowScroll(): WindowScrollState
```

### Example
```tsx
const { x, y } = useWindowScroll();
```

### Notes
- Browser-only behavior (uses window).

## useWindowSize

### Overview
Tracks window size.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useWindowSize } from "@shak-hooks/react";
```

### Reference
**Signature**

```ts
export function useWindowSize(): WindowSize
```

### Example
```tsx
const { width, height } = useWindowSize();
```

### Notes
- Browser-only behavior (uses window).
