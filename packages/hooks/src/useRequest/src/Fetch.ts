import { MutableRefObject } from 'react';
import { Plugin, Options, FetchState, PluginReturn, Service } from './type';
class Fetch<TData, TParams extends any[]> {
  pluginImpls: PluginReturn<TData, TParams>[];
  count: number = 0;
  state: FetchState<TData, TParams> = {
    loading: false,
    data: undefined,
    params: undefined,
    error: undefined,
  };
  constructor(
    public serviceRef: MutableRefObject<Service<TData, TParams>>,
    public options: Options<TData, TParams>,
    public update: () => void,
    public initState: FetchState<TData, TParams>,
  ) {
    this.state = {
      ...this.state,
      loading: !options.manual,
      ...initState,
    };
  }
  setState(s: FetchState<TData, TParams>) {
    this.state = {
      ...this.state,
      ...s,
    };
    this.update();
  }
  runPluginHandler(event: keyof PluginReturn<TData, TParams>, ...rest) {
    const data = this.pluginImpls.map((p) => p[event]?.(...rest)).filter(Boolean);
    return Object.assign({}, ...data);
  }
  run(...params: TParams) {
    return this.runAsync(...params).catch((error) => {
      console.log(error);
    });
  }
  async runAsync(...params: TParams) {
    this.count += 1;
    const currentCount = this.count;
    const { stopNow = false, returnNow = false, ...state } = this.runPluginHandler(
      'onBefore',
      ...params,
    );
    if (stopNow) {
      return new Promise(() => {});
    }
    this.state = {
      loading: true,
      ...this.state,
      ...state,
    };
    if (returnNow) {
      return Promise.resolve(state.data);
    }
    this.options.onBefore?.(params);
    try {
      let { servicePromise } = this.runPluginHandler('onRequest', this.serviceRef.current, params);
      if (!servicePromise) {
        servicePromise = this.serviceRef.current(params);
      }
      // debugger;
      let res = await servicePromise;

      if (currentCount !== this.count) {
        return new Promise(() => {});
      }
      this.setState({
        loading: false,
        data: res,
        error: undefined,
      });
      return res;
    } catch (error) {
      this.setState({
        loading: false,
        data: undefined,
        error: error,
      });
      throw error;
    }
  }
  refresh() {
    // @ts-ignore
    this.run(...(this.state.params || []));
  }
  refreshAsync() {
    // @ts-ignore
    return this.runAsync(...(this.state.params || []));
  }
  cancel() {
    this.count += 1;
    this.setState({ loading: false });
    this.runPluginHandler('onCancel');
  }
}

export default Fetch;
