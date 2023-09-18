import React from 'react';
import { useToggle } from 'reactHooks';

export default () => {
  const [state, { toggle, setLeft, setRight }] = useToggle('left', 'right');

  return (
    <div>
      <p>当前的state的值为：{`${state}`}</p>
      <p>
        <button type="button" onClick={toggle}>
          toggle 切换
        </button>
      </p>
      <p>
        <button type="button" onClick={setLeft}>
          setLeft 切换
        </button>
      </p>
      <p>
        <button type="button" onClick={setRight}>
          setRight 切换
        </button>
      </p>
    </div>
  );
};
