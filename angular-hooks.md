# Angular Signals (@shak-hooks/angular)

## Install

```bash
npm i @shak-hooks/angular
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
import { useBattery } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useBattery(injector?: Injector)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `injector?` | `Injector` | Parameter used by the hook. |

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
console.log(level(), charging());
```

### Notes
- Browser-only behavior (uses navigator).
- Use inside an injection context or pass an `Injector` when supported.

## useClickAway

### Overview
Triggers a callback when clicking outside a target element.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useClickAway } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useClickAway(
  target: ElementRef | Signal<HTMLElement | null> | HTMLElement,
  handler: (event: Event) => void,
  events: string[] = ['mousedown', 'touchstart']
)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `target` | `ElementRef | Signal<HTMLElement | null> | HTMLElement` | Target element or ref used by the hook. |
| `handler` | `(event: Event) => void` | Event handler callback. |
| `events` | `string[]` | Event names to listen for. |

### Example
```ts
const target = signal<HTMLElement | null>(null);
useClickAway(target, () => console.log("outside"));
```

### Notes
- None.

## useContinuousRetry

### Overview
Continuously retries a callback until it returns true or max retries reached.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useContinuousRetry } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useContinuousRetry(
  callback: () => boolean | Promise<boolean>,
  interval: number = 100,
  options: { maxRetries?: number } = {},
  injector?: Injector
)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `callback` | `() => boolean | Promise<boolean>` | Callback function invoked by the hook. |
| `interval` | `number` | Interval duration in milliseconds. |
| `options` | `{ maxRetries?: number }` | Optional configuration object. |
| `injector?` | `Injector` | Parameter used by the hook. |

### Example
```ts
const done = useContinuousRetry(() => Boolean(localStorage.getItem("ready")), 200, { maxRetries: 10 });
```

### Notes
- Use inside an injection context or pass an `Injector` when supported.
- Timer-based; clears pending timers during cleanup.

## useCopyToClipboard

### Overview
Copies text to the clipboard.

### Usage
Use this to implement a copy button that reports whether the copy succeeded and exposes the last copied value and error state.

### Import
```ts
import { useCopyToClipboard } from "@shak-hooks/angular";
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
console.log(value(), error());
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
import { useCountdown } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useCountdown(initialSeconds: number, injector?: Injector)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `initialSeconds` | `number` | Initial duration in seconds. |
| `injector?` | `Injector` | Parameter used by the hook. |

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
console.log(count());
```

### Notes
- Use inside an injection context or pass an `Injector` when supported.
- Timer-based; clears pending timers during cleanup.

## useCounter

### Overview
Manages a counter with min/max limits.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useCounter } from "@shak-hooks/angular";
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
import { useDebounce } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useDebounce<T>(value: Signal<T>, delay: number): Signal<T>
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `value` | `Signal<T>` | The reactive source to debounce. Changes restart the timer. |
| `delay` | `number` | Debounce delay in milliseconds. |

### Example
```ts
const search = signal("");
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
import { useDefault } from "@shak-hooks/angular";
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
{ value, state }
```

| Field | Description |
|-------|-------------|
| `value` | Current value. |
| `state` | Current state value. |

### Example
```ts
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
import { useDocumentTitle } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useDocumentTitle(title: Signal<string> | string, options: UseDocumentTitleOptions = {})
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `title` | `Signal<string> | string` | Parameter used by the hook. |
| `options` | `UseDocumentTitleOptions` | Optional configuration object. |

### Example
```ts
useDocumentTitle("Dashboard", { restoreOnDestroy: true });
```

### Notes
- Browser-only behavior (uses document).
- Use inside an injection context or pass an `Injector` when supported.

## useEventListener

### Overview
Manages event listeners.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useEventListener } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useEventListener(
  target: EventTarget | Signal<EventTarget | null> | ElementRef | string,
  eventNameOrHandler: string | ((event: any) => void),
  handler?: (event: any) => void
)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `target` | `EventTarget | Signal<EventTarget | null> | ElementRef | string` | Target element or ref used by the hook. |
| `eventNameOrHandler` | `string | ((event: any) => void)` | Parameter used by the hook. |
| `handler?` | `(event: any) => void` | Event handler callback. |

### Example
```ts
useEventListener("click", () => console.log("clicked"));
```

### Notes
- Browser-only behavior (uses window).
- Use inside an injection context or pass an `Injector` when supported.

## useFavicon

### Overview
Manages the document favicon.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useFavicon } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useFavicon(href: () => string | string, injector?: Injector)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `href` | `() => string | string` | Parameter used by the hook. |
| `injector?` | `Injector` | Parameter used by the hook. |

### Example
```ts
const href = signal("/favicon.ico");
useFavicon(href, injector);
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
import { useFetch } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useFetch<T = any>(
  url: Signal<string> | string,
  options: UseFetchOptions = {}
)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `url` | `Signal<string> | string` | Parameter used by the hook. |
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
```ts
const url = signal("/api/health");
const { data, loading, error } = useFetch<{ ok: boolean }>(url);
```

