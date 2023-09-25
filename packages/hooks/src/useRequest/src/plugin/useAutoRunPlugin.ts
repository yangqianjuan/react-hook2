import { useRef, useEffect } from 'react';
import { Plugin, Options } from '../type';

const useAutoPlugin: Plugin<any, any[]> = (
  instance,
  { manual, ready = true, defaultParams = [], refreshDeps = [], refreshDepsAction },
) => {
  const hasAutoRun = useRef(false);
  hasAutoRun.current = false;

  useEffect(() => {
    if (!manual && ready) {
      hasAutoRun.current = true;
      instance.run(...defaultParams);
    }
  }, [ready]);

  useEffect(() => {
    if (hasAutoRun.current) {
      return;
    }
    if (!manual) {
      hasAutoRun.current = true;
      if (refreshDepsAction) {
        refreshDepsAction();
      } else {
        instance.refresh(...defaultParams);
      }
    }
  }, [...refreshDeps]);

  return {
    onBefore(params) {
      if (!ready) {
        return { stopNow: true };
      }
    },
  };
};
useAutoPlugin.onInit = ({ ready = true, defaultParams = [], manual }) => {
  return { loading: !manual && ready, params: defaultParams };
};

export default useAutoPlugin;
