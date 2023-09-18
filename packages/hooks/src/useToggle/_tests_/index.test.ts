import { renderHook, act } from '@testing-library/react';
import useToggle from '../index';

const callToggle = (hook) => {
  act(() => {
    hook.result.current[1].toggle();
  });
};

const callLeftToggle = (hook) => {
  act(() => {
    hook.result.current[1].setLeft();
  });
};
describe('useToggle', () => {
  it('针对基础功能的使用功能', () => {
    const hooks = renderHook(() => useToggle());
    expect(hooks.result.current[0]).toBeFalsy();
  });

  it('针对手动切换toggle模拟', () => {
    const hooks = renderHook(() => useToggle('left', 'right'));
    expect(hooks.result.current[0]).toBe('left');
    callToggle(hooks);
    expect(hooks.result.current[0]).toBe('right');
    callLeftToggle(hooks);
    expect(hooks.result.current[0]).toBe('left');
  });
});
