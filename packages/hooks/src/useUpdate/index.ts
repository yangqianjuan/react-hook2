import { useState } from 'react';

const useUpdate = () => {
  const [, setState] = useState({});
  console.log('gengxin');
  return () => setState({});
};
export default useUpdate;
