import React, { useState } from 'react';
import { useDebounce } from 'reactHooks';

export default () => {
  const [value, setValue] = useState();
  const debounceValue = useDebounce(value, 200);
  return (
    <div>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <p>{debounceValue}</p>
    </div>
  );
};
