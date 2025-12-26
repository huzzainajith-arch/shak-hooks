export const isBrowser = typeof window !== 'undefined';
export const noop = () => {};
export const isFunction = (val: any): val is Function => typeof val === 'function';
