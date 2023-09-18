import { useMemo } from 'react';
import useToggle from '../useToggle';

interface Actions {
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
}
function useBoolean<T = Boolean>(defaultvalue: T): [T, Actions];

function useBoolean(defaultvalue: false): [Boolean, Actions] {
  const [state, { toggle, setLeft, setRight }] = useToggle(defaultvalue);

  const Actions = useMemo(() => {
    const setTrue = () => setLeft();
    const setFalse = () => setRight();
    return { setTrue, setFalse, toggle };
  }, []);
  return [state, Actions];
}

export default useBoolean;