### Notes
- Use inside an injection context or pass an `Injector` when supported.

## useGeolocation

### Overview
Tracks user geolocation.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useGeolocation } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useGeolocation(options?: PositionOptions, injector?: Injector)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `options?` | `PositionOptions` | Optional configuration object. |
| `injector?` | `Injector` | Parameter used by the hook. |

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
- Use inside an injection context or pass an `Injector` when supported.

## useHistoryState

### Overview
Manages history state.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useHistoryState } from "@shak-hooks/angular";
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
import { useHover } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useHover(target: ElementRef | Signal<HTMLElement | null> | HTMLElement)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `target` | `ElementRef | Signal<HTMLElement | null> | HTMLElement` | Target element or ref used by the hook. |

### Example
```ts
const hovered = useHover(signal<HTMLElement | null>(null));
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
import { useIdle } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useIdle(ms: number = 60000, injector?: Injector)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `ms` | `number` | Duration in milliseconds. |
| `injector?` | `Injector` | Parameter used by the hook. |

### Example
```ts
const idle = useIdle(60_000);
console.log(idle());
```

### Notes
- Browser-only behavior (uses window).
- Use inside an injection context or pass an `Injector` when supported.
- Timer-based; clears pending timers during cleanup.

## useIntersectionObserver

### Overview
Tracks element intersection.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useIntersectionObserver } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useIntersectionObserver(
  target: Signal<Element | null> | ElementRef,
  options: UseIntersectionObserverOptions = {}
)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `target` | `Signal<Element | null> | ElementRef` | Target element or ref used by the hook. |
| `options` | `UseIntersectionObserverOptions` | Optional configuration object. |

### Example
```ts
const target = signal<Element | null>(null);
const entry = useIntersectionObserver(target, { threshold: 0.1 });
```

### Notes
- Browser-only behavior (uses window, IntersectionObserver).
- Use inside an injection context or pass an `Injector` when supported.

## useInterval

### Overview
Manages intervals.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useInterval } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useInterval(callback: () => void, delay: Signal<number | null> | number | null)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `callback` | `() => void` | Callback function invoked by the hook. |
| `delay` | `Signal<number | null> | number | null` | Delay in milliseconds. |

### Example
```ts
useInterval(() => console.log("tick"), 1000);
```

### Notes
- Use inside an injection context or pass an `Injector` when supported.
- Timer-based; clears pending timers during cleanup.

## useIntervalWhen

### Overview
Manages intervals with a condition.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useIntervalWhen } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useIntervalWhen(
  callback: () => void,
  delay: Signal<number> | number,
  when: Signal<boolean> | boolean = true,
  immediate: boolean = false
)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `callback` | `() => void` | Callback function invoked by the hook. |
| `delay` | `Signal<number> | number` | Delay in milliseconds. |
| `when` | `Signal<boolean> | boolean` | Parameter used by the hook. |
| `immediate` | `boolean` | Parameter used by the hook. |

### Example
```ts
useIntervalWhen(() => console.log("tick"), 1000, true, true);
```

### Notes
- Use inside an injection context or pass an `Injector` when supported.
- Timer-based; clears pending timers during cleanup.

## useIsClient

### Overview
Checks if code is running on the client.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useIsClient } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useIsClient(injector?: Injector)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `injector?` | `Injector` | Parameter used by the hook. |

### Example
```ts
const isClient = useIsClient();
```

### Notes
- Use inside an injection context or pass an `Injector` when supported.

## useIsFirstRender

### Overview
Indicates whether this is the first render.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useIsFirstRender } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useIsFirstRender(injector?: Injector): Signal<boolean>
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `injector?` | `Injector` | Parameter used by the hook. |

### Example
```ts
const isFirst = useIsFirstRender(injector);
console.log(isFirst());
```

### Notes
- Runs via Angular render hooks (`afterRender` / `afterNextRender`).

## useKeyPress

### Overview
Tracks key press events.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useKeyPress } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useKeyPress(targetKey: string, injector?: Injector)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `targetKey` | `string` | Parameter used by the hook. |
| `injector?` | `Injector` | Parameter used by the hook. |

### Example
```ts
const pressed = useKeyPress("Escape");
```

### Notes
- Browser-only behavior (uses window).
- Use inside an injection context or pass an `Injector` when supported.

## useList

### Overview
Manages a list state.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useList } from "@shak-hooks/angular";
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
import { useLocalStorage } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: StorageOptions<T> = {}
): WritableSignal<T>
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `key` | `string` | Storage key. |
| `initialValue` | `T` | Initial value for the internal state. |
| `options` | `StorageOptions<T>` | Optional configuration object. |

### Example
```ts
const value = useLocalStorage("theme", "light");
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
import { useLockBodyScroll } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useLockBodyScroll(locked: (() => boolean) | boolean = true, injector?: Injector)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `locked` | `(() => boolean) | boolean = true` | Parameter used by the hook. |
| `injector?` | `Injector` | Parameter used by the hook. |

