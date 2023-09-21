import { useRef, useEffect } from 'react';

function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}
function useUnMount(fn) {
  const latestFn = useLatest(fn);
  useEffect(() => {
    return () => latestFn.current();
  });
}

const DEFAULT_OPTIONS = {
  restorePreTitle: false,
};
function useTitle(value: string, options = DEFAULT_OPTIONS) {
  const titleRefValue = useRef(document.title);
  useEffect(() => {
    document.title = value;
  }, [value]);
  useUnMount(() => {
    if (options.restorePreTitle) {
      document.title = titleRefValue.current;
    }
  });
}
export default useTitle;
