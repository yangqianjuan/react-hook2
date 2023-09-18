import { renderHook, act } from '@testing-library/react';
import useBoolean from '../index';

const callTrueFn = (hooks) => {
  act(() => {
    hooks.result.current[1].setTrue();
  });
};

const callToggleFn = (hooks) => {
  act(() => {
    hooks.result.current[1].toggle();
  });
};
describe('useBoolean', () => {
  it('useBoolean基础功能测试', () => {
    const hooks = renderHook(() => useBoolean(false));
    expect(hooks.result.current[0]).toBeFalsy();
  });

  it('useBoolean手动功能测试', () => {
    const hooks = renderHook(() => useBoolean(false));
    expect(hooks.result.current[0]).toBe(false);
    callToggleFn(hooks);
    expect(hooks.result.current[0]).toBe(true);
    callTrueFn(hooks);
    expect(hooks.result.current[0]).toBe(false);
  });
});
