import { useRef, useMemo } from 'react';

const useMemorizedFn = (fn) => {
  const refFn = useRef(fn);
  refFn.current = useMemo(() => fn, [fn]);

  const currentRefFn = useRef();
  if (!currentRefFn.current) {
    currentRefFn.current = function (...arg) {
      return refFn.current.apply(this, ...arg);
    };
  }
  return currentRefFn.current;
};
export default useMemorizedFn;
