import { Button, Result } from 'antd';
import React from 'react';
import { BrowserRouter, withRouter, RouteComponentProps } from 'react-router-dom';

const ErrorPage: React.FunctionComponent<RouteComponentProps> =props => {
  return (
    <Result
      status={500}
      title="500"
      subTitle="Sorry, the server is wrong."
      extra={
        <Button type="primary" onClick={() => props.history.goBack()}>
          Back Home
        </Button>
      }
    />
)};


function Component() {
  const Component = withRouter(ErrorPage);
  return (
    <BrowserRouter>
      <Component />
    </BrowserRouter>
  )
};

export default Component;
