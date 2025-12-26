# Vue Composables (@shak-hooks/vue)

## Install

```bash
npm i @shak-hooks/vue
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
import { useBattery } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useBattery()
```

**Returns**

```ts
{ charging, chargingTime, dischargingTime, level }
```

| Field | Description |
|-------|-------------|
| `charging` | Whether the device is currently charging. |
| `chargingTime` | Seconds until the battery is fully charged (if available). |
| `dischargingTime` | Seconds until the battery is discharged (if available). |
| `level` | Battery level from 0 to 1 (if available). |

### Example
```ts
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
import { useClickAway } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useClickAway(
  target: MaybeRef<HTMLElement | null | undefined>,
  handler: (event: Event) => void,
  events: string[] = ['mousedown', 'touchstart']
)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `target` | `MaybeRef<HTMLElement | null | undefined>` | Target element or ref used by the hook. |
| `handler` | `(event: Event) => void` | Event handler callback. |
| `events` | `string[]` | Event names to listen for. |

### Example
```ts
const el = ref<HTMLElement | null>(null);
useClickAway(el, () => (open.value = false));
```

### Notes
- Browser-only behavior (uses window).

## useContinuousRetry

### Overview
Continuously retries a callback until it returns true or max retries reached.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useContinuousRetry } from "@shak-hooks/vue";
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
```ts
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
import { useCopyToClipboard } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useCopyToClipboard()
```

**Returns**

```ts
{ value, copy, error }
```

| Field | Description |
|-------|-------------|
| `value` | Last successfully copied text (or null). |
| `copy` | Async function that attempts to copy text; resolves to true/false. |
| `error` | Last copy error (or null). |

### Example
```ts
const { value, copy, error } = useCopyToClipboard();
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
import { useCountdown } from "@shak-hooks/vue";
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
```ts
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
import { useCounter } from "@shak-hooks/vue";
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
```ts
const [count, { inc, dec, set, reset }] = useCounter(0, { min: 0, max: 10 });
```

### Notes
- None.

## useDebounce

### Overview
Debounces a value.

### Usage
Use this when you want to delay updates to a reactive source (Signal/Ref) before using it in expensive work (fetching, filtering, analytics).

### Import
```ts
import { useDebounce } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useDebounce<T>(value: Ref<T> | T, delay: number): Ref<T>
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `value` | `Ref<T> | T` | The reactive source to debounce. Changes restart the timer. |
| `delay` | `number` | Debounce delay in milliseconds. |

### Example
```ts
const debounced = useDebounce(search, 250);
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
import { useDefault } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useDefault<T>(initialValue: T, defaultValue: T): { value: ComputedRef<T>; state: Ref<T | undefined | null> }
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `initialValue` | `T` | Initial value for the internal state. |
| `defaultValue` | `T` | Fallback value used when the current value is null/undefined. |

**Returns**

```ts
{ value, state }
```

| Field | Description |
|-------|-------------|
| `value` | Current value. |
| `state` | Current state value. |

### Example
```ts
const { value, state } = useDefault<string | null>(null, "fallback");
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
import { useDocumentTitle } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useDocumentTitle(title: MaybeRefOrGetter<string>, options: UseDocumentTitleOptions = {})
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `title` | `MaybeRefOrGetter<string>` | Parameter used by the hook. |
| `options` | `UseDocumentTitleOptions` | Optional configuration object. |

### Example
```ts
useDocumentTitle(() => `Page: ${route.name}`, { restoreOnUnmount: true });
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
import { useEventListener } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useEventListener(
  target: MaybeRef<EventTarget | null | undefined>,
  event: string,
  listener: (event: any) => void,
  options?: boolean | AddEventListenerOptions
): () => void;

export function useEventListener(
  event: string,
  listener: (event: any) => void,
  options?: boolean | AddEventListenerOptions
): () => void;

export function useEventListener(...args: any[])
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `target` | `MaybeRef<EventTarget | null | undefined>` | Target element or ref used by the hook. |
| `event` | `string` | Event name to listen for. |
| `listener` | `(event: any) => void` | Parameter used by the hook. |
| `options?` | `boolean | AddEventListenerOptions` | Optional configuration object. |

### Example
```ts
const stop = useEventListener("keydown", (e) => console.log(e));
stop();
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
import { useFavicon } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useFavicon(href: MaybeRef<string>)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `href` | `MaybeRef<string>` | Parameter used by the hook. |

### Example
```ts
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
import { useFetch } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useFetch<T = any>(
  url: MaybeRefOrGetter<string>,
  options: UseFetchOptions = {}
): UseFetchReturn<T>
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `url` | `MaybeRefOrGetter<string>` | Parameter used by the hook. |
| `options` | `UseFetchOptions` | Optional configuration object. |

### Example
```ts
const { data, loading, error } = useFetch<{ ok: boolean }>("/api/health");
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
import { useGeolocation } from "@shak-hooks/vue";
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

**Returns**

```ts
{ loading, accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed, timestamp, error }
```