### Example
```ts
const locked = signal(true);
useLockBodyScroll(locked, injector);
```

### Notes
- Browser-only behavior (uses document).
- Use inside an injection context or pass an `Injector` when supported.

## useLogger

### Overview
Logger utility.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useLogger } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useLogger(componentName: string, ...rest: any[])
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `componentName` | `string` | Parameter used by the hook. |
| `...rest` | `any[]` | Parameter used by the hook. |

### Example
```ts
useLogger("MyComponent", { debug: true });
```

### Notes
- Use inside an injection context or pass an `Injector` when supported.

## useLongPress

### Overview
Tracks long press events.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useLongPress } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useLongPress(
  callback: (e: any) => void,
  options: { threshold?: number; onStart?: (e: any) => void; onFinish?: (e: any) => void; onCancel?: (e: any) => void } = {},
  injector?: Injector
)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `callback` | `(e: any) => void` | Callback function invoked by the hook. |
| `options` | `{ threshold?: number; onStart?: (e: any) => void; onFinish?: (e: any) => void; onCancel?: (e: any) => void } = {}` | Optional configuration object. |
| `injector?` | `Injector` | Parameter used by the hook. |

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
const handlers = useLongPress(() => console.log("long press"), { delay: 500 });
```

### Notes
- Use inside an injection context or pass an `Injector` when supported.
- Timer-based; clears pending timers during cleanup.

## useMap

### Overview
Manages a Map state.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useMap } from "@shak-hooks/angular";
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
import { useMeasure } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useMeasure(): [WritableSignal<ElementRef | HTMLElement | null>, Signal<Rect>]
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
```ts
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
import { useMediaQuery } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useMediaQuery(query: string)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `query` | `string` | Parameter used by the hook. |

### Example
```ts
const matches = useMediaQuery("(min-width: 768px)");
```

### Notes
- Browser-only behavior (uses window).
- Use inside an injection context or pass an `Injector` when supported.

## useMouse

### Overview
Tracks mouse position.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useMouse } from "@shak-hooks/angular";
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
- None.

## useNetworkState

### Overview
Tracks network connection state.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useNetworkState } from "@shak-hooks/angular";
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
- Use inside an injection context or pass an `Injector` when supported.

## useObjectState

### Overview
Manages an object state.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useObjectState } from "@shak-hooks/angular";
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
import { useOrientation } from "@shak-hooks/angular";
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
- Use inside an injection context or pass an `Injector` when supported.

## usePageLeave

### Overview
Triggers when the mouse leaves the page.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { usePageLeave } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function usePageLeave(onLeave: () => void, injector?: Injector)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `onLeave` | `() => void` | Parameter used by the hook. |
| `injector?` | `Injector` | Parameter used by the hook. |

### Example
```ts
usePageLeave(() => console.log("left page"));
```

### Notes
- Browser-only behavior (uses document, window).
- Use inside an injection context or pass an `Injector` when supported.

## usePreferredLanguage

### Overview
Tracks preferred language.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { usePreferredLanguage } from "@shak-hooks/angular";
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
- Use inside an injection context or pass an `Injector` when supported.

## usePrevious

