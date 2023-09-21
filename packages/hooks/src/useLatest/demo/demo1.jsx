import React, { useState, useEffect } from 'react';
import { useLatest } from 'reactHooks';

export default () => {
  const [count, setCount] = useState(0);
  const latestRefValue = useLatest(count);
  useEffect(() => {
    const interval = setInterval(() => {
      console.log(count);
      console.log(latestRefValue.current);
      setCount((s) => latestRefValue.current + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div>{count}</div>;
};
