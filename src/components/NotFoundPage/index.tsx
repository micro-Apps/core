import { Button, Result } from 'antd';
import React from 'react';

// TODO: 支持路由跳转 和 重定位
const NoFoundPage: React.FC<{}> = props => (
  <Result
    status={404}
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary">
        Back Home
      </Button>
    }
  />
);

export default NoFoundPage;