### Overview
Tracks the previous value of a state.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { usePrevious } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function usePrevious<T>(value: Signal<T>): Signal<T | undefined>
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `value` | `Signal<T>` | Input value tracked by the hook. |

### Example
```ts
const prev = usePrevious(currentSignal);
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
import { useQueue } from "@shak-hooks/angular";
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
import { useRandomInterval } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useRandomInterval(
  callback: () => void,
  minDelay: Signal<number | null> | number | null,
  maxDelay: Signal<number | null> | number | null
)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `callback` | `() => void` | Callback function invoked by the hook. |
| `minDelay` | `Signal<number | null> | number | null` | Parameter used by the hook. |
| `maxDelay` | `Signal<number | null> | number | null` | Parameter used by the hook. |

### Example
```ts
const cleanup = useRandomInterval(() => console.log("tick"), 500, 1500);
cleanup();
```

### Notes
- Browser-only behavior (uses window).
- Use inside an injection context or pass an `Injector` when supported.
- Timer-based; clears pending timers during cleanup.

## useRenderCount

### Overview
Tracks how many times a component has rendered/updated.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useRenderCount } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useRenderCount(injector?: Injector): Signal<number>
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `injector?` | `Injector` | Parameter used by the hook. |

### Example
```ts
const renderCount = useRenderCount(injector);
console.log(renderCount());
```

### Notes
- Runs via Angular render hooks (`afterRender` / `afterNextRender`).

## useRenderInfo

### Overview
Logs render/update timing information.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useRenderInfo } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useRenderInfo(name: string = "Component", injector?: Injector)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `name` | `string` | Parameter used by the hook. |
| `injector?` | `Injector` | Parameter used by the hook. |

### Example
```ts
useRenderInfo("MyComponent", injector);
```

### Notes
- Runs via Angular render hooks (`afterRender` / `afterNextRender`).

## useScript

### Overview
Loads external scripts.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useScript } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useScript(src: string, options: UseScriptOptions = {})
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `src` | `string` | Parameter used by the hook. |
| `options` | `UseScriptOptions` | Optional configuration object. |

### Example
```ts
const status = useScript("https://example.com/sdk.js");
console.log(status());
```

### Notes
- Browser-only behavior (uses document).
- Use inside an injection context or pass an `Injector` when supported.

## useSessionStorage

### Overview
Manages sessionStorage.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useSessionStorage } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useSessionStorage<T>(
  key: string,
  initialValue: T,
  options: StorageOptions<T> = {}
): WritableSignal<T>
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `key` | `string` | Storage key. |
| `initialValue` | `T` | Initial value for the internal state. |
| `options` | `StorageOptions<T>` | Optional configuration object. |

### Example
```ts
const value = useSessionStorage("draft", "");
```

### Notes
- Browser-only behavior (uses window).
- Use inside an injection context or pass an `Injector` when supported.

## useSet

### Overview
Manages a Set state.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useSet } from "@shak-hooks/angular";
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
import { useThrottle } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useThrottle<T>(value: Signal<T> | T, interval: number = 500)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `value` | `Signal<T> | T` | Input value tracked by the hook. |
| `interval` | `number` | Interval duration in milliseconds. |

### Example
```ts
const value = signal("a");
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
import { useTimeout } from "@shak-hooks/angular";
```

### Reference
**Signature**

```ts
export function useTimeout(callback: () => void, delay: Signal<number | null> | number | null)
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `callback` | `() => void` | Callback function invoked by the hook. |
| `delay` | `Signal<number | null> | number | null` | Delay in milliseconds. |

### Example
```ts
useTimeout(() => console.log("done"), 1000);
```

### Notes
- Use inside an injection context or pass an `Injector` when supported.
- Timer-based; clears pending timers during cleanup.

## useToggle

### Overview
Manages a boolean toggle state.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useToggle } from "@shak-hooks/angular";
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
{ value, toggle }
```

| Field | Description |
|-------|-------------|
| `value` | Current value. |
| `toggle` | Toggles a boolean state. |

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
import { useVisibilityChange } from "@shak-hooks/angular";
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
- Use inside an injection context or pass an `Injector` when supported.

## useWindowScroll

### Overview
Tracks window scroll position.

### Usage
Use this hook to reduce boilerplate around this behavior and keep logic reusable.

### Import
```ts
import { useWindowScroll } from "@shak-hooks/angular";
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
import { useWindowSize } from "@shak-hooks/angular";
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
- Use inside an injection context or pass an `Injector` when supported.
