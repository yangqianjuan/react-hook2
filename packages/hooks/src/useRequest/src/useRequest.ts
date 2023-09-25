import useRequestInplement from './useRequestInplement';
import { Plugin, Service, Options } from './type';
import useAutoRunPlugin from './plugin/useAutoRunPlugin';
import useLoadingDelayPlugin from './plugin/useLoadingDelayPlugin';
const useRequest = function <TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options?: Options<TData, TParams>,
  plugins?: Plugin<TData, TParams>[],
) {
  return useRequestInplement(service, options, [
    ...(plugins || []),
    useAutoRunPlugin,
    useLoadingDelayPlugin,
  ] as Plugin<TData, TParams>[]);
};
export default useRequest;
