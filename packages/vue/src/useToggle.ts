import { ref } from 'vue';

export function useToggle(initialValue: boolean = false) {
  const value = ref(initialValue);
  const toggle = (nextValue?: any) => {
    if (typeof nextValue === 'boolean') {
      value.value = nextValue;
    } else {
      value.value = !value.value;
    }
  };
  return [value, toggle] as const;
}
