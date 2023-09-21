import { useState, useEffect } from 'react';
function useDebounce<T>(value: T, waitTime: number) {
  if (waitTime === undefined) {
    console.error('waitTime不允许为空');
  }
  const [inputValue, setInputValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setInputValue(value);
    }, waitTime);
    return () => clearTimeout(timer);
  }, [value, waitTime]);
  return inputValue;
}

export default useDebounce;
