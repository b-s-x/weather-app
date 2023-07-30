declare module 'lodash.debounce' {
  const debounce: <F extends (...args: any[]) => any>(
    func: F,
    wait?: number,
    options?: { leading?: boolean; maxWait?: number; trailing?: boolean }
  ) => F;

  export default debounce;
}
