import React from 'react';
import { useTitle } from 'reactHooks';

export default function () {
  useTitle('自定义title');
  return <div>useTitle的使用</div>;
}
