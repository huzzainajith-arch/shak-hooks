export type HookInfo = {
  name: string;
  description: string;
  useCases: string[];
};

export const hooks: HookInfo[] = [
  {
    name: "useBattery",
    description: "Tracks device battery state.",
    useCases: ["Power-saving UI", "Battery indicator"],
  },
  {
    name: "useClickAway",
    description: "Triggers a callback when clicking outside a target element.",
    useCases: ["Close dropdowns", "Close modals/popovers"],
  },
  {
    name: "useContinuousRetry",
    description: "Retries a callback until it returns true (or max retries).",
    useCases: ['Poll "ready" flags', "Retry flaky APIs"],
  },
  {
    name: "useCopyToClipboard",
    description: "Copies text to the clipboard.",
    useCases: ["Copy API keys", "Copy share links"],
  },
  {
    name: "useCountdown",
    description: "Manages a countdown timer.",
    useCases: ["OTP resend timer", "Quiz timer"],
  },
  {
    name: "useCounter",
    description: "Counter state with helpers.",
    useCases: ["Quantity picker", "Stepper/pagination"],
  },
  {
    name: "useDebounce",
    description: "Debounces a value/signal/ref.",
    useCases: ["Search input", "Autosave"],
  },
  {
    name: "useDefault",
    description: "Applies a default when value is null/undefined.",
    useCases: ["Form defaults", "Optional config fallbacks"],
  },
  {
    name: "useDocumentTitle",
    description: "Manages the document title.",
    useCases: ["Page titles", "Unread counts"],
  },
  {
    name: "useEventListener",
    description: "Manages event listeners.",
    useCases: ["Keyboard shortcuts", "Scroll/resize listeners"],
  },
  {
    name: "useFavicon",
    description: "Manages the document favicon.",
    useCases: ["Unread badge icon", "Status indicator"],
  },
  {
    name: "useFetch",
    description: "Reactive fetch client.",
    useCases: ["Data fetching", "Loading/error state"],
  },
  {
    name: "useGeolocation",
    description: "Tracks user geolocation.",
    useCases: ["Location-based content", "Maps"],
  },
  {
    name: "useHistoryState",
    description: "Manages history state.",
    useCases: ["Persist UI state", "Back/forward support"],
  },
  {
    name: "useHover",
    description: "Tracks hover state for an element.",
    useCases: ["Tooltips", "Hover cards"],
  },
  {
    name: "useIdle",
    description: "Tracks user idle state.",
    useCases: ["Auto logout", "Pause polling"],
  },
  {
    name: "useIntersectionObserver",
    description: "Tracks element intersection.",
    useCases: ["Infinite scroll", "Lazy loading"],
  },
  {
    name: "useInterval",
    description: "Runs a callback on an interval.",
    useCases: ["Polling", "Clocks"],
  },
  {
    name: "useIntervalWhen",
    description: "Runs an interval gated by a condition.",
    useCases: ["Only poll when visible", "Only poll when online"],
  },
  {
    name: "useIsClient",
    description: "Checks if code is running on the client.",
    useCases: ["Avoid SSR mismatch", "Client-only UI"],
  },
  {
    name: "useIsFirstRender",
    description: "Indicates the first render.",
    useCases: ["Skip effects on first render", "First-paint logic"],
  },
  {
    name: "useKeyPress",
    description: "Tracks key press events.",
    useCases: ["Shortcuts", "Games/controls"],
  },
  {
    name: "useList",
    description: "List state with helper actions.",
    useCases: ["Todo lists", "Dynamic forms"],
  },
  {
    name: "useLocalStorage",
    description: "LocalStorage-backed state.",
    useCases: ["Persist theme", "Persist preferences"],
  },
  {
    name: "useLockBodyScroll",
    description: "Locks body scroll.",
    useCases: ["Modal open behavior", "Drawer open behavior"],
  },
  {
    name: "useLogger",
    description: "Logging helper.",
    useCases: ["Debug renders", "Lifecycle logs"],
  },
  {
    name: "useLongPress",
    description: "Long-press detection.",
    useCases: ["Mobile context menu", "Press-and-hold actions"],
  },
  {
    name: "useMap",
    description: "Map state with helper actions.",
    useCases: ["Keyed collections", "Caches"],
  },
  {
    name: "useMeasure",
    description: "Measures element size and position.",
    useCases: ["Tooltip placement", "Layout measurement"],
  },
  {
    name: "useMediaQuery",
    description: "Tracks media queries.",
    useCases: ["Responsive UI", "Dark mode"],
  },
  {
    name: "useMouse",
    description: "Tracks mouse position.",
    useCases: ["Cursor effects", "Follow tooltip"],
  },
  {
    name: "useNetworkState",
    description: "Tracks network connection state.",
    useCases: ["Offline banner", "Disable actions offline"],
  },
  {
    name: "useObjectState",
    description: "Object state with merge update.",
    useCases: ["Form objects", "Partial updates"],
  },
  {
    name: "useOrientation",
    description: "Tracks device orientation.",
    useCases: ["Rotate UI", "Orientation layouts"],
  },
  {
    name: "usePageLeave",
    description: "Triggers when the mouse leaves the page.",
    useCases: ["Exit intent prompts", "Analytics"],
  },
  {
    name: "usePreferredLanguage",
    description: "Tracks preferred language.",
    useCases: ["i18n default", "Locale selection"],
  },
  {
    name: "usePrevious",
    description: "Tracks the previous value.",
    useCases: ["Compare changes", "Animations"],
  },
  {
    name: "useQueue",
    description: "Queue state with helper actions.",
    useCases: ["Toast queue", "Upload jobs"],
  },
  {
    name: "useRandomInterval",
    description: "Runs a callback at random intervals.",
    useCases: ["Jittered polling", "Randomized timers"],
  },
  {
    name: "useRenderCount",
    description: "Counts component renders.",
    useCases: ["Debug performance", "Render tracking"],
  },
  {
    name: "useRenderInfo",
    description: "Logs render timing/info.",
    useCases: ["Debug rendering", "Perf insights"],
  },
  {
    name: "useScript",
    description: "Loads external scripts.",
    useCases: ["Third-party SDKs", "Analytics scripts"],
  },
  {
    name: "useSessionStorage",
    description: "SessionStorage-backed state.",
    useCases: ["Wizard steps", "Temporary drafts"],
  },
  {
    name: "useSet",
    description: "Set state with helper actions.",
    useCases: ["Multi-select", "Toggled item sets"],
  },
  {
    name: "useThrottle",
    description: "Throttles a value.",
    useCases: ["Scroll handlers", "Resize events"],
  },
  {
    name: "useTimeout",
    description: "Runs a callback after delay.",
    useCases: ["Delayed tooltips", "Delayed actions"],
  },
  {
    name: "useToggle",
    description: "Boolean toggle state.",
    useCases: ["Modal open/close", "On/off flags"],
  },
  {
    name: "useVisibilityChange",
    description: "Tracks document visibility.",
    useCases: ["Pause polling when hidden", "Pause video/audio"],
  },
  {
    name: "useWindowScroll",
    description: "Tracks window scroll position.",
    useCases: ["Scroll progress", "Sticky UI"],
  },
  {
    name: "useWindowSize",
    description: "Tracks window size.",
    useCases: ["Responsive layout", "Canvas sizing"],
  },
];
