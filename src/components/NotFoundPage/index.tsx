import { Button, Result } from 'antd';
import React from 'react';
import { BrowserRouter, withRouter, RouteComponentProps } from 'react-router-dom';

const NoFoundPage: React.FunctionComponent<RouteComponentProps> =props => {
  return (
    <Result
      status={404}
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => props.history.push('/')}>
          Back Home
        </Button>
      }
    />
)};


function Component() {
  const Component = withRouter(NoFoundPage);
  return (
    <BrowserRouter>
      <Component />
    </BrowserRouter>
  )
};

export default Component;
