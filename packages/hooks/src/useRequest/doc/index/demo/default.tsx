import React from 'react';
import Mock from 'mockjs';
import { useRequest } from 'reactHooks';
const getUserName = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock('@name'));
    }, 1000);
  });
};

export default () => {
  // debugger;
  const { loading, error, data } = useRequest(getUserName);
  if (loading) {
    return <div>loading。。。中</div>;
  }
  if (error) {
    return <div>error:{error}</div>;
  }
  if (data) {
    return <div>username:{data}</div>;
  }
};