| Field | Description |
|-------|-------------|
| `loading` | Whether an async operation is in progress. |
| `accuracy` | Value returned by the hook. |
| `altitude` | Value returned by the hook. |
| `altitudeAccuracy` | Value returned by the hook. |
| `heading` | Value returned by the hook. |
| `latitude` | Value returned by the hook. |
| `longitude` | Value returned by the hook. |
| `speed` | Value returned by the hook. |
| `timestamp` | Value returned by the hook. |
| `error` | Last error (or null). |

### Example
```ts
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
import { useHistoryState } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useHistoryState<T>(initialValue: T, key: string): { state: Ref<T>, setHistoryState: (value: T) => void }
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `initialValue` | `T` | Initial value for the internal state. |
| `key` | `string` | Storage key. |

**Returns**

```ts
{ state, setHistoryState }
```

| Field | Description |
|-------|-------------|
| `state` | Current state value. |
| `setHistoryState` | Value returned by the hook. |

### Example
```ts
const { state, setHistoryState } = useHistoryState({ tab: "home" }, "page-state");
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
import { useHover } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useHover(target: MaybeRef<HTMLElement | null | undefined>): Ref<boolean>
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `target` | `MaybeRef<HTMLElement | null | undefined>` | Target element or ref used by the hook. |

### Example
```ts
const el = ref<HTMLElement | null>(null);
const hovered = useHover(el);
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
import { useIdle } from "@shak-hooks/vue";
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
```ts
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
import { useIntersectionObserver } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useIntersectionObserver(
  target: Ref<Element | null | undefined>,
  options: UseIntersectionObserverOptions = {}
)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `target` | `Ref<Element | null | undefined>` | Target element or ref used by the hook. |
| `options` | `UseIntersectionObserverOptions` | Optional configuration object. |

**Returns**

```ts
{ entry, stop }
```

| Field | Description |
|-------|-------------|
| `entry` | Value returned by the hook. |
| `stop` | Stops the timer/process. |

### Example
```ts
const el = ref<HTMLElement | null>(null);
const entry = useIntersectionObserver(el, { threshold: 0.1 });
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
import { useInterval } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useInterval(callback: () => void, delay: MaybeRefOrGetter<number | null>)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `callback` | `() => void` | Callback function invoked by the hook. |
| `delay` | `MaybeRefOrGetter<number | null>` | Delay in milliseconds. |

### Example
```ts
useInterval(() => tick.value++, delay);
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
import { useIntervalWhen } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useIntervalWhen(
  callback: () => void,
  delay: MaybeRefOrGetter<number>,
  when: MaybeRefOrGetter<boolean> = true,
  immediate: boolean = false
)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `callback` | `() => void` | Callback function invoked by the hook. |
| `delay` | `MaybeRefOrGetter<number>` | Delay in milliseconds. |
| `when` | `MaybeRefOrGetter<boolean>` | Parameter used by the hook. |
| `immediate` | `boolean` | Parameter used by the hook. |

### Example
```ts
useIntervalWhen(() => tick.value++, 1000, enabled, true);
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
import { useIsClient } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useIsClient()
```

### Example
```ts
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
import { useIsFirstRender } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useIsFirstRender()
```

### Example
```ts
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
import { useKeyPress } from "@shak-hooks/vue";
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
```ts
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
import { useList } from "@shak-hooks/vue";
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
{ list, set, push, updateAt, insertAt, update, removeAt, clear, reset }
```

| Field | Description |
|-------|-------------|
| `list` | Value returned by the hook. |
| `set` | Sets the value directly. |
| `push` | Adds an item/value. |
| `updateAt` | Value returned by the hook. |
| `insertAt` | Value returned by the hook. |
| `update` | Value returned by the hook. |
| `removeAt` | Value returned by the hook. |
| `clear` | Clears the data/state. |
| `reset` | Resets state back to its initial value. |

### Example
```ts
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
import { useLocalStorage } from "@shak-hooks/vue";
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

### Example
```ts
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
import { useLockBodyScroll } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useLockBodyScroll(locked: MaybeRef<boolean> = true)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `locked` | `MaybeRef<boolean>` | Parameter used by the hook. |

### Example
```ts
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
import { useLogger } from "@shak-hooks/vue";
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
```ts
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
import { useLongPress } from "@shak-hooks/vue";
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
```ts
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
import { useMap } from "@shak-hooks/vue";
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
{ map, set, remove, clear, reset }
```

| Field | Description |
|-------|-------------|
| `map` | Value returned by the hook. |
| `set` | Sets the value directly. |
| `remove` | Value returned by the hook. |
| `clear` | Clears the data/state. |
| `reset` | Resets state back to its initial value. |

### Example
```ts
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
import { useMeasure } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useMeasure(): [Ref<HTMLElement | null>, Ref<Rect>]
```

**Returns**

```ts
[ elementRef, rect ]
```

| Index | Value | Description |
|-------|-------|-------------|
| `0` | `elementRef` | Value returned by the hook. |
| `1` | `rect` | Latest measured rectangle data. |

### Example
```ts
const [el, rect] = useMeasure();
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
import { useMediaQuery } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useMediaQuery(query: string): Ref<boolean>
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `query` | `string` | Parameter used by the hook. |

