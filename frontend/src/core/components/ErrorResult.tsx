import { Result } from 'antd';
import React from 'react';

export const ErrorResult: React.FC = () => (
  <Result
    status="500"
    title="500"
    subTitle="Что то пошло не так, попробуйте еще раз"
  />
);
