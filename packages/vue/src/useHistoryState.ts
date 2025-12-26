import { ref, Ref } from 'vue';

export function useHistoryState<T>(initialValue: T, key: string): { state: Ref<T>, setHistoryState: (value: T) => void } {
  const getInitialValue = () => {
    const historyState = window.history.state;
    return historyState && historyState[key] !== undefined ? historyState[key] : initialValue;
  };

  const state = ref<T>(getInitialValue()) as Ref<T>;

  const setHistoryState = (value: T) => {
    const newState = { ...window.history.state, [key]: value };
    window.history.replaceState(newState, '');
    state.value = value as any;
  };

  return { state, setHistoryState };
}