### Example
```ts
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
import { useMouse } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useMouse()
```

**Returns**

```ts
{ x, y }
```

| Field | Description |
|-------|-------------|
| `x` | Current X coordinate. |
| `y` | Current Y coordinate. |

### Example
```ts
const { x, y } = useMouse();
```

### Notes
- Browser-only behavior (uses window).

## useNetworkState

### Overview
Tracks network connection state.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useNetworkState } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useNetworkState()
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
```ts
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
import { useObjectState } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useObjectState<T extends object>(initialValue: T): { state: Ref<T>, update: (partial: Partial<T> | ((prev: T) => Partial<T>)) => void }
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `initialValue` | `T` | Initial value for the internal state. |

**Returns**

```ts
{ state, update }
```

| Field | Description |
|-------|-------------|
| `state` | Current state value. |
| `update` | Value returned by the hook. |

### Example
```ts
const { state, update } = useObjectState({ a: 1, b: 2 });
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
import { useOrientation } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useOrientation()
```

**Returns**

```ts
{ angle, type }
```

| Field | Description |
|-------|-------------|
| `angle` | Value returned by the hook. |
| `type` | Value returned by the hook. |

### Example
```ts
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
import { usePageLeave } from "@shak-hooks/vue";
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
```ts
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
import { usePreferredLanguage } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function usePreferredLanguage()
```

### Example
```ts
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
import { usePrevious } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function usePrevious<T>(value: Ref<T> | (() => T)): Ref<T | undefined>
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `value` | `Ref<T> | (() => T)` | Input value tracked by the hook. |

### Example
```ts
const prev = usePrevious(() => value.value);
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
import { useQueue } from "@shak-hooks/vue";
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
```ts
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
import { useRandomInterval } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useRandomInterval(
  callback: () => void,
  minDelay: MaybeRefOrGetter<number | null>,
  maxDelay: MaybeRefOrGetter<number | null>
)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `callback` | `() => void` | Callback function invoked by the hook. |
| `minDelay` | `MaybeRefOrGetter<number | null>` | Parameter used by the hook. |
| `maxDelay` | `MaybeRefOrGetter<number | null>` | Parameter used by the hook. |

### Example
```ts
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
import { useRenderCount } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useRenderCount()
```

### Example
```ts
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
import { useRenderInfo } from "@shak-hooks/vue";
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
```ts
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
import { useScript } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useScript(src: string, options: UseScriptOptions = {}): Ref<ScriptStatus>
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `src` | `string` | Parameter used by the hook. |
| `options` | `UseScriptOptions` | Optional configuration object. |

### Example
```ts
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
import { useSessionStorage } from "@shak-hooks/vue";
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

### Example
```ts
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
import { useSet } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useSet<K>(initialValue?: Iterable<K>):
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `initialValue?` | `Iterable<K>` | Initial value for the internal state. |

**Returns**

```ts
{ set, add, remove, clear, reset }
```

| Field | Description |
|-------|-------------|
| `set` | Sets the value directly. |
| `add` | Adds an item/value. |
| `remove` | Value returned by the hook. |
| `clear` | Clears the data/state. |
| `reset` | Resets state back to its initial value. |

### Example
```ts
const { set, add, remove, has, toggle, reset } = useSet<string>(["a"]);
add("b");
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
import { useThrottle } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useThrottle<T>(value: Ref<T> | T, interval: number = 500)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `value` | `Ref<T> | T` | Input value tracked by the hook. |
| `interval` | `number` | Interval duration in milliseconds. |

### Example
```ts
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
import { useTimeout } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useTimeout(callback: () => void, delay: MaybeRefOrGetter<number | null>)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `callback` | `() => void` | Callback function invoked by the hook. |
| `delay` | `MaybeRefOrGetter<number | null>` | Delay in milliseconds. |

### Example
```ts
useTimeout(() => console.log("done"), delay);
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
import { useToggle } from "@shak-hooks/vue";
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
```ts
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
import { useVisibilityChange } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useVisibilityChange()
```

### Example
```ts
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
import { useWindowScroll } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useWindowScroll()
```

**Returns**

```ts
{ x, y }
```

| Field | Description |
|-------|-------------|
| `x` | Current X coordinate. |
| `y` | Current Y coordinate. |

### Example
```ts
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
import { useWindowSize } from "@shak-hooks/vue";
```

### Reference
**Signature**

```ts
export function useWindowSize()
```

**Returns**

```ts
{ width, height }
```

| Field | Description |
|-------|-------------|
| `width` | Current width value. |
| `height` | Current height value. |

### Example
```ts
const { width, height } = useWindowSize();
```

### Notes
- Browser-only behavior (uses window).
