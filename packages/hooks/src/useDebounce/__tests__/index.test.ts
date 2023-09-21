import { renderHook, act, waitFor } from '@testing-library/react';
import useDebounce from '../index';

function sleep(time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
describe('useDebounce', () => {
  it('基础功能测试', async () => {
    let mountedState = 0;
    const { rerender, result } = renderHook(() => useDebounce(mountedState, 200));

    // await sleep(250);
    expect(result.current).toBe(0);

    mountedState = 1;
    // rerender();
    // await sleep(250);
    // expect(result.current).toBe(1);
  });
});
