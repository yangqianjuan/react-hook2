import { useMemo } from 'react';
import Fetch from './Fetch';
import { Plugin, Service, Options } from './type';
import { useLatest, useUpdate, useMemorizedFn } from 'reactHooks';

const useRequestInplement = function <TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options: Options<TData, TParams> = {},
  plugins: Plugin<TData, TParams>[] = [],
) {
  const { manual = false, ...rest } = options;
  const fetchOptions = {
    manual,
    ...rest,
  };
  const serviceRef = useLatest(service);
  const update = useUpdate();
  const fetchInstance = useMemo(() => {
    const initState = plugins.map((p) => p?.onInit?.(fetchOptions)).filter(Boolean);
    return new Fetch<TData, TParams>(
      serviceRef,
      fetchOptions,
      update,
      Object.assign({}, ...initState),
    );
  }, []);
  fetchInstance.options = fetchOptions;
  // run all plugins hooks
  fetchInstance.pluginImpls = plugins.map((p) => p(fetchInstance, fetchOptions));
  return {
    loading: fetchInstance.state.loading,
    error: fetchInstance.state.error,
    data: fetchInstance.state.data,
    params: fetchInstance.state.params,
    run: useMemorizedFn(fetchInstance.run.bind(fetchInstance)),
    runAsync: useMemorizedFn(fetchInstance.runAsync.bind(fetchInstance)),
    refresh: useMemorizedFn(fetchInstance.refresh.bind(fetchInstance)),
    refreshAsync: useMemorizedFn(fetchInstance.refreshAsync.bind(fetchInstance)),
    cancel: useMemorizedFn(fetchInstance.cancel.bind(fetchInstance)),
  };
};

export default useRequestInplement;
