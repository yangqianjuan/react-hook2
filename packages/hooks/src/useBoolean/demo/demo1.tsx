import React from 'react';
import { useBoolean } from 'reactHooks';

export default function () {
  const [state, { setFalse, setTrue, toggle }] = useBoolean(false);

  return (
    <div>
      <p>state的值：{`${state}`}</p>
      <div>
        <button onClick={setTrue}>setTrue</button>
      </div>
      <div>
        <button onClick={setFalse}>setFalse</button>
      </div>
      <div>
        <button onClick={toggle}>toggle</button>
      </div>
    </div>
  );
}
