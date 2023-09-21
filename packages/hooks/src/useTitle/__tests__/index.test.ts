import { renderHook, act } from '@testing-library/react';
import useTitle from '../index';

describe('useTitle', () => {
  it('基础用法', () => {
    const { rerender, result } = renderHook((props) => useTitle(props), {
      initialProps: '自定义标题',
    });
    expect(document.title).toBe('自定义标题');

    act(() => rerender('另一个标题'));
    expect(document.title).toBe('另一个标题');
  });

  it('组件关闭回退', () => {
    document.title = '原有的标题';
    const { unmount } = renderHook((props) => useTitle(props, { restorePreTitle: true }), {
      initialProps: '自定义的标题',
    });
    expect(document.title).toBe('自定义的标题');
    act(() => unmount());
    expect(document.title).toBe('原有的标题');
  });
});
