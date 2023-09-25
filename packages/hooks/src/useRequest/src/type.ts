import { DependencyList } from 'react';
export type Service<TData, TParams extends any[]> = (...agrs: TParams) => Promise<TData>;
export interface FetchState<TData, TParams extends any[]> {
  loading?: boolean;
  data?: TData;
  params?: TParams;
  error?: Error;
}
export interface Options<TData, TParams extends any[]> {
  manual?: boolean;
  onBefore?: (params: TParams) => void;
  onSuccess?: (params: TParams, data: TData) => void;
  onError?: (params: TParams, error: Error) => void;
  onFinally?: (params: TParams, data?: TData, error?: Error) => void;
  defaultParams?: TParams;
  refreshDeps?: DependencyList;
  refreshDepsAction?: () => void;
  loadingDelay?: number;
  ready?: boolean;
}

export interface PluginReturn<TData, TParams extends any[]> {
  onBefore?: (
    params: TParams,
  ) => ({ stopNow?: boolean; returnNow?: boolean } & Partial<FetchState<TData, TParams>>) | void;
  onRequest?: (
    service: Service<TData, TParams>,
    params: TParams,
  ) => { servicePromise: Promise<TData> };
  onSuccess?: (params: TParams, data: TData) => void;
  onerror?: (params: TParams, error: Error) => void;
  onFinally?: (params: TParams, data?: TData, error?: Error) => void;
  onCancel?: (params?: TParams) => void;
}

export type Plugin<TData, TParams extends any[]> = {
  (instance: any, options: Options<TData, TParams>): Partial<PluginReturn<TData, TParams>>;
  onInit?: (options: Options<TData, TParams>) => Partial<FetchState<TData, TParams>>;
};

export type Timeout = ReturnType<typeof setTimeout>;
