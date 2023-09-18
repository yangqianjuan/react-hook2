/**
 * const [state,{toggle,setLeft,setRigt}]=useToggle('1','2')
 */
import { useState, useMemo } from 'react';
type defaultFn = () => void;
export interface Actions {
  setLeft: defaultFn;
  setRight: defaultFn;
  toggle: defaultFn;
}
//默认boolean类型

function useToggle<T = boolean>(): [T, Actions];

function useToggle<D, R>(defaultValue: D, reverseValue: R): [D | R, Actions];

function useToggle<D, R>(defaultValue: D = false as D, reverseValue?: R) {
  const [state, setState] = useState<D | R>(defaultValue);
  const actions = useMemo(() => {
    const reverseValueOrigin =
      reverseValue === undefined ? !defaultValue : reverseValue;
    const setLeft = () => {
      setState(defaultValue);
    };
    const setRight = () => {
      setState(reverseValueOrigin);
    };
    const toggle = () => {
      setState((s) => {
        return s === defaultValue ? reverseValueOrigin : defaultValue;
      });
    };
    return {
      setLeft,
      setRight,
      toggle,
    };
  }, []);
  return [state, actions];
}

export default useToggle;
