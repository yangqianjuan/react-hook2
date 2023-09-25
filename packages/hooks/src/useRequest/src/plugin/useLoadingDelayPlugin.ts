import { useRef } from 'react';
import { Timeout, Plugin } from '../type';

const useLoadingDelayPlugin: Plugin<any, any[]> = (instance, { ready, loadingDelay }) => {
  const timeRef = useRef<Timeout>();
  if (!loadingDelay) {
    return {};
  }
  const cancelTimeout = () => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
  };
  return {
    onBefore() {
      cancelTimeout();
      if (ready !== false) {
        timeRef.current = setTimeout(() => {
          instance.setState({ loading: true });
        }, loadingDelay);
      }
      return { loading: false };
    },
    onFinally() {
      cancelTimeout();
    },
    onCancel() {
      cancelTimeout();
    },
  };
};

export default useLoadingDelayPlugin;
